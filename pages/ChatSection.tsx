"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/dexdb";
import { useRecoilState, useRecoilValue } from "recoil";
import { convoState } from "@/state/ConvoState";
import { generateRandomHexString } from "@/lib/utils";
import { wsState } from "@/state/wsState";
import { useLiveQuery } from "dexie-react-hooks";

export default function ChatSection() {
  const [convo, setConvo] = useRecoilState(convoState);
  const [userId, setUserId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages = useLiveQuery(() => {
    return db.Messages.where("conversationId")
      .equals(convo?.id as string)
      .sortBy("createdAt");
  }, []);
  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <main className="flex flex-col md:container md:px-0 h-[100dvh]  pb-4 gap-y-4 container">
      <div className="flex flex-col px-4">
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
        <div ref={chatContainerRef}>
          {messages?.map((message) => {
            if (message.senderId === userId)
              return <SentMessage content={message.content} key={message.id} />;
            else
              return (
                <ReceivedMessage key={message.id} content={message.content} />
              );
          })}
        </div>
      </ScrollArea>
      <MessageForm
        userId={convo?.userId as string}
        senderId={userId as string}
        convoId={convo?.id as string}
      />
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

function MessageForm({
  convoId,
  senderId,
  userId,
}: {
  senderId: string;
  convoId: string;
  userId: string;
}) {
  const [msg, setMsg] = useState("");
  const socket = useRecoilValue(wsState);
  return (
    <section className="flex gap-2 px-4">
      <Input
        type="text"
        placeholder="Enter you message"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <Button
        onClick={async () => {
          const newmsg = {
            content: msg,
            id: generateRandomHexString(),
            senderId: senderId,
            conversationId: convoId,
            createdAt: new Date().toISOString(),
          };
          setMsg("");
          await db.Messages.add(newmsg);
          await db.LastSync.update("syncId", { lastSync: newmsg.createdAt });

          if (socket) {
            socket.send(
              JSON.stringify({
                id: newmsg.id,
                createdAt: newmsg.createdAt,
                msg: newmsg.content,
                to: userId,
                conversationId: convoId,
              })
            );
          }
        }}
      >
        Send
      </Button>
    </section>
  );
}
