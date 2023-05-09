#! /usr/bin/python
# -*- coding: utf-8 -*-
#
#	appsync_client.py
#
#
# ./appsync_client.py ../token.json
# ------------------------------------------------------------------
import  sys
import  json
import  requests
# ------------------------------------------------------------------
sys.stderr.write("*** start ***\n")

file_in = sys.argv[1]
with open(file_in) as ff:
	json_str = ff.read().strip()
dict_aa = json.loads(json_str)
access_token = dict_aa['AuthenticationResult']['IdToken']
#
url="https://graph-api.phi.blue/graphql"
#
headers = {'Authorization': '{}'.format(access_token)}
#
query='{ \"query\": \"query {listQuests { data { Condition Value }}}\" }'
response = requests.post(url, headers=headers, data=query)
#
print(response.text)
#
sys.stderr.write("*** end ***\n")
# ------------------------------------------------------------------
