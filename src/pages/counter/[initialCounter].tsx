import { useRouter } from "next/router";
import Counter from "@/components/Counter/Counter";
import Link from "next/link";

export async function getStaticProps({
  params,
}: {
  params: { initialCounter: number };
}) {
  return {
    props: { initialCounter: params.initialCounter || 0 }, // Ensure conversion
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { initialCounter: "0" } }], // Predefined paths
    fallback: "blocking",
  };
}

const OptionalCatchAllPage = () => {
  const router = useRouter();
  const { initialCounter } = router.query; // An array capturing all URL segments, or undefined

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Initial counter: {initialCounter || 0}</h1>

      <h1>Counter Page</h1>
      <Counter
        initialCounter={
          initialCounter && !Array.isArray(initialCounter)
            ? parseInt(initialCounter)
            : 0
        }
      />
      <Link href="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default OptionalCatchAllPage;
