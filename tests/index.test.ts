import { getAchievedQuest, getActiveScore } from '..';

describe('getAchievedQuest test', () => {
  it('check getAchievedQuest', async () => {
    // const log = jest.spyOn(console, 'log').mockReturnValue();
    const result = await getAchievedQuest(
      '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce'
    );
    expect(result).not.toBeNull();
  });
});

describe('getActiveScore test', () => {
  jest.setTimeout(100000);
  it('check getActiveScore', async () => {
    const result = await getActiveScore(
      '0x5037e7747fAa78fc0ECF8DFC526DcD19f73076ce'
    );
    expect(result).not.toBeNull();
  });
});
