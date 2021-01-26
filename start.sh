#!/bin/bash

# create image upload director
mkdir src/uploads

# start app in daemon mode
docker-compose -f docker-compose.dev.yml up -d --build
