#!/bin/bash
#echo comments and .env with environment variables were generated by Copilot autocomplete.
# Step 1: Install dependencies
echo "Installing npm dependencies..."
npm install
npx prisma generate

# Step 2: Run Prisma migrations to set up the database
echo "Running Prisma migrations..."
npx prisma migrate dev --name init

# Step 3: Create the .env file with environment variables stored in the .env.example file
echo "Creating .env file with environment variables..."

cat <<EOL > .env
JWT_SECRET="werhui234u8549hr98284578925hr982357ryu9we8h345y92h3u5"
JWT_ACCESS_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS=10
DATABASE_URL="file:./dev.db"
EOL

echo ".env file created."


# Step 4: Create an admin user by running the seed script
echo "Now creating admin user:"
npx prisma db seed

# Adding all the docker images
#!/bin/bash

# Set the base directory for the Dockerfiles
BASE_DIR="language-containers"

# List of supported languages, extracted from the frontend options
LANGUAGES=("javascript" "python" "c" "cpp" "csharp" "java" "go" "php" "rust" "sql" "ruby")

# Loop through each language and build the Docker image
for lang in "${LANGUAGES[@]}"; do
    echo "Building Docker image for ${lang}..."
    docker build -t runtime-${lang} ./${BASE_DIR}/${lang}
    if [ $? -eq 0 ]; then
        echo "Successfully built runtime-${lang}"
    else
        echo "Failed to build runtime-${lang}"
        exit 1
    fi
done

echo "All Docker images built successfully."


echo "Your script startup.sh was successfull!!"
