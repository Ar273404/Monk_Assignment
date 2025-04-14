import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "../QuizContext";

const Result = () => {
  const navigate = useNavigate();
  const { responses} = useQuiz();
  console.log(responses);
  const overallScore = 50;
  const maxScore = responses.length * 10;

  return (
    <motion.div
      className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Back Button */}
      <motion.div
        className="w-full max-w-screen mb-6"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white"
          onClick={() => navigate("/home")}
        >
          ←
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-semibold text-gray-300">
          Sentence Construction
        </h1>
      </motion.div>

      {/* Score Circle */}
      <motion.div
        className="flex flex-col items-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          <svg className="w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#4CAF50"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#2E7D32"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(overallScore / 100) * 2 * Math.PI * 56} ${
                2 * Math.PI * 56
              }`}
              transform="rotate(-90 64 64)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
            {overallScore}
          </div>
        </div>
        <p className="text-gray-400 mt-2">Overall Score</p>
      </motion.div>

      {/* Feedback Message */}
      <motion.p
        className="text-center text-gray-400 w-full md:max-w-[40rem] mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        While you correctly formed several sentences, there are a couple of
        areas where improvement is needed. Pay close attention to sentence
        structure and word placement to ensure clarity and correctness. Review
        your responses below for more details.
      </motion.p>

      {/* Retry Button */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full"
          onClick={() => navigate("/")}
        >
          Start Quiz again
        </Button>
      </motion.div>

      {/* Response Cards */}
      <motion.div
        className="w-full md:max-w-[40rem] space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {responses.map((response, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border-none rounded-lg p-4"
          >
            <CardContent className="space-y-2">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Prompt</span>
                <span>{response.score}/10</span>
              </div>
              <p className="text-white">{response.question}</p>
              <p className="text-white">{response.userAnswer}</p>
              <div className="flex justify-between text-sm">
                <span
                  className={
                    response.isCorrect ? "text-green-500" : "text-red-500"
                  }
                >
                  Your response {response.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              <p className="text-gray-300">{response.userAnswer}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Result;
