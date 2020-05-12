import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppReducer } from "../../components/provider";
import { onFieldChange } from "../";

export default function Second() {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();
  const { pet: initialPet, fruit: initialfruit } = state;
  const [fruitVal, setFruit] = useState(initialfruit);

  useEffect(() => {
    if (!initialPet) router.push("/steps/first");
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      fruit: fruitVal,
    };

    dispatch({ type: "merge", payload });
    router.push("/steps/result");
  }

  function onReset() {
    dispatch({ type: "reset" });
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>Second Step Process</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Second Step Process</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="fruit">Favorite Fruit</label>
          <input
            type="text"
            id="fruit"
            name="fruit"
            value={fruitVal}
            required
            onChange={onFieldChange(setFruit)}
          />
        </div>
        <Link href="/steps/first">
          <a>Back</a>
        </Link>
        <button type="button" onClick={onReset}>
          Start Over
        </button>
        <input type="submit" value="next" />
      </form>
    </div>
  );
}
