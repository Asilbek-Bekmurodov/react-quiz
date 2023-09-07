import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StarScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";

function App() {
  const { status, fetchQuiz, questions, index } = useQuiz();
  useEffect(function () {
    fetchQuiz();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "start" && (
          <>
            <Progress />
            <Question question={questions[index]} />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finally" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
