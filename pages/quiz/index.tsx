import { useState, useContext } from "react";
import Quiz from "../quiz/lib/Quiz";
import quiz from "../../data/quizData";

const DailyQuiz = function () {
  const [quizResult, setQuizResult] = useState();

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <Quiz
        quiz={quiz}
        onComplete={setQuizResult}
        disableSynopsis
        onQuestionSubmit={() => console.log("question submitted")}
      />
    </div>
  );
};

export default DailyQuiz;
