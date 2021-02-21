# Mensajes API

This REST API will handle the interaction between the user and the Message database


## Deploy the API

You will need `yarn` installed on your machine, and also a `node` version >= 10.

### Run locally for development

Ensure you have all packages updated by executing `yarn install`. 

Then, simply execute `yarn run dev` to start the server in development mode.

In **Development Environment**, the server will run in HTTP mode, so it will be accessible through `http://localhost:3000/`

Any changes will trigger a server restart.

### Deploy in server

To deploy in server you will need to have `pm2` installed. You will also need to setup the SSL certificates and update their path in `src/bin/server.js`.

To start the server for the first time, run: `yarn run pro`, then execute `yarn run deploy` to restart the API with the latest changes.

In the **Production Environment**, the server will run in HTTPS mode, so it will be accessible through `https://{{your domain}}:3000/`

It is recommended you bind the execution of `yarn run deploy` to this repository web-hook push event.



## Using the API

To use the API, you have several options, which include:

* **Postman**: You can use the API through Postman, opening the endpoint collection that can be found in the root folder.
* **Mensajes APP**: A simple React JS web application I developed to use this API. 

