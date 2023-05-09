// campaign specific configuration and constants goes here

interface NumberKeyObject {
  [key: string]: number;
}

export const TestCampaignObjectEnum: NumberKeyObject = {
  ExpGainSinceApply10000: 199901,
  LinkToOthers5: 199902,
  LinkReceived10: 199903,
};

export const KakuseiCampaignObjectEnum: NumberKeyObject = {
  ExpGainSinceApply10000: 100031,
  LinkToOthers5: 100032,
  LinkReceived10: 100033,
  TopKakusei500: 100034,
  TopKakusei100: 100035,
  TopKakusei30: 100036,
};

export const YasaiCampaignObjectEnum: NumberKeyObject = {
  LensProfileOwner1: 103501,
  BioOnLens1: 103502,
  PostOnLens1: 103503,
  CollectPhiPostOnLens1: 103504,
  PhiOnLens1: 103505,
  CollectedOnLens1: 103506,
  CollectYasai100: 103507,
  CollectYasai300: 103508,
  CollectYasai600: 103509,
  CollectYasai1000: 103510,
  CollectYasai3000: 103511,
  CollectYasai6000: 103512,
  CollectYasai10000: 103513,
  CollectYasai20000: 103514,
  CollectYasai35000: 103515,
};

export const TiliXCampaignObjectEnum: NumberKeyObject = {
  ParticipantTiliX1: 110001,
  ParticipantTiliX2: 110002,
  TopTiliX5: 110003,
  TopTiliX4: 110004,
  TopTiliX3: 110005,
  TopTiliX2: 110006,
  TopTiliX1: 110007,
  TopTiliXDotty1: 110008,
};

export const GoodPhilandCampaignObjectEnum: NumberKeyObject = {
  ParticipantGoodPhiland1: 110101,
  TopSingleLandDesign1: 110102,
  TopSingleLandPixelArt1: 110103,
  TopMultipleLandDesign1: 110104,
  TopMultipleLandPixelArt1: 110105,
};

export const Phi1UPGameObjectEnum: NumberKeyObject = {
  ParticipantPhi1UPGame1: 110201,
  ParticipantPhi1UPGame2: 110202,
  BestOnChainGameIdeas1: 110203,
  BestOffChainGameIdeas1: 110204,
};

export const PooltogetherCampaignObjectEnum: NumberKeyObject = {
  ParticipantPooltogetherTiliX1: 105201,
  DepositPoolTogether20: 105202,
  DepositPoolTogether100: 105203,
  DepositPoolTogether1000: 105204,
  PrizePoolTogether1: 105205,
  DelegatoorPooltogether1: 105206,
  PoolHolding10: 105207,
  PoolyNFTOwner1: 105208,
  PooltogetherPhilandOwner1: 105209,
};
