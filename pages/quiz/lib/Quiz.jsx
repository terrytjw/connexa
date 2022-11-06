import React, { useState, useEffect, useContext } from "react";
import Core from "./Core";
import { setDoc, getFirestore, getDoc } from "firebase/firestore";
import { auth, doc } from "../../../lib/firebase";
import doggoImg from "../../../public/images/doggo.jpg";
import vomitImg from "../../../public/images/vomit.jpg";
import Image from "next/image";

const defaultLocale = {
  landingHeaderText: "<questionLength> Questions",
  question: "Question",
  nextQuestionBtn: "Next Question",
  resultPageSummary:
    "You got <correctIndexLength> out of <questionLength> questions right!",
};

const Quiz = function ({
  quiz,
  onComplete,
  onQuestionSubmit,
  disableSynopsis,
}) {
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState(quiz.questions);
  const nrOfQuestions =
    quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length
      ? quiz.nrOfQuestions
      : quiz.questions.length;

  const quizStatus = async () => {
    //initialise the status
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      console.log("Trying to get userid => ", uid);
      const userDoc = doc(getFirestore(), "users", uid);
      const docSnap = await getDoc(userDoc);
      const userData = docSnap.data();
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var currentDate = day + "-" + month + "-" + year; //for comparison to ensure no duplicates

      if (userData.quizDone !== currentDate) {
        console.log("not done for the day");
      } else {
        console.log("Done for the day");
        setCompleted("True");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setQuestions(quiz.questions);

    setQuestions(
      questions.map((question, index) => ({
        ...question,
        questionIndex: index + 1,
      }))
    );
    quizStatus();
  }, [start]);

  const appLocale = {
    ...defaultLocale,
    ...quiz.appLocale,
  };

  if (completed == "True") {
    return (
      <div>
        <div className="mt-40 p-20 text-center border border-gray-300 shadow-lg rounded-lg">
          <Image
            className="rounded-full"
            src={vomitImg}
            width={100}
            height={100}
          />
          <div className="font-semibold mt-2">
            You've completed the quiz for the day. <br /> Come back tomorrow!
          </div>
        </div>
        <div className="font-bold mb-5"></div>
      </div>
    );
  } else {
    return (
      <div>
        {!start && (
          <div className="mt-40 p-20 text-center border border-gray-300 shadow-lg rounded-lg">
            <Image
              className="rounded-full"
              src={doggoImg}
              width={130}
              height={100}
            />
            <div className="font-black text-4xl text-center mb-3">
              Daily Quiz
            </div>
            <div className="text-xl font-bold mb-5">
              Explore more about crypto!
            </div>
            <div className="text-lg">
              Total of{" "}
              <span className="underline">
                {appLocale.landingHeaderText.replace(
                  "<questionLength>",
                  nrOfQuestions
                )}
              </span>{" "}
              for today.
            </div>
            <br></br>
            <div>
              <button
                className="block m-auto text-center border border-black rounded-md px-12 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-all"
                onClick={() => setStart(true)}
              >
                Let's go!
              </button>
            </div>
          </div>
        )}

        {start && (
          <Core
            questions={questions}
            onComplete={onComplete}
            appLocale={appLocale}
          />
        )}
      </div>
    );
  }
};

export default Quiz;
