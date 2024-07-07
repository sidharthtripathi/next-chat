"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, Message } from "@/lib/dexdb";
import { useRecoilState, useSetRecoilState } from "recoil";
import { convoState } from "@/state/ConvoState";
import { useLiveQuery } from "dexie-react-hooks";

export default function ChatSection() {
  const [convo, setConvo] = useRecoilState(convoState);
  const [userId, setUserId] = useState<string | null>(null);
  const messages = useLiveQuery(() => {
    return db.Messages.where("conversationId")
      .equals(convo?.id as string)
      .toArray();
  }, []);
  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);
  return (
    <main className="flex flex-col md:container md:px-0 px-2 h-[100dvh] pb-4 gap-y-4">
      <div className="flex flex-col">
        <div className="bg-background border-b h-14 flex items-center">
          <div className="flex items-center gap-4">
            <ArrowLeftIcon
              className="hover:cursor-pointer w-4 h-4"
              onClick={() => {
                setConvo(undefined);
              }}
            />

            <Avatar>
              <AvatarImage src="/boy.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{convo?.username}</div>
              <span className="text-muted-foreground text-xs">Typing...</span>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="grow px-4">
        {messages?.map((message) => {
          if (message.senderId === userId)
            return <SentMessage content={message.content} key={message.id} />;
          else
            return (
              <ReceivedMessage key={message.id} content={message.content} />
            );
        })}
      </ScrollArea>
      <section className="flex gap-2">
        <Input type="text" placeholder="Enter you message" />
        <Button>Send</Button>
      </section>
    </main>
  );
}

function SentMessage({ content }: { content: string }) {
  return (
    <div className="flex text-sm justify-end my-3">
      <span className="bg-primary text-primary-foreground p-2 rounded-md max-w-[90%]">
        {content}
      </span>
    </div>
  );
}

function ReceivedMessage({ content }: { content: string }) {
  return (
    <div className="flex text-sm justify-start my-3">
      <span className="bg-primary-foreground text-primary p-2 rounded-md max-w-[90%]">
        {content}
      </span>
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import { db } from "@/lib/dexdb";
// import { syncChats } from "@/lib/syncChats";
// import { generateRandomHexString } from "@/lib/utils";
// import { useParams } from "next/navigation";

// export default function Test() {
//   const { chatId } = useParams();
//   console.log(chatId);
//   return (
//     <Button
//       onClick={() => {
//         syncChats(chatId as string);
//       }}
//     >
//       sync chats
//     </Button>
//   );
// }
