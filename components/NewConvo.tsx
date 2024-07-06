import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NewConvoForm } from "./NewConvoForm";

export function NewConvo() {
  return (
    <Drawer>
      <DrawerTrigger className="bg-secondary-foreground py-1 px-2 rounded-sm text-secondary text-sm">
        New
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Conversation</DrawerTitle>
          <DrawerDescription>
            <NewConvoForm />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
