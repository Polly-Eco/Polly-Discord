if [ -d "./dist" ]
then
    rm -r "./dist"
    npm run compile
else
    npm run compile
fi