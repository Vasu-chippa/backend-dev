# Metric/Imperial Converter

A full-stack JavaScript converter for gallons/liters, miles/kilometers, and
pounds/kilograms. The browser interface is served by Express, and conversions
are also available through a JSON API.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `sample.env` to `.env`. Set `PORT` to the port you want to use and add
   `NODE_ENV=test` when running the tests automatically.
3. Start the app with `npm start`, then open `http://localhost:3000`.

Run the test suite with `npm test`.

## Deploy to Render

The root `render.yaml` configures a free Node.js web service from the
`metric-imperial-converter` branch. In the [Render Dashboard](https://dashboard.render.com),
choose **New > Blueprint**, connect `Vasu-chippa/backend-dev`, select the
`metric-imperial-converter` branch, and deploy the Blueprint. Render will build
with `npm ci` and start the service with `npm start`.

## Conversion API

Send a value and unit to `GET /api/convert?input=4gal`. Numbers may be whole,
decimal, fractional, or omitted (omitted numbers default to `1`). Supported
units are `gal`, `L`, `mi`, `km`, `lbs`, and `kg`, in either letter case.
Results are rounded to five decimal places.

Successful response:

```json
{
  "initNum": 4,
  "initUnit": "gal",
  "returnNum": 15.14164,
  "returnUnit": "L",
  "string": "4 gallons converts to 15.14164 liters"
}
```

Invalid inputs return a JSON object with an `error` value: `invalid unit`,
`invalid number`, or `invalid number and unit`.
