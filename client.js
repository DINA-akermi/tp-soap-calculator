const soap = require('soap');

const WSDL_URL = 'http://localhost:8000/calculator?wsdl';

async function main() {
  try {
    const client = await soap.createClientAsync(WSDL_URL);

    console.log(" Client connecté\n");

    const [add] = await client.AddAsync({ a: 10, b: 5 });
    console.log("Add:", add.result);

    const [sub] = await client.SubtractAsync({ a: 10, b: 3 });
    console.log("Subtract:", sub.result);

    const [mul] = await client.MultiplyAsync({ a: 4, b: 7 });
    console.log("Multiply:", mul.result);

    const [div] = await client.DivideAsync({ a: 20, b: 4 });
    console.log("Divide:", div.result);

    const [mod] = await client.ModuloAsync({ a: 10, b: 3 });
    console.log("Modulo:", mod.result);

    const [pow] = await client.PowerAsync({ a: 2, b: 3 });
    console.log("Power:", pow.result);

  } catch (err) {
    console.error("Erreur:", err.message);
  }
}

main();