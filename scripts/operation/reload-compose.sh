set -eux

cd $(dirname $0)/../../backend && ./gradlew clean build && docker compose down && docker compose up --build -d