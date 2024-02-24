"use client";

import { BotAvatar } from "@/components/bot-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Copy,
  Edit,
  Linkedin,
  Loader,
  Mail,
  Save,
  Twitter,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { formSchema } from "../conversation/constants";

const CommunityPostComponent = () => {
  return (
    <span className="flex flex-row align-middle ">
      <Youtube size={"20px"} className="mr-2" /> Community Post
    </span>
  );
};

const TwitterThreadComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Twitter size={"20px"} className="mr-2" /> Twitter Post
    </span>
  );
};

const LinkedinPostComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Linkedin size={"20px"} className="mr-2" /> LinkedIn Post
    </span>
  );
};

const WordpressComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Linkedin size={"20px"} className="mr-2" /> Wordpress Blog Post
    </span>
  );
};

const EmailComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Mail size={"20px"} className="mr-2" /> Newsletter
    </span>
  );
};

const ScriptComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Youtube size={"20px"} className="mr-2" /> Youtube Script
    </span>
  );
};

const SEOComponent = () => {
  return (
    <span className="flex flex-row align-middle">
      <Youtube size={"20px"} className="mr-2" /> Youtube Titles & Tags
    </span>
  );
};

export default function HomePage() {
  const router = useRouter();
  const proModal = useProModal();
  const [dropdownSelection, setDropdownSelection] = useState<React.ReactNode>(
    <h1>Select Platform 👇</h1>
  );
  const [dropdownValue, setDropdownValue] = useState<string>("");
  const [contentEditable, setContentEditable] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [isLoggedInModalVisible, setIsLoggedInModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await axios.get("/api/auth-checker");
    console.log("Response: ", response);
    if (response.data.status == 401) setIsLoggedInModalVisible(true);
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.prompt.length == 0) return;

      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const response = await axios.post("/api/conversation", {
        value: values.prompt,
        postType: dropdownValue,
      });
      console.log("RESPO: ", response);
      if (response.status == 401) setIsLoggedInModalVisible(true);
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  function dropdownStyleSelector() {
    if (dropdownValue == "youtube") {
      return "bg-red-100";
    } else if (dropdownValue == "twitter") {
      return "bg-blue-100";
    } else if (dropdownValue == "linkedin") {
      return "bg-blue-200";
    } else {
      return "";
    }
  }

  const createAndDownloadFile = (text: string) => {
    const blob = new Blob([text], { type: "text/plain" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "draaft-yt-script.txt";

    // Step 4: Trigger Download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast("Post Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  return (
    <div className="px-4 md:px-30 lg:px-48">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center">
          {"Let's Create Something Views-Worthy!"}
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-[120px]">
          {
            "You can generate your Social Media Posts, Youtube Video Scripts, Video Titles, Video Description, Video Tags, Wordpress Post, Email Newsletter all in one place"
          }
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 py-2 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white"
        >
          <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={cn(
                    "text-left w-52 border",
                    dropdownStyleSelector()
                  )}
                  variant="outline"
                >
                  {dropdownSelection}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="bg-red-100 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("youtube");
                      setDropdownSelection(<CommunityPostComponent />);
                    }}
                  >
                    <CommunityPostComponent />
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-red-100 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("script");
                      setDropdownSelection(<ScriptComponent />);
                    }}
                  >
                    <ScriptComponent />
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-red-100 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("seo");
                      setDropdownSelection(<SEOComponent />);
                    }}
                  >
                    <SEOComponent />
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("twitter");
                      setDropdownSelection(<TwitterThreadComponent />);
                    }}
                  >
                    <TwitterThreadComponent />
                    <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-blue-200 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("linkedin");
                      setDropdownSelection(<LinkedinPostComponent />);
                    }}
                  >
                    <LinkedinPostComponent />
                    <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-blue-200 cursor-pointer"
                    onClick={() => {
                      setDropdownValue("wordpress");
                      setDropdownSelection(<WordpressComponent />);
                    }}
                  >
                    <WordpressComponent />
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-[#FFE01B] cursor-pointer"
                    onClick={() => {
                      setDropdownValue("newsletter");
                      setDropdownSelection(<EmailComponent />);
                    }}
                  >
                    <EmailComponent />
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle flex-1">
                  <FormControl className="p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ml-4"
                      disabled={isLoading}
                      placeholder={
                        dropdownValue == "script"
                          ? "Enter your Video Topic"
                          : "Enter a valid Youtube Video URL"
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
          <Button
            className="col-span-12 lg:col-span-2 w-full bg-black text-md hover:bg-red-500"
            type="submit"
            disabled={isLoading}
            size="icon"
          >
            Generate
          </Button>
        </form>
      </Form>
      {/* <div className="py-4 flex justify-between items-start align-top flex-wrap">
        <div
          className="flex-shrink-0"
          style={{ maxWidth: "49%", marginBottom: 20 }}
        >
          <TwitterPost
            userName={"Content Creator"}
            userHandle={"@NextMrBeast"}
          />
        </div>
        <div
          className="flex-shrink-0"
          style={{ maxWidth: "49%", marginBottom: 20 }}
        >
          <LinkedinPost userName={"Content Creator"} />
        </div>
        <div
          className="flex-shrink-0"
          style={{ maxWidth: "49%", marginBottom: 20 }}
        >
          <YoutubeSEO
            content="What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making"
            userName={"Content Creator"}
          />
        </div>
        <div
          className="flex-shrink-0"
          style={{ maxWidth: "49%", marginBottom: 20 }}
        >
          <WordpressPost
            content="What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making"
            userName={"Content Creator"}
          />
        </div>
        <div
          className="flex-shrink-0"
          style={{ maxWidth: "49%", marginBottom: 20 }}
        >
          <EmailPost
            content="What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making"
            userName={"Content Creator"}
          />
        </div>
      </div> */}
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-[#fffdf9]">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No Content Generated" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10 p-3"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              {message.role === "user" ? (
                <p className="mt-1">{message.content!}</p>
              ) : (
                <div
                  contentEditable={contentEditable}
                  style={{ whiteSpace: "pre-line" }}
                  className={cn(contentEditable ? "bg-white" : "")}
                >
                  {message.content!}
                </div>
              )}

              {message.role !== "user" && (
                <div>
                  <div className="flex flex-row mb-2">
                    <div
                      onClick={() => copyToClipboard(message.content!)}
                      className={cn(
                        "p-2 w-fit rounded-md bg-gray-200 cursor-pointer relative group"
                      )}
                    >
                      <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-2 border border-gray-300 rounded">
                        Copy
                      </span>
                      <Copy className={cn("w-3 h-3")} />
                    </div>
                    <div
                      onClick={() => setContentEditable(true)}
                      className={cn(
                        "p-2 w-fit rounded-md bg-gray-200 cursor-pointer ml-2 relative group"
                      )}
                    >
                      <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-2 border border-gray-300 rounded">
                        Edit
                      </span>
                      <Edit className={cn("w-3 h-3")} />
                    </div>
                  </div>
                  {contentEditable && (
                    <div
                      onClick={() => setContentEditable(false)}
                      className={cn(
                        "p-2 w-fit rounded-md bg-lime-400 cursor-pointer"
                      )}
                    >
                      <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-2 border border-gray-300 rounded">
                        Save
                      </span>
                      <div className="flex flex-row items-center">
                        <Save className={cn("w-3 h-3 mr-1")} />
                        Save
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <AlertDialog open={isLoggedInModalVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You need to Sign Up before using Draaft
            </AlertDialogTitle>
            <AlertDialogDescription>
              This is done to prevent unauthorized access. Hope you understand!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push("/sign-up")}
              className="bg-black text-white text-md hover:bg-gray-700"
            >
              Sign Up
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => router.push("/sign-in")}
              className="bg-white text-black text-md hover:bg-gray-100"
            >
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
