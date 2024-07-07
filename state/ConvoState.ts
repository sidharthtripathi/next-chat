import { v4 } from "uuid";
import { atom } from "recoil";
type ConvoCard = {
  username: string;
  id: string;
};
export const convoState = atom<ConvoCard | undefined>({
  key: v4(),
  default: undefined,
});
