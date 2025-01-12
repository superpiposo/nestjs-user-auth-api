## Description

This is an example project for basic authorization authentication. It involves registering users, which can be accessed with an authentication token. The token can be acquired from the auth endpoint, which allows registration, login and token validation.
The docker-compose.yml file contains the database data to be started. If the db is not used as a container, use the database on your machine and configure it in the .env file.
First configure the db file before starting with these settings!

## Project setup

```bash
$ npm install
```

```bash
$ npx prisma migrate dev
```

```bash
$ npx prisma generate
```



## Run tests


```bash
$ npm run test
```
## Start the app

```bash
$ npm run start:dev
```

Att: Nathan Silva de Queiroz