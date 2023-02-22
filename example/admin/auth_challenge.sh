USER_POOL_ID="ap-northeast-1_o3yV0vNvv"
CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
#
USER_NAME="xxxx"
NEW_PASSWORD="xxxx"
SESSION="xxxx"
#
 aws cognito-idp admin-respond-to-auth-challenge \
	--user-pool-id ${USER_POOL_ID} \
	--client-id ${CLIENT_ID} \
  --challenge-name NEW_PASSWORD_REQUIRED \
	--challenge-responses "NEW_PASSWORD=${NEW_PASSWORD},USERNAME=${USER_NAME}" \
	--session "${SESSION}" > token.json
