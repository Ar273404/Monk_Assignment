import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(true); // auto-submit
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.length < questions[currentQuestionIndex].correctAnswer.length) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const checkAnswer = () => {
    const correct = questions[currentQuestionIndex].correctAnswer;
    if (JSON.stringify(selectedOptions) === JSON.stringify(correct)) {
      setScore((prev) => prev + 1);
      toast.success("Correct Answer!");
    } else {
      toast.error("Wrong Answer!");
    }
  };

  const handleNext = (isAutoSubmit = false) => {
    if (!isAutoSubmit) checkAnswer();
    setSelectedOptions([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      navigate("/result", { state: { score } });
    }
  };

  const handleSkip = () => {
    setSelectedOptions([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      navigate("/result", { state: { score } });
    }
  };

  const handleQuit = () => {
    navigate("/");
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const q = questions[currentQuestionIndex];
  const parts = q.question.split("_____________");

  return (
    <motion.div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Timer & Quit */}
      <div className="flex justify-between w-full max-w-2xl mb-4">
        <div className="text-gray-400 text-lg">
          ⏳ 0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
        <Button onClick={handleQuit} variant="outline" className="text-gray-400 border-gray-600">
          Quit
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl h-2 bg-gray-700 rounded-full mb-4">
        <motion.div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Animated Score Display */}
      <motion.div
        className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-5 py-2 rounded-full shadow-lg text-lg"
        key={score}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Score: {score}
      </motion.div>

      {/* Quiz card */}
      <Card className="w-full max-w-2xl bg-gray-800 border-none rounded-2xl p-8 shadow-xl">
        <CardContent className="space-y-6">
          <h2 className="text-yellow-400 text-xl text-center font-semibold">
            Fill in the blanks with the correct words
          </h2>

          <div className="text-white text-center text-lg flex flex-wrap justify-center leading-relaxed">
            {parts.map((part, index) => (
              <span key={index} className="flex items-center mx-1">
                {part}
                {index < q.correctAnswer.length && (
                  <span className="w-28 min-h-7 border-b-2 border-gray-500 mx-2 text-center">
                    {selectedOptions[index] || <>&nbsp;&nbsp;&nbsp;</>}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Option buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {q.options.map((opt, i) => (
              <Button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                disabled={selectedOptions.includes(opt)}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                {opt}
              </Button>
            ))}
          </div>

          {/* Submit & Skip */}
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => handleNext(false)} className="bg-green-600 hover:bg-green-700 px-6">
              Submit & Next
            </Button>
            <Button onClick={handleSkip} className="bg-blue-600 hover:bg-blue-700 px-6">
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} />
    </motion.div>
  );
};

export default QuizPage;
