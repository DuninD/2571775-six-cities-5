import { Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoute } from '../../pages/const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { Spinner } from '../../pages/main-screen/spinner';
import { HistoryRouter } from '../history-router/history-router';
import { browserHistory } from '../../browser-history';

function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);
  if (isLoading){
    return(<Spinner />);
  }

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
