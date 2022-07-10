import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import { ConnectionOptions } from "typeorm";
import * as fs from 'fs';
import * as path from "path";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_{{keys}}";

  // add your config here
  config.middleware = [];

  config.orm = {
    type: "sqlite",
    name: "default",
    database: ":memory:",
    synchronize: true,
    dropSchema: true,
    logger: "advanced-console",
    entities: ["../entities/*"],
  } as ConnectionOptions;

  config.jwt = {
    secret: fs.readFileSync(path.join(__dirname, '../../private.key')).toString(),
    expiresIn: '7d',
  }

  config.security = {
    csrf: { enable: false },
  };

  return config;
};
