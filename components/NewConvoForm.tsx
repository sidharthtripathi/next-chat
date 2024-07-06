"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
export function NewConvoForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<
    { id: string; username: string } | undefined
  >(undefined);
  const [users, setUsers] = useState<
    { id: string; username: string; avatar?: string }[]
  >([]);
  return (
    <div className="h-[40dvh]">
      {step == 0 ? (
        <div className="space-y-2">
          <Label htmlFor="search">Search For users</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="search for users..."
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setLoading(true);
                fetch(`/api/users?q=${query}`)
                  .then((res) => res.json())
                  .then((res: { id: string; username: string }[]) => {
                    setUsers(res);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              search
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <>
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </>
            ) : (
              users.map((user) => (
                <UserCard
                  setStep={setStep}
                  setUser={setUser}
                  avatar={user.avatar ? user.avatar : "/placeholder.jpg"}
                  username={user.username}
                  id={user.id}
                  key={user.id}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon
              className="w-4 h-4 hover:cursor-pointer"
              onClick={() => {
                setStep(0);
              }}
            />
            <span>Go back</span>
          </div>

          <div className="space-y-2">
            <p>
              Send Message to{" "}
              <span className="text-xl font-bold">{user?.username}</span>
            </p>
            <div className="flex justify-center gap-2">
              <Input
                type="text"
                placeholder="Type your message here..."
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
              <Button
                onClick={(e) => {
                  fetch("/api/chats", {
                    method: "POST",
                    body: JSON.stringify({ msg, to: user?.id }),
                  })
                    .then((res) => res.json())
                    .then((res: { id: string }) => {
                      console.log(res);
                      router.push(`/chats/${res.id}`);
                    });
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserCard({
  setStep,
  setUser,
  username,
  avatar,
  id,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setUser: Dispatch<
    SetStateAction<
      | {
          id: string;
          username: string;
        }
      | undefined
    >
  >;
  username: string;
  avatar: string;
  id: string;
}) {
  return (
    <div
      className="flex items-center gap-2 bg-secondary p-2 rounded-md"
      onClick={() => {
        setStep(1);
        setUser({ username, id });
      }}
    >
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
        <AvatarImage src={avatar ? avatar : "/placeholder.jpg"} />
      </Avatar>
      <span className="font-bold underline underline-offset-2 text-secondary-foreground">
        @{username}
      </span>
    </div>
  );
}
