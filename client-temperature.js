const soap = require('soap');

const URL = 'http://localhost:8001/temperature?wsdl';

async function main() {
  try {
    const client = await soap.createClientAsync(URL);

    console.log("Temperature Service Connected\n");

    const [c2f] = await client.CelsiusToFahrenheitAsync({ celsius: 30 });
    console.log("30°C → Fahrenheit =", c2f.fahrenheit);

    const [f2c] = await client.FahrenheitToCelsiusAsync({ fahrenheit: 86 });
    console.log("86°F → Celsius =", f2c.celsius);

    const [c2k] = await client.CelsiusToKelvinAsync({ celsius: 30 });
    console.log("30°C → Kelvin =", c2k.kelvin);

  } catch (err) {
    console.error("Erreur:", err.message);
  }
}

main();