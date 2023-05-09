API_URL="https://graph-api.phi.blue/graphql"
#
JWT=`jq -r .AuthenticationResult.IdToken ./token.json`
#
curl -X POST \
       -H "Content-Type:application/graphql" \
       -H "Authorization:"${JWT} \
       -d '{ "query": "query {listQuests { data { Condition Value }}}" }' \
      ${API_URL}
#
