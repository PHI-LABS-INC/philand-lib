"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAchievedQuest = void 0;
const ethers_1 = require("ethers");
const multicall_json_1 = __importDefault(require("./abi/multicall.json"));
const PhiClaim_json_1 = __importDefault(require("./abi/PhiClaim.json"));
const contractAddress_1 = require("./helpers/contractAddress");
const retryableApiCall_1 = require("./helpers/retryableApiCall");
const tokneIds_1 = require("./helpers/tokneIds");
const getAchievedQuest = async (address) => {
    const provider = new ethers_1.ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
    const multicall = new ethers_1.ethers.Contract(contractAddress_1.MULTICALL_CONTRACT_ADDRESS, multicall_json_1.default, provider);
    const phiClaimIface = new ethers_1.ethers.utils.Interface(PhiClaim_json_1.default);
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
    console.log(datas);
    return datas;
};
exports.getAchievedQuest = getAchievedQuest;
