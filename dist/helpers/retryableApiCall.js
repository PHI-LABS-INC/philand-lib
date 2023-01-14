"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryableAsyncRequest = exports.retryableApiPost = void 0;
const axios_1 = __importDefault(require("axios"));
const defaultRetryableApiOptions = {
    delay: 500,
    times: 1,
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function retryableApiPost(endpoint, data, opts) {
    if (opts) {
        opts = { ...defaultRetryableApiOptions, ...opts };
    }
    else {
        opts = defaultRetryableApiOptions;
    }
    if (!opts.delay || !opts.times) {
        throw 'invalid opts';
    }
    let result;
    for (let i = 0; i < opts.times + 1; ++i) {
        try {
            const resp = await axios_1.default.post(endpoint, data);
            if (resp.status == 200) {
                result = resp.data;
                break;
            }
            else {
                console.error(`axios.post ${endpoint} with data ${JSON.stringify(data)} returns code ${resp.status} and data ${resp.data}. retry count ${i}`);
            }
        }
        catch (e) {
            console.error(`axios.post ${endpoint} with data ${JSON.stringify(data)} throws an error. retry count ${i}.`, e);
        }
        await sleep(opts.delay);
    }
    if (!result) {
        console.error({ data: data });
        throw `axios.post error no result`;
    }
    return result;
}
exports.retryableApiPost = retryableApiPost;
async function retryableAsyncRequest(func, opts) {
    if (opts) {
        opts = { ...defaultRetryableApiOptions, ...opts };
    }
    else {
        opts = defaultRetryableApiOptions;
    }
    if (!opts.delay || !opts.times) {
        throw 'invalid opts';
    }
    let result, lastErr;
    for (let i = 0; i < opts.times + 1; ++i) {
        try {
            result = await func();
        }
        catch (e) {
            console.error(e);
            lastErr = e;
            if (i < opts.times) {
                console.log('retrying', i + 1);
            }
        }
        await sleep(opts.delay);
    }
    if (!result) {
        throw lastErr;
    }
    return result;
}
exports.retryableAsyncRequest = retryableAsyncRequest;
