import { wsState } from "@/state/wsState";
import { setRecoil } from "recoil-nexus";

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
    socket.onerror = () => {
      console.log("errror while connecting !!");
    };
    socket.onclose = () => {
      handleDisconnect(socket);
    };
  }, 2000);
}
