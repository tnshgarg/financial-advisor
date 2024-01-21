// pages/api/cart/add.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/initSupabase";

export async function POST(request: NextRequest) {
  const { product_id } = await request.json();
  const cookieStore = cookies();
  const supabaseClient = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabaseClient
      .from("cart")
      .insert({ user_id: user.id, product_id: product_id });

    if (error) {
      console.error("Error adding item to cart:", error.message);
      return new NextResponse("Internal Server Error", { status: 500 });
    }

    console.log("Item added to cart:", data);
    return new NextResponse("Item added to cart", { status: 200 });
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
