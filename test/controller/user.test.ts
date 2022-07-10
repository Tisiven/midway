import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";

describe("test/controller/user.test.ts", () => {
  it("should GET /api/login", async () => {
    const app = await createApp<Framework>();
    const usera = {
      username: "jack",
      password: "redballoon",
    }

    await createHttpRequest(app).post("/api/addUser").send(usera);

    const beginTime = Date.now()
    const queryResult = await createHttpRequest(app).post("/api/login").send(usera);
    const cutTime = Date.now() - beginTime;
    
    expect(queryResult.status).toBe(200);
    expect(queryResult.body.code).toBe(200);
    expect(typeof queryResult.body.data.token).toBe('string');
    expect(cutTime).toBeLessThan(1000);


    const beginTime2 = Date.now()
    const queryResult2 = await createHttpRequest(app).post("/api/login").send({
      username: "aaa",
      password: "bbb",
    });
    const cutTime2 = Date.now() - beginTime2;


    expect(queryResult2.status).toBe(200);
    expect(queryResult2.body.code).toBe(400);
    expect(cutTime2).toBeLessThan(1000);

    await close(app);
  });
});
