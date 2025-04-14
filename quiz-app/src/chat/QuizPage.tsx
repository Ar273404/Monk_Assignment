// same imports...
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../QuizContext";

const QuizPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const navigate = useNavigate();
  const { addResponse } = useQuiz();

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
      });
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(true);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions]);

  const handleOptionSelect = (option: string) => {
    const current = questions[currentQuestionIndex];
    if (selectedOptions.length < current.correctAnswer.length) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const checkAnswer = () => {
    const current = questions[currentQuestionIndex];
    const isCorrect =
      JSON.stringify(selectedOptions) === JSON.stringify(current.correctAnswer);

    addResponse({
      question: current.question,
      userAnswer: selectedOptions.join(", "),
      isCorrect,
      score: isCorrect ? 1 : 0,
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast.success("Correct Answer!");
    } else {
      toast.error("Wrong Answer!");
    }
  };

  const handleNext = (isAutoSubmit = false) => {
    if (!questions[currentQuestionIndex]) return;

    const current = questions[currentQuestionIndex];

    if (!isAutoSubmit) {
      checkAnswer();
    } else {
      addResponse({
        question: current.question,
        userAnswer: selectedOptions.join(", ") || "No Answer",
        isCorrect: false,
        score: 0,
      });
    }

    setSelectedOptions([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      navigate("/result");
    }
  };

  const handleSkip = () => {
    const current = questions[currentQuestionIndex];
    addResponse({
      question: current.question,
      userAnswer: "Skipped",
      isCorrect: false,
      score: 0,
    });

    setSelectedOptions([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      navigate("/result");
    }
  };

  const handleQuit = () => {
    navigate("/");
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const q = questions[currentQuestionIndex];
  const parts = q.question.split("_____________");

  return (
    <motion.div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-6 sm:px-6 md:px-8">
      <div className="flex justify-between items-center w-full max-w-4xl mb-4 px-2 sm:px-4">
        <div className="text-gray-400 text-lg">⏳ 0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</div>
        <Button onClick={handleQuit} variant="outline" className="text-gray-400 border-gray-600">
          Quit
        </Button>
      </div>

      <div className="w-full max-w-4xl h-2 bg-gray-700 rounded-full mb-6 px-2">
        <motion.div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <motion.div
        className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-4 py-1.5 rounded-full shadow-lg text-sm sm:text-base"
        key={score}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Score: {score}
      </motion.div>

      <Card className="w-full max-w-4xl bg-gray-800 border-none rounded-2xl shadow-xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <CardContent className="space-y-6">
          <h2 className="text-yellow-400 text-lg sm:text-xl text-center font-semibold">
            Fill in the blanks with the correct words
          </h2>

          <div className="text-white text-center text-base sm:text-lg flex flex-wrap justify-center leading-relaxed">
            {parts.map((part: string, index: number) => (
              <span key={index} className="flex items-center mx-1 my-1 sm:my-2">
                {part}
                {index < q.correctAnswer.length && (
                  <span className="w-24 sm:w-28 min-h-7 border-b-2 border-gray-500 mx-2 text-center">
                    {selectedOptions[index] || <>&nbsp;&nbsp;&nbsp;</>}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
            {q.options.map((opt: string, i: number) => (
              <Button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                disabled={selectedOptions.includes(opt)}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700 px-3 sm:px-4 py-1"
              >
                {opt}
              </Button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
            <Button onClick={() => handleNext(false)} className="bg-green-600 hover:bg-green-700 px-4 py-2 w-full sm:w-auto">
              Submit & Next
            </Button>
            <Button onClick={handleSkip} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 w-full sm:w-auto">
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>

      <ToastContainer position="top-center" autoClose={3000} />
    </motion.div>
  );
};

export default QuizPage;
