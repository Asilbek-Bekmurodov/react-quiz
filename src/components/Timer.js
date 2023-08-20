import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const second = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(
        function () {
          dispatch({ type: "timer" });
        },
        [1000]
      );
      return () => clearInterval(id);
    },

    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {second < 10 && "0"}
      {second}
    </div>
  );
}

export default Timer;
