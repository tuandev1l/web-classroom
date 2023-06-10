import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import { AppContext } from './stores/Provider';

function App() {
  const { isLoggedin } = useContext(AppContext);

  return (
    <Routes>
      {publicRoutes.map((route) => {
        const Element = route.element;
        return (
          <Route
            key={Math.random()}
            path={route.path}
            element={isLoggedin ? <Navigate to={'/books'} /> : <Element />}
          />
        );
      })}
      {privateRoutes.map((route) => {
        const Element = route.element;
        return (
          <Route
            key={Math.random()}
            path={route.path}
            element={isLoggedin ? <Element /> : <Navigate to={'/'} />}
          />
        );
      })}
    </Routes>
  );
}

export default App;
