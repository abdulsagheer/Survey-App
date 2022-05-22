import { useState, React } from "react";
import "./index.css";

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [review, setReview] = useState("");
  const [done, setDone] = useState(false);

  // Hooks for the Completion of Survey
  const setThankYou = () => {
    localStorage.setItem("COMPLETED", true);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setQuestionIndex(0);
      localStorage.setItem("COMPLETED", false);
    }, 5000);
  };

  // Saving Survey in Local Storage
  const saveReview = (review) => {
    localStorage.setItem(questionIndex, review);
    console.log(localStorage.getItem(questionIndex));
  };

  // Questions Array for the Survey
  const questions = [
    {
      question: "How satisfied are you with our products? (Rate us out of 5)",
      reviews: [1, 2, 3, 4, 5],
      reviewType: "number",
    },
    {
      question:
        "How fair are the prices compared to similar retailers? (Rate us out of 5)",
      reviews: [1, 2, 3, 4, 5],
      reviewType: "number",
    },
    {
      question:
        "How satisfied are you with the value for money of your purchase? (Rate us out of 5)",
      reviews: [1, 2, 3, 4, 5],
      reviewType: "number",
    },
    {
      question:
        "On a scale of 1-10 how would you recommend us to your friends and family? (Rate us out of 10)",
      reviews: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      reviewType: "number",
    },
    {
      question: "What could we do to improve our service? ",
      reviewType: "text",
    },
  ];

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {done ? (
            <h1 className="text-5xl font-bold">
              Thank You for filling out our survey!!🥳🎊
            </h1>
          ) : (
            <>
              <button className="btn gap-2">
                <div className="badge">{questionIndex + 1}/5</div>
              </button>
              <h1 className="text-5xl font-bold p-3">Customer Survey</h1>
              <h2 className="text-3xl font-bold p-3">
                {questions[questionIndex].question}
              </h2>
              {questions[questionIndex].reviewType === "number" ? (
                questions[questionIndex].reviews.map((review, index) => (
                  <button
                    className="btn btn-xs my-4 mx-2"
                    onClick={() => saveReview(review)}
                  >
                    {review}
                  </button>
                ))
              ) : (
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Please fill the feedback for our service!!"
                  type="text"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                    saveReview(e.target.value);
                  }}
                ></textarea>
              )}
              <br />
              <br />
              <button
                className="btn btn-outline m-2"
                disabled={questionIndex === 0 ? true : false}
                onClick={() => {
                  setQuestionIndex(questionIndex - 1);
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-outline m-2"
                onClick={() => {
                  if (questionIndex === questions.length - 1) {
                    setThankYou();
                  }
                  setQuestionIndex(questionIndex + 1);
                }}
              >
                {questionIndex === questions.length - 1
                  ? "Complete"
                  : "Next >>"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
