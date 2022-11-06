import React, { useState, useEffect, useContext } from 'react';
import Core from './Core';
import defaultLocale from './Locale';
import { setDoc, getFirestore, getDoc  } from "firebase/firestore";
import {
  auth, doc
} from "../../../lib/firebase";


const Quiz = function ({
  quiz, onComplete, onQuestionSubmit, disableSynopsis,
}) {
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState(quiz.questions);
  const nrOfQuestions = (quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length) ? quiz.nrOfQuestions : quiz.questions.length;

  

  

  const quizStatus = async() =>{ //initialise the status 
    try{
      const uid = auth.currentUser && auth.currentUser.uid;
      console.log("Trying to get userid => ", uid)
      const userDoc = doc(getFirestore(), "users", uid);
      const docSnap =  await getDoc(userDoc);
      const userData = docSnap.data();
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var currentDate = day + '-' + month + '-' + year;  //for comparison to ensure no duplicates 

      if (userData.quizDone !== currentDate){
        console.log('not done for the day')
      } else{
        console.log("Done for the day")
        setCompleted('True')
      }
    }catch(e){
      console.log(e.message)
    }
    
  }

  
  useEffect(() => {
    
    setQuestions(quiz.questions);

    setQuestions(questions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    })));
    quizStatus();
  }, [start]);


  const appLocale = {
    ...defaultLocale,
    ...quiz.appLocale,
  };

  if (completed == 'True'){
    return(
    <div> 
            <div className="font-black text-xl text-center mb-3">Done for the day</div>
            <div className="font-bold mb-5">Come back tomorrow!</div>
    </div>
    )

  } else{
  return (
    <div>
      {!start
          && (
          <div>
            <button onClick={() => setStart(true)} ></button>
            <div className="font-black text-xl text-center mb-3">Daily Quiz</div>
                <div className="font-bold mb-5">Explore more about crypto!</div>
            <div>Total of : {appLocale.landingHeaderText.replace('<questionLength>', nrOfQuestions)}</div>
            <br></br>
            <div className="rounded-md px-1 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-all">
              <button onClick={() => setStart(true)} >Let's go!</button>
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
