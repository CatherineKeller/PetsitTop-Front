import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MyProfile from '../MyProfile/MyProfile';
import Identification from '../Identification/Identification';
import './App.scss';
import Home from '../Home/Home';

function App() {
  // const logged = true;
  const logged = useSelector((state) => state.user.logged);

  return (
    <div className="App">
      <Header isLogged={logged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/mon_profil" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
