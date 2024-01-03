"use client";

import * as z from "zod";
import axios from "axios";
import {
  Download,
  Lightbulb,
  Linkedin,
  MessageSquare,
  Twitter,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

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

const CreateNew = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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

      const response = await axios.post("/api/video-script", {
        videoTopic: values.prompt,
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

  return (
    <div className="bg-[#f0eee7]">
      <Heading
        title="Work on Your Next Idea!"
        description="Create Your Next Video Script in less than 30 seconds and Make Changes Right Here!"
        icon={Lightbulb}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle">
                    <FormControl className="mt-2 p-0">
                      <Textarea
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ml-4 -pt-10 text-md"
                        disabled={isLoading}
                        placeholder="Explain Your Next Youtube Video Idea!"
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
            <Empty label="No Script Generated" />
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
                <p
                  className={cn(
                    "text-sm",
                    message.role === "user" ? "mt-2" : ""
                  )}
                >
                  {message.content}
                </p>
                {message.role !== "user" && (
                  <div
                    onClick={() =>
                      createAndDownloadFile(
                        message.content ? message.content : ""
                      )
                    }
                    className={cn(
                      "p-2 w-fit rounded-md bg-gray-200 cursor-pointer"
                    )}
                  >
                    <Download className={cn("w-3 h-3")} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
