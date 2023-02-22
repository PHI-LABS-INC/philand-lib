CLIENT_ID="6l7pvu06un1lq1jlot6sg7f73h"
USER_NAME="xxxx"
CODE="xxxx"

#
aws cognito-idp confirm-sign-up \
  --client-id ${CLIENT_ID} \
  --username ${USER_NAME} \
  --confirmation-code ${CODE}
