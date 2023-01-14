import { ethers } from 'ethers';
import multicallAbi from './abi/multicall.json';
import phiClaimAbi from './abi/PhiClaim.json';
import { MULTICALL_CONTRACT_ADDRESS, PHICLAIM_CONTRACT_ADDRESS, QUESTOBJECT_CONTRACT_ADDRESS, } from './helpers/contractAddress';
import { retryableAsyncRequest } from './helpers/retryableApiCall';
import { ObjectEnum } from './helpers/tokneIds';
export const getAchievedQuest = async (address) => {
    const provider = new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
    const multicall = new ethers.Contract(MULTICALL_CONTRACT_ADDRESS, multicallAbi, provider);
    const phiClaimIface = new ethers.utils.Interface(phiClaimAbi);
    const userAddress = address.toLowerCase();
    const tokenIdList = Object.values(ObjectEnum);
    const aggregateCalldata = multicall.interface.encodeFunctionData('aggregate', [
        tokenIdList.map((id) => {
            return {
                target: PHICLAIM_CONTRACT_ADDRESS,
                callData: phiClaimIface.encodeFunctionData('checkClaimedStatus', [
                    userAddress,
                    QUESTOBJECT_CONTRACT_ADDRESS,
                    id,
                ]),
            };
        }),
    ]);
    const r = await retryableAsyncRequest(async () => {
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
