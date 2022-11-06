import QuizComponent from "../../components/QuizComponent";
import Rewards from "../../components/Rewards";

const QuizPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Rewards points={5} />
    </div>
  );
};

export default QuizPage;
