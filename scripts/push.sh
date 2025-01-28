#!/usr/bin/env bash

TAG=$(cat version | xargs)
REGISTRY_TAG="ragibkl/web-jws:$TAG"
docker push $REGISTRY_TAG
