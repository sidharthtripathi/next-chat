import { v4 } from "uuid";
import { atom } from "recoil";
import { getSocket } from "@/lib/socket";

export const wsState = atom({
  key: v4(),
  default: getSocket(),
});
