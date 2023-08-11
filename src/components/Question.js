import Option from "./Option";
function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option dispatch={dispatch} answer={answer} question={question} />
    </div>
  );
}

export default Question;
