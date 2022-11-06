import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useContext,
} from "react";
import {
  checkAnswer,
  selectAnswer,
} from "../../../lib/core-components/helpers";
import Explanation from "../../../lib/core-components/Explanation";
import {
  setDoc,
  getFirestore,
  getDocs,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../../lib/firebase";

const Core = function ({
  questions,
  appLocale,
  showDefaultResult,
  onComplete,
  customResultPage,
  onQuestionSubmit,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [filteredValue, setFilteredValue] = useState("all");
  const [userAttempt, setUserAttempt] = useState(1);
  const [showDefaultResultState, setShowDefaultResult] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [question, setQuestion] = useState(questions[currentQuestionIndex]);
  const [questionSummary, setQuestionSummary] = useState(undefined);
  const uid = auth.currentUser && auth.currentUser.uid;

  const updateScoreandQuizStatus = async (score) => {
    try {
      const userDoc = doc(getFirestore(), "users", uid);
      const docSnap = await getDoc(userDoc);
      const userData = docSnap.data();
      var currentScore = 0;
      var newScore = 0;
      const userDisplayName = userData.displayName;
      const userphotoURL = userData.photoURL;
      const userusername = userData.username;
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var completedQuiz = day + "-" + month + "-" + year;
      console.log("Completed on => ", completedQuiz);
      //means user has no scores yet, hence updated.
      //set user to have completed. just put the timestamp if user has. ensure only 1 day forward
      if (userData.points !== undefined) {
        currentScore = userData.points;
        newScore = currentScore + score;
        await setDoc(doc(getFirestore(), "users", uid), {
          displayName: userDisplayName,
          photoURL: userphotoURL,
          username: userusername,
          points: newScore,
          quizDone: completedQuiz,
        });
      } else {
        await setDoc(doc(getFirestore(), "users", uid), {
          displayName: userDisplayName,
          photoURL: userphotoURL,
          username: userusername,
          points: score,
          quizDone: completedQuiz,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setShowDefaultResult(
      showDefaultResult !== undefined ? showDefaultResult : true
    );
  }, [showDefaultResult]);

  useEffect(() => {
    setQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  useEffect(() => {
    //to update points for user
    if (endQuiz) {
      let totalPointsTemp = 0;
      let correctPointsTemp = 0;
      for (let i = 0; i < questions.length; i += 1) {
        let point = questions[i].point || 0;
        if (typeof point === "string" || point instanceof String) {
          point = parseInt(point);
        }
        totalPointsTemp += point;
        if (correct.includes(i)) {
          correctPointsTemp += point;
        }
      }
      setTotalPoints(totalPointsTemp);
      setCorrectPoints(correctPointsTemp);
      updateScoreandQuizStatus(correctPointsTemp);

      //update db -> user completed + number of points
    }
  }, [endQuiz]);

  useEffect(() => {
    setQuestionSummary({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
    });
  }, [totalPoints, correctPoints]);

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary);
    }
  }, [endQuiz, questionSummary]);

  const nextQuestion = (currentQuestionIdx) => {
    setIncorrectAnswer(false);
    setCorrectAnswer(false);
    setShowNextQuestionButton(false);
    setButtons({});

    if (currentQuestionIdx + 1 === questions.length) {
      if (userInput.length !== questions.length) {
        alert("Quiz is incomplete");
      } else {
        setEndQuiz(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIdx + 1);
    }
  };

  const renderAnswers = (question, buttons) => {
    const { answers, correctAnswer, questionType, questionIndex } = question;
    let { answerSelectionType } = question;
    const onClickAnswer = (index) =>
      checkAnswer(index + 1, correctAnswer, answerSelectionType, {
        userInput,
        userAttempt,
        currentQuestionIndex,
        continueTillCorrect,
        showNextQuestionButton,
        incorrect,
        correct,
        setButtons,
        setCorrectAnswer,
        setIncorrectAnswer,
        setCorrect,
        setIncorrect,
        setShowNextQuestionButton,
        setUserInput,
        setUserAttempt,
      });

    const onSelectAnswer = (index) =>
      selectAnswer(index + 1, correctAnswer, answerSelectionType, {
        userInput,
        currentQuestionIndex,
        setButtons,
        setShowNextQuestionButton,
        incorrect,
        correct,
        setCorrect,
        setIncorrect,
        setUserInput,
      });

    const checkSelectedAnswer = (index) => {
      if (userInput[questionIndex - 1] === undefined) {
        return false;
      }
      if (answerSelectionType === "single") {
        return userInput[questionIndex - 1] === index;
      }
      return (
        Array.isArray(userInput[questionIndex - 1]) &&
        userInput[questionIndex - 1].includes(index)
      );
    };

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || "single";

    return answers.map((answer, index) => (
      <div className="rounded-md mb-4 px-4 py-2 font-medium text-grey border border-black hover:bg-black hover:text-white transition-all">
        <Fragment key={index}>
          {buttons[index] !== undefined ? (
            <button
              type="button"
              disabled={buttons[index].disabled || false}
              className={`${buttons[index].className} answerBtn btn`}
              onClick={() =>
                revealAnswerOnSubmit
                  ? onSelectAnswer(index)
                  : onClickAnswer(index)
              }
            >
              {questionType === "text" && <span>{answer}</span>}
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                revealAnswerOnSubmit
                  ? onSelectAnswer(index)
                  : onClickAnswer(index)
              }
              className={`answerBtn btn ${
                allowNavigation && checkSelectedAnswer(index + 1)
                  ? "selected"
                  : null
              }`}
            >
              {questionType === "text" && answer}
            </button>
          )}
        </Fragment>
      </div>
    ));
  };

  const renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    return <div>Answer : {answers[correctAnswer - 1]}</div>;
  };

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions;
    let filteredUserInput;

    if (filteredValue !== "all") {
      if (filteredValue === "correct") {
        filteredQuestions = questions.filter(
          (question, index) => correct.indexOf(index) !== -1
        );
        filteredUserInput = userInput.filter(
          (input, index) => correct.indexOf(index) !== -1
        );
      } else {
        filteredQuestions = questions.filter(
          (question, index) => incorrect.indexOf(index) !== -1
        );
        filteredUserInput = userInput.filter(
          (input, index) => incorrect.indexOf(index) !== -1
        );
      }
    }

    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput
        ? filteredUserInput[index]
        : userInput[index];

      return (
        <div key={index + 1}>
          <div className="font-black text-left mb-3 ">{question.question}</div>
          <div className="result-answer">
            {renderAnswerInResult(question, userInputIndex)}
          </div>
          <div className="text-left mb-10 mt-5">
            <Explanation question={question} isResultPage />
          </div>
        </div>
      );
    });
  }, [endQuiz, filteredValue]);

  const renderResult = () => (
    <div>
      <div className="p-5 flex flex-col w-140 text-center  ">
        <h1>Quick Summary</h1>

        <h2>
          {appLocale.resultPageSummary
            .replace("<correctIndexLength>", correct.length)
            .replace("<questionLength>", questions.length)}
        </h2>
      </div>
      <div className="p-5 flex flex-col w-140 text-left  ">
        <br></br>
        {renderQuizResultQuestions()}
      </div>
    </div>
  );
  return (
    <div className="questionWrapper">
      {!endQuiz && (
        <div className="mt-40 p-20 text-center border border-gray-300 shadow-lg rounded-lg">
          <div>
            {appLocale.question} {currentQuestionIndex + 1}:
          </div>
          <div className="text-2xl mt-2 font-bold mb-5">
            {question.question}
          </div>
          {question && renderAnswers(question, buttons)}
          {(showNextQuestionButton || allowNavigation) && (
            <div>
              <div className="rounded-md px-1 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-all">
                <button
                  onClick={() => nextQuestion(currentQuestionIndex)}
                  className="nextQuestionBtn btn"
                  type="button"
                >
                  {appLocale.nextQuestionBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {endQuiz &&
        showDefaultResultState &&
        customResultPage === undefined &&
        renderResult()}
      {endQuiz &&
        !showDefaultResultState &&
        customResultPage !== undefined &&
        customResultPage(questionSummary)}
    </div>
  );
};

export default Core;
