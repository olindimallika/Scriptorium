#!/bin/bash

# build Docker images for running code.
# builds all the language Docker images needed for the IDE.


cd "$(dirname "$0")/language-containers"

# base image
docker build -f Dockerfile.base -t runtime-base:latest .

# buil all language images
languages=("c" "cpp" "csharp" "go" "java" "javascript" "php" "python" "ruby" "rust" "sql")

for lang in "${languages[@]}"; do
    if [ -f "$lang/Dockerfile" ]; then
        docker build -f "$lang/Dockerfile" -t "runtime-$lang:latest" .
    else
        echo "Dockerfile not found for $lang"
    fi
done

echo "You can run your code execution now!" 