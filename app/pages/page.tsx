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

export default function ChatSection() {
  const { chatId } = useParams();
  const [chats, setChats] = useState<Message[]>([]);
  console.log(chatId);

  return (
    <main className="flex flex-col md:container md:px-0 px-2 h-[100dvh] pb-4 gap-y-4">
      <div className="flex flex-col">
        <div className="bg-background border-b h-14 flex items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeftIcon className="hover:cursor-pointer w-4 h-4" />
            </Link>

            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Acme Inc</div>
              <span className="text-muted-foreground text-xs">Typing...</span>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="grow px-4">
        {chats.map((chat) => {
          return <SentMessage content={chat.content} key={chat.id as string} />;
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

function ReceivedMessage() {
  return (
    <div className="flex text-sm justify-start my-3">
      <span className="bg-primary-foreground text-primary p-2 rounded-md max-w-[90%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quam
        nam suscipit quisquam nulla, veniam repellat alias doloremque doloribus
        porro earum iste placeat excepturi ea repellendus nostrum amet odit
        dignissimos?
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
