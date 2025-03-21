import './App.css'; // Importing the CSS file for styling
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PageNotFound from './pages/PageNotFound';
import Friends from './pages/Friends';

// Components
import NavBar from './pages/NavBar';
import CreateCard from './component/card/CreateCard';
import CreateSetCard from './component/setcard/CreateSetCard';

// Context
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  // const [auth, Setauth] = useState(false);
  const api = process.env.SERVER_APP_API_URL || 'http://localhost:3001';
  const {auth}=useAuth();
  // useEffect(() => {
  //   axios.get(`${api}/auth`).then((res) => {
  //     if (res.data.error) { 
  //       Setauth(false); 
  //     }
  //     else {
  //       Setauth(true);
  //     }
  //   })
  // }, [])

  // const Logout = () => {
  //   localStorage.removeItem("access_token");
  //   Setauth(false);
  //   // window.location.href = '/';
  // }

  return (
    <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover={false}
          draggable
        />
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createcard' element={<CreateCard />} />
            <Route path='/createsetcard' element={<CreateSetCard />} />
            <Route path='/setofcards/:id' element={auth && <CreateCard />} />
            <Route path='/login' element={auth ? <Navigate to="/" /> : <Login />} />
            <Route path='/registration' element={auth ? <Navigate to="/" /> : <Registration />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/friends' element={auth ? <Friends /> : <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
