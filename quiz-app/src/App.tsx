import Home from "./chat/Home";
// import SentenceConstructionPage from "./chat/SentenceConstructionPage";
import QuizPage from "./chat/QuizPage";
import Result from "./chat/Result";
// import Quiz from "./chat/Quiz";
import { Routes,Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/quizpage" element={<QuizPage/>}/>
      <Route path="/result" element={<Result/>}/>
      {/* <Route path="/" element={<Home/>}/> */}
     </Routes>
    </ThemeProvider>
  );
}

export default App;
