import MessageList from "@/components/MessageList";
import Navbar from "@/components/navbar";
import Searchbar from "@/components/Searchbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/dexdb";
import { useLiveQuery } from "dexie-react-hooks";
export default function Conversations() {
  const conversations = useLiveQuery(() => {
    return db.Conversations.toArray();
  }, []);
  return (
    <main className="container">
      <Navbar />
      <Searchbar />
      <ScrollArea>
        {conversations?.map((convo) => (
          <MessageList
            username={convo.username}
            convoId={convo.id}
            key={convo.id}
          />
        ))}
      </ScrollArea>
    </main>
  );
}
