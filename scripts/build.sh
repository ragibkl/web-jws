#!/usr/bin/env bash

TAG=$(cat version | xargs)
REGISTRY_TAG="ragibkl/web-jws:$TAG"
echo "REGISTRY_TAG=$REGISTRY_TAG"
docker build --pull -t $REGISTRY_TAG -f ./Dockerfile .
