import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
export default function MessageList(){
    return (
      <Link href={'/chats/someid'}>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Acme Inc</div>
              <div className="text-muted-foreground text-sm line-clamp-1">
                Hey, just wanted to follow up on that proposal we discussed yesterday.
              </div>
            </div>
            <div className="text-xs text-muted-foreground">2h</div>
          </div>
    </Link>
    )
}