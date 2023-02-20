import * as dotenv from 'dotenv';

dotenv.config();
const getParamOrExit = (name: string) => {
  const param = process.env[name];
  if (!param) {
    console.error(`Required config param '${name}' missing`);
    process.exit(1);
  }
  return param;
};
export const PHILAND_API = getParamOrExit('PHILAND_API');
