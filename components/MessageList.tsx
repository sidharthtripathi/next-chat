import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export default function MessageList({
  username,
  lastMessage,
  convoId,
}: {
  username: string;
  lastMessage: string;
  convoId: string;
}) {
  return (
    <Link href={`/chats/${convoId}`}>
      <div className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-medium">{username}</div>
          <div className="text-muted-foreground text-sm line-clamp-1">
            {lastMessage}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">2h</div>
      </div>
    </Link>
  );
}
