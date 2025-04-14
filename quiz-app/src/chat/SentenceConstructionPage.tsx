import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { IconCoin } from "@tabler/icons-react";

// Variants for staggering the information section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SentenceConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-10 gap-8 bg-white">
      {/* Header Title */}
      <div className="text-gray-500 text-sm">Sentence Construction</div>

      {/* Main Content with Fade-in Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Pencil Icon from Lucide React */}
        <Pencil className="w-16 h-16 text-gray-500" />
        <h1 className="text-3xl font-bold text-black mt-4">
          Sentence Construction
        </h1>
        <p className="text-gray-600 text-center mt-2 max-w-md">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </motion.div>

      {/* Information Section with Staggered Animation */}
      <motion.div
        className="flex space-x-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-black">
          30 sec
        </motion.div>
        <motion.div variants={itemVariants} className="text-black">
          10
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-center text-black"
        >
          <IconCoin className="w-5 h-5 mr-1 text-yellow-500" /> 0
        </motion.div>
      </motion.div>

      {/* Buttons with Hover and Tap Animations */}
      <div className="flex space-x-4">
        <motion.button
          className="px-4 py-2 bg-blue-200 text-white border border-blue-500 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
        </motion.button>
      </div>
    </div>
  );
}
