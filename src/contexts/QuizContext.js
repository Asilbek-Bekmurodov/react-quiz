import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  isLoading: false,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "receiveDate":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedData":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finally",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finally" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

function QuizContextProvider({ children }) {
  const [
    { status, secondsRemaining, questions, highScore, index, answer, points },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  function fetchQuiz() {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "receiveDate", payload: data }))
      .catch((err) => dispatch({ type: "failedData", payload: err }));
  }

  return (
    <QuizContext.Provider
      value={{
        fetchQuiz,
        status,
        secondsRemaining,
        highScore,
        index,
        answer,
        points,
        numQuestions,
        maxPossiblePoints,
        dispatch,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context used to outside of the QuizProvider");
  return context;
}

export { QuizContextProvider, useQuiz };
