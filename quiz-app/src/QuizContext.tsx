import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define types
export interface UserResponse {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  score: number;
}

interface QuizContextType {
  responses: UserResponse[];
  addResponse: (response: UserResponse) => void;
  resetResponses: () => void;
}

// 2. Create context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// 3. Custom hook
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

// 4. Provider
interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const addResponse = (response: UserResponse) => {
    setResponses((prev) => [...prev, response]);
  };

  const resetResponses = () => {
    setResponses([]);
  };

  return (
    <QuizContext.Provider value={{ responses, addResponse, resetResponses }}>
      {children}
    </QuizContext.Provider>
  );
};
