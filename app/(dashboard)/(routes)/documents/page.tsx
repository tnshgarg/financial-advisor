"use client";

import Editor from "@/components/editor";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "../create-new/constants";
import { Textarea } from "@/components/ui/textarea";

function DocumentsPage() {
  const router = useRouter();
  const proModal = useProModal();
  const [generatedContent, setGeneratedContent] = useState<any>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  type PartialBlock = {
    id?: string;
    type?: string;
    content?: string;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/video-script", {
        videoTopic: values.prompt,
      });
      console.log("GPT Response: ", response.data);
      const responseContent: string = response.data?.content;
      const formattedContent: PartialBlock[] = [
        {
          type: "paragraph",
          content: responseContent,
        },
      ];
      setGeneratedContent(formattedContent);

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

    // setGeneratedContent(
    //   JSON.stringify([
    //     {
    //       id: "268d5bb5-6a20-446e-8870-31151eb390c7",
    //       type: "paragraph",
    //       props: {
    //         textColor: "default",
    //         backgroundColor: "default",
    //         textAlignment: "left",
    //       },
    //       content: [
    //         {
    //           type: "text",
    //           text: "text",
    //           styles: {},
    //         },
    //       ],
    //       children: [],
    //     },
    //   ])
    // );
    // router.refresh();
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
      <div className="bg-[#fffdf9]">
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
                  size="default"
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-[#fffdf9]">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-8 py-2">
        <Editor
          editable
          initialContent={generatedContent}
          onChange={(text) => {
            console.log("TEXT: ", text);
          }}
        />
      </div>
    </div>
  );
}

export default DocumentsPage;
