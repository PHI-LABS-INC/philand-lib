USER_POOL_ID="ap-northeast-1_o3yV0vNvv"
CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
#
USER_NAME="xxxx"
PASSWORD="Xxxxxxx@1"
EMAIL="xxxx@gmail.com"

#not allowed except admin
aws cognito-idp sign-up \
	--client-id ${CLIENT_ID} \
	--username ${USER_NAME} \
	--password ${PASSWORD} \
  --user-attributes Name=email,Value=${EMAIL}
