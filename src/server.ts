import express from "express";
import { Action, useExpressServer } from "routing-controllers";
import "./utils/env";
import { AuthHelper } from "./utils/AuthHelper";
import { UserService } from "./services/UserService";

const app = express();
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

app.get("/", (_, res) => {
  res.send("hello");
});

useExpressServer(app, {
  cors: true,
  authorizationChecker: async (action: Action) => {
    const bearerToken = <string>action.request.headers.authorization;
    if (!bearerToken) return false;
    return true;
  },
  currentUserChecker: async (action: Action) => {
    if (!action.request.headers.authorization) return false;
    const token = action.request.headers.authorization.replace(/Bearer\s/, "");
    const authModel = AuthHelper.extract(token);
    if (!authModel) return false;
    const user = await new UserService().getUserByToken(token);
    if (!user) return false;
    return user;
  },
  controllers: [`${__dirname}/controllers/*.[jt]s`],
  middlewares: [`${__dirname}/middlewares/*.[jt]s`],
});

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
