"use client"
import  React , {useState} from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JoinPage() {
  const { toast } = useToast()
  const [{username,password},setpayload] = useState({username: "",password: ""})
  const [loading,setLoading] = useState(false)
  return (
<section className="h-[100dvh] flex justify-center items-start pt-8">
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Join</CardTitle>
        <CardDescription>
            Enter username and password to either login or signup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">username</Label>
              <Input id="username" placeholder="zuck123" value={username} onChange={e=>setpayload({username : e.target.value,password})} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input type="password" id="password" placeholder="********" value={password} onChange={e=>setpayload({username,password : e.target.value})} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button 
        disabled = {loading || !username || !password}
        onClick={()=>{
          setLoading(true)
          fetch('/api/join',{method : "POST",body : JSON.stringify({username,password})})
          .then((res)=>{
            if(res.status == 200){

            }
            else if(res.status == 201 ){
              toast({
                title : "Success",
                description : "User created successfully",
                
              })
            }
            else{
              toast({
                title : "Oops",
                description : "Invalid credentials",
                variant : "destructive"
              })
            }
          })
          .finally(()=>{setLoading(false)})
        }}>Submit</Button>
      </CardFooter>
    </Card>
</section>
  )
}
