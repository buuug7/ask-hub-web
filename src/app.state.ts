import { atom } from "recoil";
import { User } from "./app.types";
import { getSessionUser } from "./util";

export const userState = atom<User | null>({
  key: "userState",
  default: getSessionUser(),
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});
