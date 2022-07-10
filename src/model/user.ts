import { Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/orm";
import { Repository } from "typeorm";
import { UserLoginDTO } from "../dto/user.dto";

import User from "../entities/user.entity";

@Provide()
export class UserModel {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async createUser(user: UserLoginDTO): Promise<User> {
    return await this.userModel.save(user);
  }

  /**
   * 根据用户名和密码获取用户信息
   * @param user.username {String} 用户名
   * @param user.password {String} 用户密码
   */
  async getUserByUsernameAndPassword(user: UserLoginDTO): Promise<User> {
    return await this.userModel.findOne(user);
  }
}
