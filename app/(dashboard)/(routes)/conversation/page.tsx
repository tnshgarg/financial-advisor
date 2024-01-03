"use client";

import * as z from "zod";
import axios from "axios";
import { Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import { Youtube } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [dropdownSelection, setDropdownSelection] = useState<React.ReactNode>(
    <h1>Select Platform 👇</h1>
  );
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      // console.log("userMessage: ", userMessage);
      // const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        ytUrl: values.prompt,
        postType: dropdownValue,
      });
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

  return (
    <div>
      <Heading
        title="Social Posts Generator"
        description="Generate Social Media Posts for All Your Socials in less than 10 seconds!"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                bg-white
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className={cn(
                            "text-left w-56 border-2",
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
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormControl className="-mt-4 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ml-4 -pt-10"
                        disabled={isLoading}
                        placeholder="Enter a valid Youtube Video URL"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-black"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
