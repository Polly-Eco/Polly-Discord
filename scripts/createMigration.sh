if [ -z "$1" ]
  then
    echo "No arguments supplied"
  else
    npm run typeorm migration:create "./src/db/migrations/$1"
fi