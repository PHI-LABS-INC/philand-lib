export type RetryableApiOptions = {
    delay?: number;
    times?: number;
};
export declare function retryableApiPost<T>(endpoint: string, data: any, opts?: RetryableApiOptions): Promise<T>;
export declare function retryableAsyncRequest(func: any, opts?: RetryableApiOptions): Promise<any>;
//# sourceMappingURL=retryableApiCall.d.ts.map