#!/usr/bin/env bash

docker build -t registry.garic.biz/packages/store:latest . && docker push registry.garic.biz/packages/store

exit $?
