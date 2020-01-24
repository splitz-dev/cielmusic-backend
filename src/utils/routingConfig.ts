import { Action } from "routing-controllers";
import { AuthHelper } from "../utils/AuthHelper";
import { UserService } from "../services/UserService";

export const routingControllerOptions = {
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
  controllers: [`${__dirname}/../controllers/*.[jt]s`],
  middlewares: [`${__dirname}/../middlewares/*.[jt]s`],
};
