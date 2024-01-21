import { UserButton } from "@clerk/nextjs";

import { ShoppingBag } from "lucide-react";

const Navbar = async ({
  websiteName,
  copyWebsiteUrl,
}: {
  websiteName: string;
  copyWebsiteUrl: () => void;
}) => {
  return (
    <div className="flex w-full justify-end">
      <div className="w-full flex flex-row align-middle items-center rounded-lg justify-end ml-auto mr-4 ">
        {/* <span className="ml-1 flex flex-row align-middle items-center bg-red-500 p-2 rounded-md">
          <span
            onClick={() => {
              window.open(websiteName, "_blank");
            }}
            className="underline text-white ml-1 cursor-pointer"
          >
            {websiteName}
          </span>
          <Copy
            onClick={copyWebsiteUrl}
            className="ml-2 cursor-pointer text-white"
            width={14}
            height={14}
          />
        </span> */}
      </div>
      {/* <Button variant="premium" className="w-50 mr-4 h-9">
        Upgrade
        <Zap className="w-4 h-4 ml-2 fill-white" />
      </Button> */}
      <div className="flex flex-row items-center mr-4 cursor-pointer hover:bg-slate-100 rounded-full">
        <ShoppingBag className="mr-2" />
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
