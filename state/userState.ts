import { v4 } from "uuid";
import { atom } from "recoil";
type User = {
  username: string;
  id: string;
};
export const userState = atom<User | undefined>({
  key: v4(),
  default: undefined,
});
