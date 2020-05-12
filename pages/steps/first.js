import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppReducer } from "../../components/provider";
import { onFieldChange } from "../";

export default function First() {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();
  const { pet: initialPet } = state;
  const [petVal, setPet] = useState(initialPet);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      pet: petVal,
    };

    dispatch({ type: "merge", payload });
    router.push("/steps/second");
  }

  function onReset() {
    dispatch({ type: "reset" });
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>First Step Process</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>First Step Process</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="pet">Favorite Pet</label>
          <input
            type="text"
            id="pet"
            name="pet"
            value={petVal}
            required
            onChange={onFieldChange(setPet)}
          />
        </div>
        <Link href="/">
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
