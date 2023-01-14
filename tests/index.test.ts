import { hello } from '../src';

describe('hello() のテスト', () => {
  it('Hello. と出力', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    hello();
    expect(log).toHaveBeenNthCalledWith(1, 'Hello.');
    log.mockRestore();
  });
});
