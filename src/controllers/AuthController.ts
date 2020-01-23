import {
  Authorized,
  Body,
  BodyParam,
  CurrentUser,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { UserCreateDto } from "../Dto/UserCreateDto";

@JsonController("/auth")
export class AuthController {
  @Post("/login")
  async signIn(
    @BodyParam("email", { required: true, validate: true }) email: string,
    @BodyParam("password", { required: true, validate: true }) password: string,
  ) {
    const user = await new UserService().signIn(email, password);
    return {
      ...user,
      password: undefined,
    };
  }

  @Post("/register")
  async signUp(@Body({ required: true, validate: true }) userForm: UserCreateDto) {
    const user = await new UserService().signUp(userForm);
    return {
      ...user,
      password: undefined,
    };
  }

  @Authorized()
  @Get("/logout")
  signOut() {
    return {
      result: `sign out successfully`,
    };
  }

  // 토큰으로 내 정보 호출
  @Get("/myinfo")
  getUser(@CurrentUser({ required: true }) user: User) {
    return {
      user,
    };
  }
}
