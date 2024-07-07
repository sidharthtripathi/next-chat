import { db } from "./dexdb";
import { generateRandomHexString } from "./utils";
type SyncResponse = {
  convos: {
    id: string;
    createdAt: string;
    users: {
      id: string;
      username: string;
    }[];
  }[];
  messages: {
    id: string;
    createdAt: string;
    content: string;
    senderId: string;
    conversationId: string;
  }[];
};
export async function syncLocalDB() {
  const lastSync = await db.LastSync.limit(1).toArray();
  const timeStamp =
    lastSync.length == 0
      ? new Date(0).toISOString()
      : lastSync[lastSync.length - 1].lastSync;
  const res = await fetch(`/api/sync?timeStamp=${timeStamp}`);
  const data = (await res.json()) as SyncResponse;
  console.log(data);
  data.convos.forEach(async (convo) => {
    await db.Conversations.add({
      id: convo.id,
      username: convo.users[convo.users.length - 1].username,
      createdAt: convo.createdAt,
      userId: convo.users[convo.users.length - 1].id,
    });
  });
  data.messages.forEach(async (message) => {
    await db.Messages.add(message);
  });
  if (lastSync.length == 0)
    await db.LastSync.add({
      id: "syncId",
      lastSync: new Date().toISOString(),
    });
  else
    await db.LastSync.update(lastSync[lastSync.length - 1].id, {
      lastSync: new Date().toISOString(),
    });
  return true;
}
