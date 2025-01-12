"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Empty } from "@/components/ui/empty";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { formSchema } from "../conversation/constants";

export default function HomePage() {
  const [messages, setMessages] = useState<{ role: string; content: any }[]>([]);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onerror = (event: { error: any; }) => {
      setIsListening(false);
      setError(`Error: ${event.error}`);
    };

    recognition.onresult = (event: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const result = Array.from(event.results)
        .map((res: any) => res[0].transcript)
        .join("");
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const onSubmit = async () => {
    try {
      if (transcript.length === 0) return;

      const userMessage = {
        role: "user",
        content: transcript,
      };

      const response = await axios.post("/api/conversation", {
        data: transcript,
      });

      console.log("Response: ", response.data);

      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "bot", content: response.data },
      ]);

      setTranscript("")
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const playText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="px-4 md:px-30 lg:px-48">
      <div className="mb-8 space-y-4 text-center">
        <h2 className="text-2xl md:text-5xl font-bold text-blue-600">धनशक्ति</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg">
        नीचे दिए गए बटन पर क्लिक करें और भारतीय भाषा (जैसे हिंदी, तमिल, कन्नड़) में बोलें।
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 py-2 md:px-6 bg-white grid grid-cols-12 gap-2"
      >
        <div className="col-span-12 lg:col-span-9">
          <p className="text-gray-700 mt-2">{transcript || "No speech detected yet..."}</p>
        </div>
        <div className="flex space-x-2 col-span-12 lg:col-span-3">
          <button
            type="button"
            onClick={startListening}
            disabled={isListening}
            className={`px-4 py-2 rounded-md font-medium ${
              isListening ? "bg-gray-400" : "bg-blue-600 text-white"
            }`}
          >
            {isListening ? "Listening..." : "Start Listening"}
          </button>
          <button
            type="submit"
            disabled={isListening || !transcript}
            className={`px-4 py-2 rounded-md font-medium ${
              isListening ? "bg-gray-400" : "bg-green-600 text-white"
            } ${
              !transcript && "cursor-not-allowed bg-gray-400"
            }`}
            onClick={onSubmit}
          >
            Generate
          </button>
        </div>
      </form>

      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-[#fffdf9]">
            <Loader />
          </div>
        )}

        {messages.length === 0 && !isLoading && <Empty label="No Content Generated" />}

        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="mt-1 whitespace-pre-line">{message.content}</p>
              {message.role === "bot" && (
                  <button
                    onClick={() => playText(message.content)}
                    className="mt-2 px-4 py-1 rounded-md bg-blue-500 text-white"
                  >
                    Play
                  </button>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}