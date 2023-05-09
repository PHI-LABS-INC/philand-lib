API_URL="https://graph-api.phi.blue/graphql"
#
JWT=`jq -r .AuthenticationResult.IdToken ./token.json`
#
http POST ${API_URL} "Authorization:"${JWT} \
	query="query {listQuests { data { Condition Value }}}"
#
