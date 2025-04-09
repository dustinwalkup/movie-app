import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Please login or create an account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LoginLink>
            <Button className="w-full">Login</Button>
          </LoginLink>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground bg-black px-4">Or</span>
            </div>
          </div>
          <RegisterLink>
            <Button className="w-full" variant={"outline"}>
              Create Account
            </Button>
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
