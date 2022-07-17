# Lubricentro M&C Frontend

## Setup

The first step is to have running the [backend server](https://github.com/MatiasAdrian4/lubricentro_myc "backend server").

Once that is done, ``npm run generate-backend-client``needs to be executed in order to generate the openapi client using [the spec defined in lubricentro_myc](https://github.com/MatiasAdrian4/lubricentro_myc/blob/develop/docs/swagger.yaml "the spec defined in lubricentro_myc").

Now yes, we can run the development server using:

```bash
npm install
npm run dev
```

The server runs in http://localhost:3000.