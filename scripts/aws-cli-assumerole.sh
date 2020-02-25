#!/usr/bin/env bash
unset  AWS_SESSION_TOKEN

AWS_ROLE_ARN="arn:aws:iam::362472370574:role/OrganizationAccountAccessRole"
temp_role=$(aws sts assume-role \
                    --role-arn "${AWS_ROLE_ARN}" \
                    --role-session-name "bcolfer-cicd" \
                    )
                    #--profile bcolfer-profile)

export AWS_ACCESS_KEY_ID=$(echo $temp_role | jq .Credentials.AccessKeyId | xargs)
export AWS_SECRET_ACCESS_KEY=$(echo $temp_role | jq .Credentials.SecretAccessKey | xargs)
export AWS_SESSION_TOKEN=$(echo $temp_role | jq .Credentials.SessionToken | xargs)
