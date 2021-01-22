#!/bin/bash

# start app in daemon mode
docker-compose -f docker-compose.dev.yml up -d --build
