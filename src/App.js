
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import Header from './header/Header';
import ProfileCombined from './userProfile/ProfileCombined';
import Myposts from './post/Myposts';

const firebaseConfig = {
  apiKey: "AIzaSyDYwywrUETxrtBKIWHw2D4Wh2yzkC9c5nU",
  authDomain: "sm-app-d68c6.firebaseapp.com",
  projectId: "sm-app-d68c6",
  storageBucket: "sm-app-d68c6.appspot.com",
  messagingSenderId: "22480644317",
  appId: "1:22480644317:web:111cc639ab1a2293a39334",
  measurementId: "G-DRF7ST9PV5" }

firebase.initializeApp(firebaseConfig);

function App() {
  return (
 <div>
    <Router>
      <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/signup' element={<SignupPage/>}/>
          <Route path='/profile' element={<ProfileCombined/>}/>
          <Route exact path='/myposts' element={<Myposts/>}/>
        </Routes>
    </Router>
 </div>
  );
}

export default App;
