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
  Loader,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { formSchema } from "../conversation/constants";

export function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Your browser does not support Speech Recognition.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'hi-IN'; // Set the language (e.g., 'ta-IN' for Tamil, 'kn-IN' for Kannada)
    recognition.interimResults = true; // To show intermediate results

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onerror = (event: { error: any; }) => {
      setIsListening(false);
      setError(`Error: ${event.error}`);
    };

    recognition.onresult = (event: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const result = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
    setIsListening(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Speech to Text</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Click the button below and speak in an Indian language (e.g., Hindi, Tamil, Kannada).
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`px-4 py-2 rounded-md font-medium ${isListening ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
        >
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className={`px-4 py-2 rounded-md font-medium ${!isListening ? 'bg-gray-400' : 'bg-red-600 text-white'}`}
        >
          Stop
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold text-gray-900">Transcript</h2>
        <p className="text-gray-700">{transcript || 'No speech detected yet...'}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const proModal = useProModal();
  const [contentEditable, setContentEditable] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Your browser does not support Speech Recognition.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'hi-IN'; // Set the language (e.g., 'ta-IN' for Tamil, 'kn-IN' for Kannada)
    recognition.interimResults = true; // To show intermediate results

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onerror = (event: { error: any; }) => {
      setIsListening(false);
      setError(`Error: ${event.error}`);
    };

    recognition.onresult = (event: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const result = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

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
    // console.log("Response: ", response);
    if (response.data.status == 401) setIsLoggedInModalVisible(true);
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      if (transcript.length == 0) return;

      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: transcript,
      };

      const response = await axios.post("/api/conversation", {
        data: transcript,
      });
      // console.log("RESPO: ", response);

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
          <FormItem className="col-span-12 lg:col-span-9 flex flex-row align-middle">
            {/* <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle flex-1">
                  <FormControl className="p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ml-4 mt-2"
                      disabled={isLoading}
                      placeholder={"Enter your query"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <p className="text-gray-700 mt-2">{transcript || 'No speech detected yet...'}</p>
          </FormItem>
          <div className="flex space-x-2 w-auto">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${isListening ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
            >
              {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <button
              onClick={onSubmit}
              disabled={isListening}
              className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${isListening ? 'bg-gray-400' : 'bg-red-600 text-white'}`}
            >
              Generate
            </button>
          </div>

        </form>
      </Form>

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
