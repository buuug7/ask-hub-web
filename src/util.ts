import { AxiosResponse } from "axios";
import Showdown from "showdown";

export function getSessionUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getUserToken() {
  return sessionStorage.getItem("token");
}

/**
 * Async await wrapper for easy error handling
 * reference https://github.com/scopsy/await-to-js
 * @param promise
 * @param errorExt
 */
export function to<T extends AxiosResponse, U>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}

export const ShowdownConverter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
