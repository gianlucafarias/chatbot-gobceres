FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm install pm2
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["./node_modules/.bin/pm2-runtime", "start", "app.js", "--name", "mi-app", "--cron", "0 5 * *"]
