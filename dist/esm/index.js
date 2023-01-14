// export const hello = (): void => {
//   console.log('Hello.');
// };
// import { getAchievedQuest } from "./getAchievedQuest";
// Use dotenv to read .env vars into Node
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export { getAchievedQuest } from './getAchievedQuest';
