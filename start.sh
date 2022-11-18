#!/bin/bash

# build images if the project image list is empty.
if [[ -z "$( docker-compose -p caccc images -q )" ]]; then 
    docker-compose -p caccc build
    wait
fi
# start the orchestrated containers if not started.
if [[ -z "$( docker-compose -p caccc ps --filter "status=running" -q )" ]]; then
    docker-compose -p caccc up -d
    wait
fi