FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]