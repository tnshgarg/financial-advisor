// pages/api/cart/add.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/initSupabase";

export async function POST(request: NextRequest) {
  try {
    const { product_id } = await request.json();
    const supabaseClient = createServerComponentClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.auth.getSession();

    console.log("USERS:", user);
    console.log("USERDDD:", data);

    if (user) {
      const { data, error } = await supabaseClient
        .from("cart")
        .insert({ user_id: user.id, product_id: product_id });

      if (error) {
        console.error("Error adding item to cart:", error.message);
        return new NextResponse("Internal Server Error", { status: 500 });
      }

      console.log("Item added to cart:", data);
      return NextResponse.json(data);
    }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error) {
    return new NextResponse("Something Went Wrong ");
  }
}
