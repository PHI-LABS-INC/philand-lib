USER_POOL_ID="ap-northeast-1_o3yV0vNvv"
CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
#
USER_NAME="zak"
YOUR_TEMPORARY_PASSWORD="2759R*Kb"

aws cognito-idp initiate-auth \
  --client-id ${CLIENT_ID} \
  --auth-flow USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=${USER_NAME},PASSWORD=${YOUR_TEMPORARY_PASSWORD}  > session.json
