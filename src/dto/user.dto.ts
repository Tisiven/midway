import { Rule, RuleType } from "@midwayjs/decorator";

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}