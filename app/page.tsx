import ChatApp from "@/pages/ChatApp";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default function HomePage() {
  const username = headers().get("username");
  if (!username) redirect("/join");
  return (
    <main>
      <ChatApp />
    </main>
  );
}
