FROM node:8.9.1-alpine

# Set multiple labels at once, using line-continuation characters to break long lines
LABEL vendor=nodejs_react_starter

# Install the required dependencies
RUN npm install pm2  -g

# Install the app dependencies first
COPY ./server/package.json /app/server/package.json
RUN cd /app/server && npm install --production

# Add the contents of the current working directory to /app
COPY ./process.json /app/
COPY ./server /app/server

# Assumes that the build has happened outside the container build process
COPY ./client/build/ /app/client/build/

#replace Transcompiled folder
RUN cd /app/server && rm -rf src && mv temp src;

# Define the environment variables

#define ports to expose
EXPOSE 8080

WORKDIR /app
# Command to start the build process
CMD ["pm2", "start", "process.json", "--no-daemon"]
