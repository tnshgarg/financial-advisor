"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./constants";

function SignupForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error }: any = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      });
      if (error) {
        console.error(error.message);
      } else {
        console.log("Sign-up successful. User:", data.user);
      }
      form.reset();
    } catch (error: any) {
      console.error("Error during sign-up:", error.message);
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <FormField
            name="email" // Make sure this matches the field name in formSchema
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle">
                <FormControl className=" p-0">
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password" // Make sure this matches the field name in formSchema
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10 flex flex-row align-middle">
                <FormControl className=" p-0">
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    disabled={isLoading}
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
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
