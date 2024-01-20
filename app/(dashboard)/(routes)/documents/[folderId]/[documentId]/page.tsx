"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

const Document = () => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [promptMessage, setPromptMessage] = useState("");

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
      setValue(response.data.content);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
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
    <div>
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
                className="col-span-12 lg:col-span-2 w-full bg-black text-md"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        <ReactQuill
          placeholder="Start Writing your Script!"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default Document;
