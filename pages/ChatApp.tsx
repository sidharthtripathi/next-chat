"use client";

import { syncLocalDB } from "@/lib/syncLocalDB";
import { dbSyncState } from "@/state/dbSyncState";
import { userState } from "@/state/userState";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatSection from "./ChatSection";
import Conversations from "./ConversationsSection";
import { convoState } from "@/state/ConvoState";

export default function ChatApp() {
  const [dbSync, setDbSyncState] = useRecoilState(dbSyncState);
  const convo = useRecoilValue(convoState);
  useEffect(() => {
    async function run() {
      if (!dbSync) {
        await syncLocalDB();
        setDbSyncState(true);
      }
    }
    run();
  }, []);
  if (!dbSync) return <div>Loading...</div>;
  else {
    return convo ? <ChatSection /> : <Conversations />;
  }
}
