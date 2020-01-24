import express from "express";
import { useExpressServer } from "routing-controllers";
import "./utils/env";
import swaggerUi from "swagger-ui-express";
import { routingControllerOptions } from "./utils/routingConfig";

const app = express();
// eslint-disable-next-line no-console
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

useExpressServer(app, routingControllerOptions);

export function runServer(host: string, port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port, host, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

// eslint-disable-next-line import/first
import { spec } from "./utils/swagger";

app.use(swaggerUi.serve);
app.get("/", swaggerUi.setup(spec));
