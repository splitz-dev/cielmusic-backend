import {
  Authorized,
  Body,
  BodyParam,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post
} from "routing-controllers";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { UserCreateDto } from "../Dto/UserCreateDto";

@JsonController()
export class AuthController {
  @Post("/sign-in")
  async signIn(
    @BodyParam("email", { required: true, validate: true }) email: string,
    @BodyParam("password", { required: true, validate: true }) password: string
  ) {
    const user = await new UserService().signIn(email, password);
    return {
      ...user,
      password: undefined
    };
  }

  @Post("/sign-up")
  async signUp(
    @Body({ required: true, validate: true }) userForm: UserCreateDto
  ) {
    const user = await new UserService().signUp(userForm);
    return {
      ...user,
      password: undefined
    };
  }

  @Authorized()
  @Get("/sign-out")
  signOut() {
    return {
      result: `sign out successfully`
    };
  }

  // 토큰으로 내 정보 호출
  @Get("/user-by-token/:token")
  getUserByToken(
    @CurrentUser({ required: true }) _: User,
    @Param("token") token: string
  ) {
    return new UserService().getUserByToken(token);
  }
}
