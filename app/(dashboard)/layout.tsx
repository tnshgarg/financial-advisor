import ParentNavbar from "@/components/navbarParent";
import { auth } from "@clerk/nextjs";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  // const isPro = await checkSubscription();
  // const apiLimitCount = await getApiLimitCount();

  // console.log("ISPRO: ", isPro);

  return (
    <div className="h-full relative bg-[#fffdf9]">
      <main className=" pb-10 bg-[#fffdf9]">
        <ParentNavbar isLoggedIn={userId ? true : false} />
        {children}
      </main>
      {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div> */}
    </div>
  );
};

export default DashboardLayout;
