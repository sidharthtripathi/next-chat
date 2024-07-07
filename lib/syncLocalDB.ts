import { db } from "./dexdb";
import { generateRandomHexString } from "./utils";
type SyncResponse = {
  id: string;
  users: { username: string }[];
  messages: {
    id: string;
    senderId: string;
    conversationId: string;
    content: string;
  }[];
}[];
export async function syncLocalDB() {
  const lastSync = await db.LastSync.limit(1).toArray();
  const timeStamp =
    lastSync.length == 0
      ? new Date(0).toISOString()
      : lastSync[lastSync.length - 1].lastSync;
  const res = await fetch(`/api/sync?timeStamp=${timeStamp}`);
  const data = (await res.json()) as SyncResponse;
  data.forEach(async (convo) => {
    await db.Conversations.add({
      id: convo.id,
      username: convo.users[convo.users.length - 1].username,
    });
    convo.messages.forEach(async (message) => {
      await db.Messages.add(message);
    });
  });
  if (lastSync.length == 0)
    await db.LastSync.add({
      id: generateRandomHexString(),
      lastSync: new Date().toISOString(),
    });
  else
    await db.LastSync.update(lastSync[lastSync.length - 1].id, {
      lastSync: new Date().toISOString(),
    });
  return true;
}
