server{
    listen 80;
    server_name api.slottisysteemit.com;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server{
  listen 80;
  server_name slottisysteemit.com;

  root /var/www/slottisysteemit.com;
  index index.html;
  location / {
     try_files $uri /index.html;
  }
}