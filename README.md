# Crypto-Trade

## Setup

Follow the instructions below to setup the crypto trade backend server

### Cloning The Repo

To clone the project, use the following command:

`git clone https://github.com/lewispricey/crypto-trade-be.git`

### Installing Dependencies

The project relies on the following dependencies:

- Express
- Node Postgres
- DotEnv
- Argon2
- JSON Web Token

These are all listed within the package.json file so to automaticaly install these navigate to the root directory of the project and run the following command:

`npm install`

### Environment Variables

In order to connect to the test and development databases you'll need to create the following .env files in the projects root

FileNames

- .env.test
- .env.dev

Contents

- PGDATABASE=
- PRIVATE_KEY= RS256 Private Key encoded as base 64
- PUBLIC_KEY= RS256 Public Key encoded as base 64
