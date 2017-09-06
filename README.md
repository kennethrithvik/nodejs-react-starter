# React/Express Stater Pack
This is a starter project to be used for development of applications that require
a reasonably good starting point for react and express applications using es6 syntax.

This has been built on top of `yo express-es6` and `create-react-app` package

## Getting started
Clone the project 

and update the remote to point to your new (empty) repository

~~~
git remote set-url origin <path to your github repo>
~~~

verify that the change has happened
~~~
$ git remote -v
# Verify new remote URL
~~~

and then push the changes to your new repo before starting code changes
~~~
$ git push origin master
~~~

## Directory Structure

~~~
├── README.md
├── package.json      - Main package.json file where all the port setting is done for development mode
├── process.json      - Configuration file used by pm2, while running in production mode
├── DockerFile        - Dockerfile to build the docker image to use in production
├── yarn.lock
├── client            - contains the code for react applications
│   ├── README.md
│   ├── node_modules
│   ├── package.json  - contains the proxy setting to passthru pattern based request to express application (/s in this case)
│   ├── public
│   ├── src           - contains the react/redux components
│   └── yarn.lock
└── server            - contains code for the express applications
    ├── app.js        - maps /s to the / in routes/index.js
    ├── bin
    ├── configs       - Environment specific configurations
    ├── config.js
    ├── node_modules
    ├── package.json
    ├── public
    ├── routes        - express sources should go in there
    ├── views
    └── yarn.lock
~~~

## How this works

### Problem Statement
The `create-react-app` provides the benefits of hot reloading, live patching and web dev server that automatically refreshes the browser using `webpack`. The `express` application via node_mod provides the benefits of automatically reloading the server application as the change happens using `nodemon`.

However for both of them to work together, the real time updates to `bundle.js` created from the create-react-app should be passed to the html hosted/managed by express.

In order to get the benefits of the features listed above, both the client and server code needs to be run on different ports. Which makes it a problem for `CORS` limitation etc. The workaround for those requires additional configuration.

### Approach

in the `client/package.json` we add an additional configuration
~~~
"proxy": {
  "/s/": {
    "target": "http://localhost:8081",
    "ws": true
  }
}
~~~
which watches any request coming to the react application in the `development` environment that patches that pattern and passes the request internally to the url defined in the `target`. This provides a consistent url to work with for development while the `react` and `express` application can work on different ports.

For development the primary application (accessed via the browser) is the webpack dev server

For production, the approach requires adding the binding to static assets that are generated as part of the build process and the served via the `express` application. The only server on production is the `express` application.

## Development
Install dependencies in the client, server and parent folders using `Yarn`
~~~
$ npm run install-dependencies
~~~

Start the webpack-dev-server and express server
~~~
$ npm run dev
~~~
or
~~~
$ npm start
~~~

To run the server in debug mode add `DEBUG=*` before npm start in main package.json.
~~~
"server": "cd ./server; PORT=8081 DEBUG=* npm start",
~~~

### Port configuration in 'development' environment
By default, the express server is configured to run on port 8081 and the webpack-dev-server running the react client, on port 8080.
Ensure that both these ports are not used by any other process or change the configuration if these ports are not free.

The port configuration can be found at the root package.json file under the server and client run scripts.
~~~
"server": "cd ./server; PORT=`<server_port>` npm start",
"client": "cd ./client; PORT=`<client_port>` npm start",
~~~

Change the proxy setting in the client/package.json to the new `server_port` value.
~~~
"proxy": {
  "/s/": {
    "target": "http://localhost:`<server_port>`",
    "ws": true
  }
}
~~~

## Production
Build the docker image with the client build
~~~
$ npm run build-docker
~~~
This creates the docker image-'react-express-es6-starter'

Create a container of the image generated
~~~
$ npm run prod
~~~

Access the home-page at http://localhost:8080/

##Environment specific configuration

###Express Server
You can make use of the config files in the server directory to specify any extenral configurations that you can later use in the expess server.
`configs/config.development.js` - Used to specify dev environment configs.
`configs/config.production.js` - Used to specify prod environment configs.
`config.js` - Define the default or common configurations.

The config can later be loaded into your server by importing `config.js`
~~~
import GlobalConfig from './config';
~~~

###React Client

Pass all configs in the main package.json file under npm script "client" as `<name>=<value>` before starting client for dev configs.
The `name` should be prefixed with `REACT_APP_`.
~~~
"client": "cd ./client; REACT_APP_API_GRAPHQL_URL=http://localhost:8082/graphql PORT=8080 npm start",
~~~

Pass all configs in the main package.json file under npm script "prebuild-docker" as `<name>=<value>` before building client for prod configs.
The `name` should be prefixed with `REACT_APP_`.
~~~
"prebuild-docker": "cd client; npm install; REACT_APP_API_GRAPHQL_URL=http://localhost:8082/graphql npm run build",
~~~

These configs can be used in your react app through the process.env object
~~~
let uri = process.env.REACT_APP_API_GRAPHQL_URL
~~~

##Debugging with Visual Studio Code

You can start a debugging session in Visual Studio Code by pressing the `F5` key or by clicking on the debug icon on the left side-tab and
selecting Aurora-CX config and clicking on the green start icon.
The launch config file can be found at `.vscode/launch.json`. You can edit this file to pass environment variables to the app.
This debug session can be used to place breakpoints and monitor the flow of logic and data during the execution of the app.



