import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AuthPage from '../../pages/auth/Auth.page';
// import RegistrationPage from '../../pages/auth/Registration.page';
import MainPage from "../../pages/Main.page";
import NotFoundPage from '../../pages/not-found.page';
import { useSelector } from 'react-redux';
import { useEffect} from 'react';
import IRootState from '../../reducers/RootState';

const Navigation = () => {
  const isDarkMode = useSelector((state: IRootState) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);


  return (
        <Router>
          <Routes>
            {/*<Route path='/auth' element={<AuthPage />} />*/}
            <Route path='/' element={<MainPage/>} />
            {/*<Route path='/registration' element={<RegistrationPage />} />*/}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
  );
};

export { Navigation };
