mkdir -p ~/.aws

cat  >> ~/.aws/credentials <<-EOF
[default]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}

[my-creds]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}
EOF

cat >> ~/.aws/config <<-EOF
[default]
region = us-west-2
output = json
source_profile=default

[profile bcolfer-profile]
region = us-west-2
output = json
role_arn = arn:aws:iam::362472370574:role/OrganizationAccountAccessRole
source_profile = my-creds
EOF

