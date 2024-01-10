# Build a SaaS AI Platform with Next.js 13, React, Tailwind, Prisma, Stripe | Full Tutorial 2023

![Copy of Copy of Copy of Fullstack Twitter Clone](https://github.com/AntonioErdeljac/next13-ai-saas/assets/23248726/c47e604a-b50b-4eb0-b420-fda20908f522)

This is a repository for Build a SaaS AI Platform with Next.js 13, React, Tailwind, Prisma, Stripe | Full Tutorial 2023.

[VIDEO TUTORIAL](https://www.youtube.com/watch?v=ffJ38dBzrlY)

Features:

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Clerk Authentication (Email, Google, 9+ Social Logins)
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- How to write POST, DELETE, and GET routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle relations between Server and Child components!
- How to reuse layouts
- Folder structure in Next 13 App Router

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-ai-saas.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |

## Wordpress Curl:

curl -X POST \
 -H "Authorization: Basic $(echo -n 'businesswithtanishgarg@gmail.com:gRsb uuvK PtZ2 BsBM MMiX LjCY' | base64)" \
 -H "Content-Type: application/json" \
 -d '{
"title": "New Post Title",
"content": "This is the content of the post.",
"status": "publish"
}' \
 https://tanishgarg.com/wp-json/wp/v2/posts

RESPONSE:

{"id":347,"date":"2024-01-03T13:05:47","date_gmt":"2024-01-03T07:35:47","guid":{"rendered":"https:\/\/tanishgarg.com\/new-post-title\/","raw":"https:\/\/tanishgarg.com\/new-post-title\/"},"modified":"2024-01-03T13:05:47","modified_gmt":"2024-01-03T07:35:47","password":"","slug":"new-post-title","status":"publish","type":"post","link":"https:\/\/tanishgarg.com\/new-post-title\/","title":{"raw":"New Post Title","rendered":"New Post Title"},"content":{"raw":"This is the content of the post.","rendered":"<p>This is the content of the post.<\/p>\n","protected":false,"block_version":0},"excerpt":{"raw":"","rendered":"<p>This is the content of the post.<\/p>\n","protected":false},"author":1,"featured_media":0,"comment_status":"open","ping_status":"open","sticky":false,"template":"","format":"standard","meta":{"\_mi_skip_tracking":false,"\_monsterinsights_sitenote_active":false,"\_monsterinsights_sitenote_note":"","\_monsterinsights_sitenote_category":0},"categories":[1],"tags":[],"permalink_template":"https:\/\/tanishgarg.com\/%postname%\/","generated_slug":"new-post-title","aioseo_notices":[],"\_links":{"self":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"collection":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts"}],"about":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/types\/post"}],"author":[{"embeddable":true,"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/users\/1"}],"replies":[{"embeddable":true,"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/comments?post=347"}],"version-history":[{"count":0,"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347\/revisions"}],"wp:attachment":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/media?parent=347"}],"wp:term":[{"taxonomy":"category","embeddable":true,"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/categories?post=347"},{"taxonomy":"post_tag","embeddable":true,"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/tags?post=347"}],"wp:action-publish":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-unfiltered-html":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-sticky":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-assign-author":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-create-categories":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-assign-categories":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-create-tags":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"wp:action-assign-tags":[{"href":"https:\/\/tanishgarg.com\/wp-json\/wp\/v2\/posts\/347"}],"curies":[{"name":"wp","href":"https:\/\/api.w.org\/{rel}","templated":true}]}}
