import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Define interfaces based on the JSON structure
interface Option {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

interface Data {
  testId: string;
  questions: Option[];
}

interface JsonResponse {
  status: string;
  questions: Data;
  message: string;
  activity: {
    id: string;
    userId: string;
    type: string;
    coinType: string;
    coins: number;
    description: string;
    createdAt: string;
  };
}

const Quiz = () => {
  //   const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(15); // 15 seconds timer
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Fetch questions from JSON server
  useEffect(() => {
    fetch("http://localhost:5001/data")
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setQuestions(data.questions);
        console.log(questions);
      })
      .catch((error: Error) =>
        console.error("Error fetching questions:", error)
      );
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer for next question
      setSelectedOptions([...selectedOptions, ""]); // Add placeholder for next question
    } else if (
      timeLeft === 0 &&
      currentQuestionIndex === questions.length - 1
    ) {
      //   navigate("/results"); // Navigate to results page when all questions are done
    }
  }, [timeLeft, currentQuestionIndex, questions.length]);

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer
      setSelectedOptions([...selectedOptions, ""]); // Add placeholder for next question
    } else {
      //   navigate("/results"); // Navigate to results page
    }
  };

  // Get current question with fallback
  const currentQuestion: Option = questions[currentQuestionIndex] || {
    questionId: "",
    question: "",
    questionType: "",
    answerType: "",
    options: [],
    correctAnswer: [],
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header with Timer and Quit Button */}
      <motion.div
        className="flex justify-between w-full max-w-md mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-gray-400">
          0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
        <Button
          variant="outline"
          className="border-gray-500 text-gray-400 hover:bg-gray-700"
          //   onClick={() => navigate("/home")}
        >
          Quit
        </Button>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="w-full max-w-md h-2 bg-gray-700 rounded-full mb-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
          initial={{ width: "100%" }}
          transition={{ duration: 15 }}
        />
      </motion.div>

      {/* Card with Sentence and Options */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gray-800 min-w-[40rem] min-h-96 border-none shadow-xl rounded-2xl p-6">
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-center">hell</p>
            <p className="text-white text-center">
              <span className="inline-block w-24 h-4 border-b border-gray-500 mx-1"></span>
              {currentQuestion.question.split("___").map((part, index) => (
                <span key={index}>
                  {part}
                  {index < 4 && (
                    <span className="inline-block w-24 h-4 border-b border-gray-500 mx-1"></span>
                  )}
                </span>
              ))}
            </p>
            <div className="flex justify-around mt-4 flex-wrap gap-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`border-gray-500 text-gray-400 hover:bg-gray-700 ${
                    selectedOptions[currentQuestionIndex] === option
                      ? "bg-gray-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={handleNext}
          disabled={
            timeLeft === 0 &&
            selectedOptions[currentQuestionIndex] === undefined
          }
        >
          <span className="text-xl">→</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
