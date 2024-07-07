"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convoState } from "@/state/ConvoState";
import { useSetRecoilState } from "recoil";
export default function MessageList({
  username,
  lastMessage,
  convoId,
}: {
  username: string;
  lastMessage?: string;
  convoId: string;
}) {
  const setConvoState = useSetRecoilState(convoState);
  return (
    <div
      onClick={() => {
        setConvoState({ id: convoId, username });
      }}
      className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors"
    >
      <Avatar>
        <AvatarImage src="/boy.png" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium">{username}</div>
        <div className="text-muted-foreground text-sm line-clamp-1">
          {lastMessage ? lastMessage : "last msg"}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">2h</div>
    </div>
  );
}
