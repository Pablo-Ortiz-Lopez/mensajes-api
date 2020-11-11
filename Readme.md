# Parkink API

Parkink's main product. This API will serve useful data to all kinds of clients, which can range from Parkink's own mobile app to private businesses to governmental organizations.

While doing so, it will collect valuable metrics which will help Parkink's database continuously improve.

## Deploy the API

You will need `yarn` installed on your machine, and also a `node` version >= 10.

### Run locally for development

Ensure you have all packages updated by executing `yarn install`. 

Then, simply execute `yarn run dev` to start the server in development mode.

In **Development Mode**, the server will run in HTTP mode, so it will be accessible through `http://localhost:3977/`

Any changes will trigger a server rebuild and subsequent restart.

### Deploy in server

To start the server for the first time, run: `yarn run pro`, then execute `yarn run deploy` to restart the API with the latest changes.

In **Production Mode**, the server will run in HTTPS mode, so it will be accessible through `https://parkink.cat:3977/`

It is recommended you bind the execution of `yarn run deploy` to the git web-hook push event.