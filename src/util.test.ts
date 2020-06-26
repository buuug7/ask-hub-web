import { getSessionUser, to } from "./util";
import axios, { AxiosRequestConfig } from "axios";

describe("test getSessionUser", () => {
  test("it return null", () => {
    const user = getSessionUser();
    expect(user).toBeNull();
  });
});

describe("test **to** function", () => {
  test("return a value when resolved", async () => {
    const promise = Promise.resolve({
      data: "some data",
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    });
    const [error, res] = await to(promise);
    expect(error).toBeNull();
    expect(res?.data).toBe("some data");
  });

  test("return a error when reject", async () => {
    const promise = Promise.reject({ message: "some Error" });
    const [error, res] = await to(promise);
    expect(error).toHaveProperty("message");
    expect(res).toBeUndefined();
  });
});
