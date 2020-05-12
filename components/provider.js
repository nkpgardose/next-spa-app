import PropTypes from "prop-types";
import { createContext, useReducer, useContext } from "react";

/**
 * React useContext https://reactjs.org/docs/hooks-reference.html#usecontext
 * React useReducer https://reactjs.org/docs/hooks-reference.html#usereducer
 */

const AppContext = createContext();
const initialState = {
  name: "",
  company: "",
  pet: "",
  fruit: "",
};
export const useAppReducer = () => useContext(AppContext);

export function init(initialState) {
  let currentState = initialState;

  if (process.browser) {
    // See if we have state stored
    // (this will only happen if the page is accidentally refreshed)
    if (sessionStorage.getItem("store")) {
      // Restore the contents of the text field
      currentState = JSON.parse(sessionStorage.getItem("store"));
      console.log(currentState);
    }
  }

  return currentState;
}

export function reducer(state, action) {
  switch (action.type) {
    case "merge":
      const currentState = { ...state, ...action.payload };

      if (process.browser) {
        sessionStorage.setItem("store", JSON.stringify(currentState));
      }
      return currentState;
    case "reset":
      if (process.browser) {
        sessionStorage.removeItem("store");
      }
      return initialState;
    default:
      throw new Error();
  }
}

export default function Provider({ children }) {
  const contextVal = useReducer(reducer, initialState, init);

  return (
    <AppContext.Provider value={contextVal}>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
