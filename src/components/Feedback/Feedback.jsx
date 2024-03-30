import s from "./Feedback.module.css";

function Feedback({ feedbacks, totalFeedback, positiveFeedbacks }) {
  return (
    <div className={s.wrapper}>
      <div>Good: {feedbacks.good}</div>
      <div>Neutral: {feedbacks.neutral}</div>
      <div>Bad: {feedbacks.bad}</div>
      <div>Total: {totalFeedback}</div>
      <div>Positive: {positiveFeedbacks}%</div>
    </div>
  );
}

export default Feedback;
