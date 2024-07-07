import Dexie, { type EntityTable } from "dexie";

interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  username: string;
  userId: string;
  createdAt: string;
}

interface LastSync {
  id: string;
  lastSync: string;
}

const db = new Dexie("MessageDatabase") as Dexie & {
  Messages: EntityTable<
    Message,
    "id" // primary key "id" (for the typings only)
  >;
} & {
  Conversations: EntityTable<Conversation, "id">;
} & {
  LastSync: EntityTable<LastSync, "id">;
};

// Schema declaration:
db.version(1).stores({
  Messages: "id, content, senderId,conversationId,createdAt", // primary key "id" (for the runtime!)
  Conversations: "id,userId,username,createdAt",
  LastSync: "id,lastSync",
});

export type { Message, Conversation, LastSync };

export { db };
