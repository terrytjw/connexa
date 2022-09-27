import LinearProgress from "@mui/material/LinearProgress";
import { StarIcon } from "@heroicons/react/24/solid";

const Rewards = ({}) => {
  return (
    <div className="w-72 h-36">
      <div className="rounded-3xl bg-black w-4/5 h-full text-white p-4 flex flex-col justify-around">
        <div className="flex items-center">
          <span className="mr-2">Level 3</span>
          <div className="text-yellow-200 flex">
            <StarIcon className="w-6 h-6" />
            <StarIcon className="w-6 h-6" />
            <StarIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <div>Web3 explorer</div>
            <div>Intermediate</div>
          </div>
          <div>
            <LinearProgress variant="determinate" value={45} />
          </div>
          <div className="flex justify-end text-gray-400 text-xs">135/300</div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
