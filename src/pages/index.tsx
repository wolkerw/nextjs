import Link from "next/link";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000//api/counter?maxNumber=20");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return {
      props: { initialCounter: data || 0 },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      props: { initialCounter: 0 }, // Default fallback
    };
  }
}

export default function Home({ initialCounter }: { initialCounter: number }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My Counter App</h1>
      <p>Click below to navigate to the counter.</p>
      <Link href={`/counter/${initialCounter}`}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Go to Counter
        </button>
      </Link>
    </div>
  );
}
