#!/bin/bash

echo "Building Docker container..."
docker build -t web-app .

echo "Building Docker container..."
docker run -p 8012:8080 -d web-app

echo "Project initialization complete."
