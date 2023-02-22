USER_POOL_ID="ap-northeast-1_o3yV0vNvv"
CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
#
USER_NAME="xxxx"
PASSWORD="Xxxxxxx@1"
#
aws cognito-idp admin-set-user-password \
		--user-pool-id ${USER_POOL_ID} \
		--username ${USER_NAME} \
		--password ${PASSWORD}
