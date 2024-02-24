import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between w-full">
      <Link href="/dashboard" className="flex items-center pl-3">
        <div className="relative mr-2">
          {/* <Image fill alt="Logo" src="/logo.png" /> */}
          <h1 className={cn("text-4xl font-bold text-red-500")}>@</h1>
        </div>
        <h1 className={cn("text-4xl font-bold")}>draaft</h1>
      </Link>
      <div className="flex w-full justify-end">
        {isLoggedIn ? (
          // <div className="flex flex-row items-center">
          //   <Button
          //     onClick={() => router.push("/settings")}
          //     className="mr-3 bg-transparent bg-slate-300 hover:bg-gray-300 hover:animate-in text-black"
          //   >
          //     <Settings2 className="w-4 h-4 mr-2" />
          //     Settings
          //   </Button>
          //   <UserButton afterSignOutUrl="/" />
          // </div>
          <div></div>
        ) : (
          <div>
            <Button
              color="black"
              className="bg-black text-sm mr-3 hover:bg-gray-600"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
            <Button
              color="black"
              variant={"outline"}
              className=" text-sm hover:bg-gray-200"
              onClick={() => router.push("/sign-in")}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
