# **Next.js Project study**

## **Overview**

This guide covers the essential topics you need to master for a **Next.js technical interview**, assuming you already know **React.js**. You'll learn **routing, data fetching, API handling, performance optimizations, and deployment** strategies in Next.js.

---

## **📌 1️⃣ Next.js Fundamentals**

### **File-Based Routing**

Next.js automatically creates **routes** based on the file structure inside `pages/`.

```txt
📂 pages/
 ├── index.tsx   →  "/" (Homepage)
 ├── counter.tsx   →  "/counter"
 ├── user/
 │    ├── profile.tsx  →  "/user/profile"
```

No need for React Router! ✅

### **Dynamic Routes (`[initialCounter].tsx`)**

Handles URLs like `/counter/1`, `/counter/2`, etc.

```tsx
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  return <h1>Initial counter: {router.query.initialCounter}</h1>;
};

export default UserPage;
```

✅ **Visiting `/counter/19` renders "User initialCounter: 19"**

### **Catch-All Routes (`[...slug].tsx`)**

Handles **multiple dynamic segments**.

```tsx
const BlogPost = () => {
  const router = useRouter();
  return <h1>Slug: {JSON.stringify(router.query.slug)}</h1>;
};

export default BlogPost;
```

✅ `/blog/post/nextjs` → `{ slug: ["post", "nextjs"] }`

---

## **🔥 2️⃣ Data Fetching Methods**

### **getStaticProps (SSG - Static Site Generation)**

Pre-fetches data **at build time**, making pages **super fast**.

```tsx
export async function getStaticProps() {
  const res = await fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=1&max=20&count=1"
  );
  const data = await res.json();

  return { props: { todo: data } };
}
```

✅ Ideal for **blogs, products, docs**—data doesn’t change often.

### **getStaticPaths (SSG with Dynamic Routes)**

When using `getStaticProps`, you **must define dynamic paths** ahead of time.

```tsx
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: "blocking",
  };
}
```

✅ Pre-generates `/user/1` and `/user/2`  
✅ `fallback: "blocking"` dynamically loads new pages

### **getServerSideProps (SSR - Server Side Rendering)**

Loads data **on every request**, perfect for constantly updated data.

```tsx
export async function getServerSideProps() {
  const res = await fetch("https://www.randomnumberapi.com/api/v1.0/random?min=1&max=20&count=1);
  const data = await res.json();

  return { props: { data } };
}
```

✅ Ideal for **user dashboards, real-time updates**

### **Client-Side Fetching (`useEffect`)**

For UI updates **after page load**, use fetch inside React’s `useEffect`:

```tsx
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <h1>Data: {JSON.stringify(data)}</h1>;
};
```

✅ **Does NOT affect SEO** (unlike SSG/SSR).

---

## **🚀 3️⃣ Performance Optimizations**

### **Next.js Image Optimization**

Use `<Image>` from `next/image` instead of `<img>` for **auto-optimized images**.

```tsx
import Image from "next/image";

const MyComponent = () => (
  <Image src="/logo.png" width={300} height={100} alt="Logo" />
);
```

✅ **Lazy loads images** for better performance  
✅ **Auto-compresses and resizes** dynamically

### **Code Splitting & Lazy Loading**

Dynamically load components only when needed.

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("../components/Heavy"), {
  ssr: false,
});
```

✅ **Reduces initial bundle size**  
✅ **Loads only when needed**

---

## **⚡ 4️⃣ API Routes & Middleware**

### **Serverless API Routes (`pages/api/`)**

Each file inside `pages/api/` becomes an API route.

📂 `pages/api/user.ts`

```tsx
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
```

✅ `/api/user` returns `{ name: "John Doe" }`  
✅ No need for Express or custom server

### **Middleware (Custom Request Handling)**

For authentication or request logging:

📂 `pages/api/auth.ts`

```tsx
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  res.status(200).json({ success: true });
}
```

✅ Restricts methods (`GET`, `POST`, etc.)

---

## **🔥 5️⃣ Deployment & Scaling**

### **Deploying to Vercel**

Next.js works best with **Vercel**, where API routes **auto-scale**.

```bash
npm run build && npm start
```

✅ **Automatic scaling** for API routes  
✅ **Zero-config deployment**

### **Using Environment Variables (`.env.local`)**

Securely store sensitive data.

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

Then access it in Next.js:

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### **Incremental Static Regeneration (ISR)**

Regenerate static pages **without a full rebuild**.

```tsx
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/products");
  const data = await res.json();

  return {
    props: { products: data },
    revalidate: 60, // Re-fetches data every 60 seconds
  };
}
```

✅ **Perfect for blogs, products, and frequently updated content**.

---
