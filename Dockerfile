FROM node:15.6.0-alpine3.10

# Define working directory
WORKDIR /home/node/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# copy source and start script
COPY . .
COPY ./docker/run.sh /usr/bin/run.sh
RUN chmod +x /usr/bin/run.sh

# document the port exposed by server
EXPOSE 7001

# execute start script
CMD /usr/bin/run.sh
