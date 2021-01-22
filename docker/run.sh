#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
    npm install --from-lock-file
    npm run dev
else
    npm run build
    npm start
fi
