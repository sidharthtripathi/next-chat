import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
export default function Navbar(){
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center py-2 bg-card">
        <Sheet>
          <SheetTrigger asChild className="block sm:hidden mr-4">
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs" >
            <nav className="flex flex-col text-lg font-medium">
              <a
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                
              >
                <MountainIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </a>
              <a
                href="#"
                className="px-2.5 text-muted-foreground hover:text-foreground"
                
              >
                <div className="h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className=" px-2.5 text-muted-foreground hover:text-foreground" >
                <div className="h-5 w-5" />
                Orders
              </a>
              <a
                href="#"
                className=" px-2.5 text-muted-foreground hover:text-foreground"
                
              >
                <div className="h-5 w-5" />
                Products
              </a>
              <a
                href="#"
                className=" px-2.5 text-muted-foreground hover:text-foreground"
                
              >
                <div className="h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                className=" px-2.5 text-muted-foreground hover:text-foreground"
                
              >
                <div className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center justify-center" >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        
        <nav className="ml-auto sm:flex gap-4 sm:gap-6 hidden">
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Pricing
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
            About
          </a>
          <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Contact
          </a>
        </nav>
        
      </header>
    )
}


function MountainIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }

  function MenuIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  