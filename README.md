# Lubricentro M&C Frontend

## Setup

The first step is to have running the [backend server](https://github.com/MatiasAdrian4/lubricentro_myc "backend server").

Once that is done, `npm run generate-backend-client`needs to be executed in order to generate the openapi client using [the spec defined in lubricentro_myc](https://github.com/MatiasAdrian4/lubricentro_myc/blob/develop/docs/swagger.yaml "the spec defined in lubricentro_myc").

Now yes, we can run the development server using:

```bash
npm install
npm run dev
```

The server runs in http://localhost:3000.

## Setup Using Docker

#### Build Image and Run Container

```bash
docker compose build
docker compose up
```

## Run Cypress E2E tests

In the BE root folder (`./lubricentro_myc`):

```bash
docker-compose -f docker-compose-test.yml up -d --build
docker-compose -f docker-compose-test.yml run --rm web python3 manage.py migrate --noinput
```

It will run the BE using an empty database just for testing purposes.

In this project root folder:

```bash
npm run build
npm run start:e2e
```

For running the e2e tests in the command line:

```bash
npm run cypress:run
```

For running the e2e tests using the Cypress interactive mode:

```bash
npm run cypress:open
```
