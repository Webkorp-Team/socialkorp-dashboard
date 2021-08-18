#!/bin/bash
rm jwtRS256.key
rm jwtRS256.key.pub
ssh-keygen -t rsa -N "" -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
