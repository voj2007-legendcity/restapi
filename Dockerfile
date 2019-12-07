FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install && npm install -g tsc && npm install -g typescript && npm install -g sequelize-cli 
COPY . /app
CMD sequelize db:create && npm run dev
EXPOSE 7000