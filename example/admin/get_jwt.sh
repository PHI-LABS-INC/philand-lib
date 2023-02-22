USER_POOL_ID="ap-northeast-1_o3yV0vNvv"
CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
#
USER_NAME="xxxx"
PASSWORD="Xxxxxxx@1"
#
aws cognito-idp admin-initiate-auth \
	--user-pool-id ${USER_POOL_ID} \
	--client-id ${CLIENT_ID} \
	--auth-flow ADMIN_NO_SRP_AUTH \
	--auth-parameters "USERNAME=${USER_NAME},PASSWORD=${PASSWORD}" > token.json
