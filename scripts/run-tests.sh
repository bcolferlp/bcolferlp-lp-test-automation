#!/usr/bin/env bash
set x

export AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-"set_accont_id"}
export AWS_ACCOUNT_KEY_ID=${AWS_ACCOUNT_KEY_ID:-"set_account_key_id"}
export AWS_ACCOUNT_SECRET_KEY=${AWS_ACCOUNT_SECRET_KEY:-"set_account_secret_key"}
export TEST_LIST_FILE=${TEST_LIST_FILE:-"./list-of-tests-to-run.txt"}
bash -c ./scripts/write-aws-config.sh
source ./scripts/aws-cli-assumerole.sh
echo "For stage ${STAGE}"
#$(echo $(cat ${TEST_LIST_FILE }))
npm run test -- tests/uwPortal/uwLogin/uwLogin
