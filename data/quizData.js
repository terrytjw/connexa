const quiz = {
  quizTitle: "React Quiz Component Demo",
  nrOfQuestions: "4",
  questions: [
    {
      question: "What is blockchain?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Distributed software network",
        "Centralized software network",
        "A chain of blocks",
        "I dont know",
      ],
      correctAnswer: "1",
      explanation:
        "A blockchain is a digitally distributed, decentralized, public ledger that exists across a network.",
      point: "5",
    },
    {
      question: "What does blockchain facilitate the flow of?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Units of power", "Units of value", "Money", "Electricity"],
      correctAnswer: "3",
      explanation: "Digitised forms of money are exchanged on the blockchain",
      point: "5",
    },
    {
      question:
        "Select the pseudonym of the founder of the Bitcoin payment system.",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["John Smith", "Justin Sun", "Satoshi Nakamoto", "Elon Musk"],
      correctAnswer: "3",
      explanation:
        "Satoshi Nakamoto introduced the concept of cryptocurrency to the world in a 2008 paper as he developed the first Bitcoin software.",
      point: "5",
    },
    {
      question: "When did Bitcoin hit $1?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["2010", "2011", "2012", "2013"],
      correctAnswer: "2",
      explanation:
        "Bitcoin broke $1 in April 2011 and hit $2 in November 2011.",
      point: "5",
    },
  ],
};

export default quiz;
