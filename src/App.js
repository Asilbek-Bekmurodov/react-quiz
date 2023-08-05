import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  isLoading: false,
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "receiveDate":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedData":
      return { ...state, status: "error" };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "receiveDate", payload: data }))
      .catch((err) => dispatch({ type: "failedData", payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question ?</p>
      </Main>
    </div>
  );
}

export default App;
