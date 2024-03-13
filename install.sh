#!/bin/bash

echo "Building Docker container..."
docker-compose build &&

echo "Starting Docker containers..."
docker-compose up -d &&

echo "Project initialization complete."
