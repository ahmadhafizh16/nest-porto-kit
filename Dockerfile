FROM node:18-alpine

WORKDIR /usr/src/app  
RUN mkdir data

COPY package*.json ./  
COPY entrypoint.sh ./  

RUN npm install

COPY . .


RUN chmod +x /usr/src/app
RUN chmod +x /usr/src/app/entrypoint.sh

RUN npx prisma generate --schema=/usr/src/app/src/ship/database/schema.prisma  

RUN npm run build

ENTRYPOINT ["/usr/src/app/entrypoint.sh", "npm", "run", "start:prod"]  

EXPOSE 8080
CMD ["npm", "run", "start:prod"]