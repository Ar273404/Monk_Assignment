import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

import { Pencil, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const clickSound = useRef(null);

  const handleClick = (path) => {
    if (clickSound.current) {
      clickSound.current.play();
    }
    setTimeout(() => navigate(path), 150); // Delay to sync with sound
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Click sound */}
      <audio ref={clickSound} src="/click.mp3" preload="auto" />

      {/* Logo or Icon */}
      <motion.div
        className="flex items-center justify-center mb-4 bg-white p-3 rounded-full shadow-xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Pencil className="h-8 w-8 text-indigo-600 animate-pulse" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-red-400"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Sentence Construction
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-300 text-center max-w-md mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Arrange the given words in the correct order to form a meaningful sentence.
      </motion.p>

      {/* Info Card */}
      <motion.div
        className="w-full max-w-3xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gray-900 border-none shadow-2xl rounded-2xl px-4">
          <CardContent className="flex justify-around items-center py-6 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Time Per Question</p>
              <p className="text-lg font-semibold text-white">30 sec</p>
            </div>
            <Separator orientation="vertical" className="h-12 bg-gray-700" />
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Total Questions</p>
              <p className="text-lg font-semibold text-white">10</p>
            </div>
            <Separator orientation="vertical" className="h-12 bg-gray-700" />
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Coins</p>
              <div className="flex items-center justify-center">
                <Coins className="w-4 h-4 text-yellow-400 mr-1" />
                <p className="text-lg font-semibold text-white">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition"
          onClick={() => handleClick("/")}
        >
          Back
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 transition"
          onClick={() => handleClick("/quizpage")}
        >
          Start
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
