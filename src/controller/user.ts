import {
  Inject,
  Controller,
  Provide,
  Validate,
  Post,
  ALL,
  Body,
} from "@midwayjs/decorator";

import { Context } from "egg";

import { UserModel } from "../model/user";
import { JwtService } from "@midwayjs/jwt";
import { UserLoginDTO } from "../dto/user.dto";

@Provide()
@Controller("/api")
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  @Post("/addUser")
  @Validate()
  async createUser(@Body(ALL) loginData: UserLoginDTO) {
    try {
      await this.userModel.createUser(loginData);
      return { code: 200, result: "success", message: "添加用户成功" };
    } catch (error) {
      return { code: 400, result: "fail", message: "添加用户失败" };
    }
  }

  @Post("/login")
  @Validate()
  async updateUser(@Body(ALL) loginData: UserLoginDTO) {
    try {
      const data = await this.userModel.getUserByUsernameAndPassword(loginData);
      if (data) {
        return {
          code: 200,
          result: "success",
          message: "登录成功",
          data: {
            token: this.jwtService.signSync({ ...loginData }),
          },
        };
      } else {
        throw new Error()
      }
    } catch (error) {
      return {
        code: 400,
        result: "error",
        message: "账号或密码不正确",
        data: null,
      };
    }
  }
}
