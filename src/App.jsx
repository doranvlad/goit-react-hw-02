import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import localFunc from "./localFunc.js";

function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedback = localFunc.load("feedback");

    if (savedFeedback !== undefined) {
      return savedFeedback;
    }

    return { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = (feedbackType) => {
    setFeedbacks({
      ...feedbacks,
      [feedbackType]: feedbacks[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setFeedbacks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    localStorage.removeItem("feedback");
  };

  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  const positiveFeedbacks = Math.round(
    ((feedbacks.good + feedbacks.neutral) / totalFeedback) * 100
  );

  useEffect(() => {
    if (totalFeedback !== 0) {
      localFunc.save("feedback", feedbacks);
    }
  }, [feedbacks, totalFeedback]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      <>
        {totalFeedback > 0 ? (
          <Feedback
            feedbacks={feedbacks}
            totalFeedback={totalFeedback}
            positiveFeedbacks={positiveFeedbacks}
          />
        ) : (
          <Notification />
        )}
      </>
    </>
  );
}

export default App;
