import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import LoginSignUp from './components/LoginSignUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginSignUp/>}></Route>
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;
