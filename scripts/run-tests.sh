#!/bin/bash
set xe
docker_image=test-automation
env_file=.env
docker run --mount source=$(pwd)/.env,destintation=/home/circleci/.env -t ${docker_image}

STAGE=bcolfer npm run test -- tests/uwPortal/uwLogin/uwLogin
