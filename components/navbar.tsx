import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import { Montserrat } from "next/font/google";
const font = Montserrat({ weight: "600", subsets: ["latin"] });

const Navbar = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between w-full">
      <Link href="/dashboard" className="flex items-center">
        <div className="relative mr-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
      </Link>
      <div className="flex w-full justify-end">
        {isLoggedIn ? (
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
        <Button
              color="black"
              variant={"outline"}
              className=" text-sm hover:bg-gray-200"
              onClick={() => router.push("/quiz")}
            >
          Take a Quick Quiz
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
