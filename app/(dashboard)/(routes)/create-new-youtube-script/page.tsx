"use client";

import * as z from "zod";
import axios from "axios";
import { Download, Lightbulb } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/editor";

const CreateNew = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const script = searchParams.get("script");
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
    <div className="bg-[#fffdf9]">
      <Heading
        title="Work on Your Next Idea!"
        description="Create Your Next Video Script in less than 30 seconds and Make Changes Right Here!"
        icon={Lightbulb}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      />
      {/* <div className="px-8 py-2">
        <Editor
          editable
          initialContent={generatedContent}
          onChange={(text) => {
            console.log("TEXT: ", text);
          }}
        />
      </div> */}
      <div>{script}</div>
    </div>
  );
};

export default CreateNew;
