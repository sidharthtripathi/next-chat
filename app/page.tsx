import MessageList from "@/components/MessageList";
import Searchbar from "@/components/Searchbar";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home() {
  return (
    <main className="flex flex-col h-[100dvh]">
    <Navbar/>
    <ScrollArea className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-4 grow">
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
