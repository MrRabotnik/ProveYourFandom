# EXP HBO Max Prove Your Fandom

Static website of the EXP HBO Max Prove Your Fandom.

## Main dependencies

-   Typescript
-   React
-   Webpack
-   Babel
-   Node.js
-   NPM or yarn
-   [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html)
-   [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

See details of the version requirements in `package.json`.

## CMS and API Key
This application consumes data from a [Directus CMS](https://hbomax-archive-directus.attexp.com/).  All requests 
to the CMS are authenticated via an access token appended to GraphQL queries, which is specific in a `.env` file.
Please refer to `.env.example`

The correct access token can be found on the "API User" user account.

## Development

    npm i

All project dependencies (except for Node/NPM and the AWS CLI) will be installed locally in `/node_modules`.

    npm start

Runs a development server at `localhost:8080` on your machine. The server is also accessible to other devices who are connected to the same network.

The address of the server on your local network depends on the IP of your machine but the port is the same as the `localhost` one. To get the address of the development server on your local network:

    npm run network-info

Entry point of the application is located at `./src/index.js`.

A prettier config file is located at the root of the project so that your IDE can use it to apply linting rules while you're working with the code.

## Deployment

    npm version patch

This command will increment the semantic version of the application, run a script to create a production build, and deploy it to AWS.
