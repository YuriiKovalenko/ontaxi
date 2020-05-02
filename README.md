## Description

OnTaxi

## Installation

```bash
$ npm install
```

## Running the app

```bash
# For local postgres (can be skipped if DATABASE_URL env var will be provided)
$ docker-compose up -d

# Build app
$ npm run build

# Patch db with test data
$ npm run patch-db

# Starting app
$ npm run start:prod
```

## Test
[Postman collection](https://www.getpostman.com/collections/f2e06859772228096d58)
