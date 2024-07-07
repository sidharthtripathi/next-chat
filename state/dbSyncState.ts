import { v4 } from "uuid";
import { atom } from "recoil";

export const dbSyncState = atom({
  key: v4(),
  default: false,
});
