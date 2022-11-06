import { Timestamp } from "firebase/firestore";

export const dateFormatter = (createdAt: number) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  let timeAgo;
  const datePosted = new Date(createdAt);
  let minutesAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60
  );
  const hoursAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60 / 60
  );

  minutesAgo = minutesAgo < 0 ? 0 : minutesAgo;

  timeAgo =
    minutesAgo < 60
      ? `${minutesAgo} min ago`
      : hoursAgo < 24
      ? `${hoursAgo}h ago`
      : createdAt && dateFormatter.format(datePosted);

  return timeAgo;
};
