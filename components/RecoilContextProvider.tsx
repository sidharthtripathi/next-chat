"use client";

import { RecoilRoot, atom } from "recoil";
import RecoilNexus from "recoil-nexus";

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      {children}
    </RecoilRoot>
  );
}
