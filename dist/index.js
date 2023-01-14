"use strict";
// export const hello = (): void => {
//   console.log('Hello.');
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAchievedQuest = void 0;
// import { getAchievedQuest } from "./getAchievedQuest";
// Use dotenv to read .env vars into Node
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
var getAchievedQuest_1 = require("./getAchievedQuest");
Object.defineProperty(exports, "getAchievedQuest", { enumerable: true, get: function () { return getAchievedQuest_1.getAchievedQuest; } });
