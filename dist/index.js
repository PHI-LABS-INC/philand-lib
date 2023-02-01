"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveScore = exports.getAchievedQuest = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
var getAchievedQuest_1 = require("./getAchievedQuest");
Object.defineProperty(exports, "getAchievedQuest", { enumerable: true, get: function () { return getAchievedQuest_1.getAchievedQuest; } });
var getActiveScore_1 = require("./getActiveScore");
Object.defineProperty(exports, "getActiveScore", { enumerable: true, get: function () { return getActiveScore_1.getActiveScore; } });
