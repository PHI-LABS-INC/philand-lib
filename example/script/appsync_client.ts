// ---------------------------------------------------------------
//	appsync_client.ts
//
//
// ---------------------------------------------------------------
// ts-node appsync_client.ts ../token.json
import axios from 'axios';
import fs from 'fs';

console.error('*** start ***');

const file_json = process.argv[2];

const json_str = fs.readFileSync(file_json, 'utf8');
const dict_aa = JSON.parse(json_str);
const access_token = dict_aa['AuthenticationResult']['IdToken'];

const url = 'https://graph-api.phi.blue/graphql';

const query = 'query {listQuests { items { Condition Value }}}';
const data = JSON.stringify({ query: query });

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: access_token,
  },
};

axios
  .post(url, data, headers)
  .then(function (response: any) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  })
  .then(function () {
    console.error('*** end ***');
  });

// ---------------------------------------------------------------
