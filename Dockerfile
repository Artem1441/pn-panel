FROM node:22.12.0

WORKDIR /app

COPY . .

RUN npm install --force

CMD ["npm", "run", "start"]