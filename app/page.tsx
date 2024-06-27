import MessageList from "@/components/MessageList";
import Searchbar from "@/components/Searchbar";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home() {
  return (
    <main className="flex flex-col h-[100dvh] md:container ">
    <Navbar/>
    <ScrollArea className=" grow">
        <Searchbar/>
        <div className="space-y-4">
          <MessageList/>
          <MessageList/>
          <MessageList/>
          <MessageList/>
          <MessageList/>
          <MessageList/>
          <MessageList/>
          <MessageList/>
        </div>
      </ScrollArea>
    </main>
  )
}
