import { Configuration } from "@midwayjs/decorator";

@Configuration({
  imports: ["@midwayjs/orm", '@midwayjs/jwt'],
  importConfigs: ["./config"],
})
export class ContainerConfiguration {}
