const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8001;

const temperatureService = {
  TemperatureService: {
    TemperaturePort: {

      // C → F
      CelsiusToFahrenheit(args) {
        const c = Number(args.celsius);
        const result = (c * 9/5) + 32;

        console.log(`C → F : ${c} = ${result}`);
        return { fahrenheit: result };
      },

      // F → C
      FahrenheitToCelsius(args) {
        const f = Number(args.fahrenheit);
        const result = (f - 32) * 5/9;

        console.log(`F → C : ${f} = ${result}`);
        return { celsius: result };
      },

      // C → K
      CelsiusToKelvin(args) {
        const c = Number(args.celsius);
        const result = c + 273.15;

        console.log(`C → K : ${c} = ${result}`);
        return { kelvin: result };
      }

    }
  }
};

const wsdl = fs.readFileSync(
  path.join(__dirname, 'temperature.wsdl'),
  'utf8'
);

app.listen(PORT, () => {
  console.log(` Temperature Service running on http://localhost:${PORT}`);
  console.log(` WSDL: http://localhost:${PORT}/temperature?wsdl`);

  soap.listen(app, '/temperature', temperatureService, wsdl);
});