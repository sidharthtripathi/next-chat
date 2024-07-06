import Dexie, { type EntityTable } from "dexie";

interface Message {
  id: String;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  username: string;
  lastMessage: string;
  createdAt: string;
}

const db = new Dexie("MessageDatabase") as Dexie & {
  Messages: EntityTable<
    Message,
    "id" // primary key "id" (for the typings only)
  >;
} & {
  Conversations: EntityTable<Conversation, "id">;
};

// Schema declaration:
db.version(1).stores({
  Messages: "id, content, senderId,conversationId,createdAt,updatedAt", // primary key "id" (for the runtime!)
  Conversations: "id,createdAt,username,lastMessage",
});

export type { Message, Conversation };

export { db };
