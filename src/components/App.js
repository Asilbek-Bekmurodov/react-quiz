import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StarScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  isLoading: false,
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receiveDate":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedData":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "start" };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [{ status, questions, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "start" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
