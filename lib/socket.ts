import { wsState } from "@/state/wsState";
import { setRecoil } from "recoil-nexus";
import { db } from "./dexdb";

export function getSocket() {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    let socket = new WebSocket("ws://localhost:8081");
    socket.onopen = () => {
      console.log("connected !!");
    };
    socket.onerror = () => {
      console.log("errror while connecting !!");
    };
    socket.onclose = () => {
      handleDisconnect(socket);
    };
    socket.onmessage = async (msg) => {
      let newmsg = JSON.parse(msg.data) as {
        msg: string;
        from: string;
        conversationId: string;
        id: string;
        createdAt: string;
      };
      await db.Messages.add({
        content: newmsg.msg,
        conversationId: newmsg.conversationId,
        createdAt: newmsg.createdAt,
        senderId: newmsg.from,
        id: newmsg.id,
      });
    };
    return socket;
  }
}

function handleDisconnect(socket: WebSocket) {
  console.log("disconnected...");
  setTimeout(() => {
    socket = new WebSocket("ws://localhost:8081");

    setRecoil(wsState, socket);
    socket.onopen = () => {
      console.log("connected !!");
    };
    socket.onmessage = (msg) => {
      console.log(msg.data);
    };
    socket.onerror = () => {
      console.log("errror while connecting !!");
    };
    socket.onclose = () => {
      handleDisconnect(socket);
    };
  }, 2000);
}
