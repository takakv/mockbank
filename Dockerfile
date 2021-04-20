FROM node:latest

# Create app directory
WORKDIR /usr/src/app/

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app
COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]