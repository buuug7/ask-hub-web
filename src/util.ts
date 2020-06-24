import { AxiosResponse } from "axios";

export function getSessionUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
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