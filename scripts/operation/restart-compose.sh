set -eux

cd $(dirname $0)/../../backend && docker compose down && docker compose up -d