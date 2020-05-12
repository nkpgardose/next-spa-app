import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppReducer } from "../components/provider";

export const onFieldChange = (callback) => (e) => callback(e.target.value);

/**
 * get started and entry point: `yarn create next-app [project-name]`
 * onSubmit implementation here: https://nextjs.org/docs/api-reference/next/router
 * the _app.js here: https://nextjs.org/learn/basics/assets-metadata-css/layout-component
 */
export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();
  const { name: initialName, company: initialCompany } = state;
  const [nameVal, setName] = useState(initialName);
  const [companyVal, setCompany] = useState(initialCompany);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      name: nameVal,
      company: companyVal,
    };

    dispatch({ type: "merge", payload });
    router.push("/steps/first");
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Next.js SPA Stepper Application</h1>
      <p>It contains the following</p>
      <ul>
        <li>
          Uses Next.js for navigation{" "}
          <em>
            (
            <a href="https://nextjs.org/learn/basics/data-fetching/two-forms">
              Static Generation
            </a>
            )
          </em>
        </li>
        <li>
          Next.js Redirects using{" "}
          <a href="https://nextjs.org/docs/api-reference/next/router">
            Routing
          </a>
        </li>
        <li>Data Management &amp; Middleware using React Hook `useReducer`</li>
        <li>
          Make the most out of{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage">
            Web Storage
          </a>
        </li>
      </ul>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={nameVal}
            required
            onChange={onFieldChange(setName)}
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            value={companyVal}
            required
            onChange={onFieldChange(setCompany)}
          />
        </div>
        <input type="submit" value="next" />
      </form>
    </div>
  );
}
