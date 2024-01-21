import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import LoginSignUp from './components/LoginSignUp';
import Home from './components/Home';

export const userServer = "https://aamish-hussain-quizzie.onrender.com/api/v1/user"

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginSignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;
