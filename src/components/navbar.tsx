import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";

export default async function Navbar() {
  // const { isAuthenticated } = getKindeServerSession();
  // const isLoggedIn = await isAuthenticated();
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-slate-800 px-4 py-2 text-sm sm:px-6 md:px-8 lg:px-12">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Movie App</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* {isLoggedIn ? (
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
        ) : (
          <div>
            <LoginLink>
              <Button>Sign In</Button>
            </LoginLink>
            <span className="ml-4">
              <RegisterLink>
                <Button variant={"outline"}>Sign Up</Button>
              </RegisterLink>
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
}
