"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveScore = void 0;
const ethers_1 = require("ethers");
const multicall_json_1 = __importDefault(require("./abi/multicall.json"));
const PhiClaim_json_1 = __importDefault(require("./abi/PhiClaim.json"));
const QuestObject_json_1 = __importDefault(require("./abi/QuestObject.json"));
const contractAddress_1 = require("./helpers/contractAddress");
const retryableApiCall_1 = require("./helpers/retryableApiCall");
const tokneIds_1 = require("./helpers/tokneIds");
const getActiveScore = async (address) => {
    const provider = new ethers_1.ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
    const multicall = new ethers_1.ethers.Contract(contractAddress_1.MULTICALL_CONTRACT_ADDRESS, multicall_json_1.default, provider);
    const phiClaimIface = new ethers_1.ethers.utils.Interface(PhiClaim_json_1.default);
    const phiObjectIface = new ethers_1.ethers.utils.Interface(QuestObject_json_1.default);
    const userAddress = address.toLowerCase();
    const tokenIdList = Object.values(tokneIds_1.ObjectEnum);
    const aggregateCalldata = multicall.interface.encodeFunctionData('aggregate', [
        tokenIdList.map((id) => {
            return {
                target: contractAddress_1.PHICLAIM_CONTRACT_ADDRESS,
                callData: phiClaimIface.encodeFunctionData('checkClaimedStatus', [
                    userAddress,
                    contractAddress_1.QUESTOBJECT_CONTRACT_ADDRESS,
                    id,
                ]),
            };
        }),
    ]);
    const r = await (0, retryableApiCall_1.retryableAsyncRequest)(async () => {
        return await provider.call({
            to: multicall.address,
            data: aggregateCalldata,
        });
    });
    const resultClaimed = multicall.interface.decodeFunctionResult('aggregate', r);
    const alreadyClaimedIds = {};
    resultClaimed.returnData.forEach((r, i) => {
        if (phiClaimIface
            .decodeFunctionResult('checkClaimedStatus', r)[0]
            .toNumber() == 1) {
            alreadyClaimedIds[i] = true;
        }
    });
    const datas = tokenIdList.filter((_value, i) => {
        return alreadyClaimedIds[i];
    });
    const aggregateCalldata2 = multicall.interface.encodeFunctionData('aggregate', [
        datas.map((id) => {
            return {
                target: contractAddress_1.QUESTOBJECT_CONTRACT_ADDRESS,
                callData: phiObjectIface.encodeFunctionData('getExp', [id]),
            };
        }),
    ]);
    const r2 = await (0, retryableApiCall_1.retryableAsyncRequest)(async () => {
        return await provider.call({
            to: multicall.address,
            data: aggregateCalldata2,
        });
    });
    const resultClaimed2 = multicall.interface.decodeFunctionResult('aggregate', r2);
    let expGain = 0;
    const details = [];
    resultClaimed2.returnData.forEach((r2, i) => {
        if (phiObjectIface.decodeFunctionResult('getExp', r2)[0].toNumber() != 0) {
            details.push({
                tokenId: datas[i],
                exp: phiObjectIface.decodeFunctionResult('getExp', r2)[0].toNumber(),
            });
            console.log(expGain);
            expGain =
                expGain +
                    phiObjectIface.decodeFunctionResult('getExp', r2)[0].toNumber();
        }
    });
    return expGain;
};
exports.getActiveScore = getActiveScore;
