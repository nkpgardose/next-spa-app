import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppReducer } from "../../components/provider";

export default function Second() {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();

  function onSubmit(e) {
    e.preventDefault();
    alert(`Do your fetch here ${JSON.stringify(state)}`);
  }

  function onReset() {
    dispatch({ type: "reset" });
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>Confirm result</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Confirm result</h1>
      <ul>
        {Object.entries(state).map((item) => (
          <li>
            {item[0]} - <strong>{item[1]}</strong>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <Link href="/steps/second">
          <a>Back</a>
        </Link>
        <button type="button" onClick={onReset}>
          Start Over
        </button>
        <input type="submit" value="confirm" required />
      </form>
    </div>
  );
}
