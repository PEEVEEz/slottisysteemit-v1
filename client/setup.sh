echo "Setup started"
git pull

cd ./client/ && pnpm install && pnpm build
rm -rf /var/www/slottisysteemit.com/*
mv ./dist/* /var/www/slottisysteemit.com

echo "Done!"
