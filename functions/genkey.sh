#!/bin/bash
if [ "$1" = "--no-overwrite" ] && [ -f jwtRS256.key ]; then
  exit
fi
rm jwtRS256.key 2>/dev/null
rm jwtRS256.key.pub 2>/dev/null
ssh-keygen -t rsa -N "" -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
