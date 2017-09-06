FROM node:6.10.3-alpine

# Set multiple labels at once, using line-continuation characters to break long lines
LABEL vendor=react_express_starter_pack 

# Add the contents of the current working directory to /app
ADD ./process.json /app/
ADD ./server /app/server

# Assumes that the build has happened outside the container build process
ADD ./client/build/ /app/client/build/

# Install the required dependencies
RUN npm install pm2  -g
RUN /bin/sh -c 'cd /app/server; npm install --production';

# Define the environment variables
EXPOSE 8080

WORKDIR /app
# Command to start the build process
CMD ["pm2", "start", "process.json", "--no-daemon"]
