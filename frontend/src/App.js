import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import LoginSignUp from './components/LoginSignUp';
import Home from './components/Home';
import Result from './components/Result';
import Playquiz from './components/Playquiz';

export const userServer = "https://aamish-hussain-quizzie.onrender.com/api/v1/user"
export const quizServer = "https://aamish-hussain-quizzie.onrender.com/api/v1/quiz"

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginSignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/result' element={<Result/>}></Route>
          <Route path='/playQuiz' element={<Playquiz/>}></Route>
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;
