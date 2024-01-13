import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { title, content, status } = await req.json();
  /**
     curl -X POST \
 -H "Authorization: Basic $(echo -n 'businesswithtanishgarg@gmail.com:gRsb uuvK PtZ2 BsBM MMiX LjCY' | base64)" \
 -H "Content-Type: application/json" \
 -d '{
"title": "New Post Title",
"content": "This is the content of the post.",
"status": "publish"
}' \
 https://tanishgarg.com/wp-json/wp/v2/posts
     */
  const businessEmail = "businesswithtanishgarg@gmail.com";
  const wordpressSecret = "gRsb uuvK PtZ2 BsBM MMiX LjCY";
  const authorizationSecret = businessEmail + ":" + wordpressSecret;

  const response = await axios.post(
    "https://tanishgarg.com/wp-json/wp/v2/posts",
    {
      title,
      content,
      status,
    },
    {
      headers: {
        Authorization: `Basic ${btoa(authorizationSecret)}`,
        Accept: "application/json",
      },
    }
  );

  return NextResponse.json(response.data);
}
