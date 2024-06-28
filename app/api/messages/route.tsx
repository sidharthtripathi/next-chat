
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";



export async function GET(req : NextRequest){
    
    
    
    const searchParams = req.nextUrl.searchParams
    const username = headers().get("username")
    const id = headers().get("id")
    if(!username) return NextResponse.json([],{status : 401})
    const conversationId = searchParams.get("conversationId")
    const timeStamp = searchParams.get("timeStamp")
    if(!conversationId || !timeStamp) return NextResponse.json([],{status : 400})
    const isPartOfConvo = await db.conversation.findFirst({
        where : {
            AND : [{id : conversationId},{users : {some : {id: id as string} }}]
        },
        select : {id : true}
    })
    if(!isPartOfConvo){
        return NextResponse.json([],{status : 401})
    }
    // getting chats from redis
    


    // getting chats from mongo
    const chats = await db.message.findMany({
        where : {
            AND : [{id : conversationId},{createdAt : {gt : timeStamp}}]
        },
       
    })
    
    
    return NextResponse.json(chats)
}