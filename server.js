const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// SERVICE SOAP
const calculatorService = {
  CalculatorService: {
    CalculatorPort: {

      Add(args) {
        return { result: Number(args.a) + Number(args.b) };
      },

      Subtract(args) {
        return { result: Number(args.a) - Number(args.b) };
      },

      Multiply(args) {
        return { result: Number(args.a) * Number(args.b) };
      },

      Divide(args) {
        if (Number(args.b) === 0) {
          throw {
            Fault: {
              Code: { Value: "SOAP-ENV:Client" },
              Reason: { Text: "Division par zéro impossible" }
            }
          };
        }
        return { result: Number(args.a) / Number(args.b) };
      },

      Modulo(args) {
        const a = Number(args.a);
        const b = Number(args.b);

        if (b === 0) {
          throw {
            Fault: {
              Code: { Value: "SOAP-ENV:Client" },
              Reason: { Text: "Modulo par zéro impossible" }
            }
          };
        }

        return { result: a % b };
      },

      Power(args) {
        const a = Number(args.a);
        const b = Number(args.b);
        return { result: Math.pow(a, b) };
      }
    }
  }
};

// WSDL
const wsdl = fs.readFileSync(path.join(__dirname, 'calculator.wsdl'), 'utf8');

app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
  console.log(` WSDL: http://localhost:${PORT}/calculator?wsdl`);

  soap.listen(app, '/calculator', calculatorService, wsdl);
});