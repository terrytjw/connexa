import { useState } from "react";
import { quizData } from "../data/quizData";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";

const QuizComponent = () => {
  const [slide, setSlide] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(null);

  const quiz = quizData[0];

  const handleClick = (isCorrect?: boolean) => {
    if (isCorrect) {
      setScore((score) => score + 1);
    }

    isCorrect !== null &&
      console.log(quiz.quizQuestions[slide - 1].answers[selectedOption]);
    if (slide === 4) return;

    if (slide !== 0 && slide !== 3) {
      if (selectedOption === null) return;
    }

    setSlide(slide + 1);
    setSelectedOption(null);
  };

  const handleSelected = (id: number) => {
    setSelectedOption(id);
  };
  console.log("selectedOption", selectedOption);

  return (
    <div className="border rounded-2xl border-black w-96 h-96 flex relative overflow-hidden ">
      {slide !== 4 && (
        <div
          className="absolute bottom-8 right-8 cursor-pointer hover:-translate-y-px w-8 h-8 z-10"
          onClick={() =>
            handleClick(
              selectedOption !== null
                ? quiz.quizQuestions[slide - 1].answers[selectedOption]
                    .isCorrect
                : null
            )
          }
        >
          <ArrowSmallRightIcon />
        </div>
      )}
      <div
        className={`flex -translate-x-[${
          slide * 24
        }rem] transition-all duration-200 ease `}
      >
        <div className="p-5 flex flex-col w-96 h-96 ">
          <div className="font-black text-xl text-center mb-3">Quiz</div>
          <div className="">{quiz.quizText}</div>
        </div>
        {quiz.quizQuestions.map((question) => {
          return (
            <div className="p-5 flex flex-col w-96 h-96 ">
              <div className="font-black text-xl text-center mb-3">Quiz</div>
              <div className="font-bold mb-5">{question.question}</div>
              {question.answers.map((answer) => {
                return (
                  <div
                    className={`w-full border-2 rounded-full p-2 mb-3 cursor-pointer pl-5 bg-slate-200  ${
                      selectedOption === answer.id
                        ? "border-2 border-black"
                        : ""
                    }`}
                    onClick={() => handleSelected(answer.id)}
                  >
                    {answer.option}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="p-5 flex flex-col w-96 h-96 ">
          <div className="font-black text-xl text-center mb-3">Score</div>
          <div className="">{score} / 3</div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
