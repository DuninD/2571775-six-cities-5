import { OffersMap } from './offers-map';
import { OffersList } from './offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesList from './cities-list';
import { SortingVariables } from './sorting-versions';
import { AppRoute, AuthorizationStatus } from '../const';
import { Link } from 'react-router-dom';
import { authLogout } from '../../store/api-actions';

function MainScreen(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const currentOfferId = useAppSelector((state) => state.currentOfferId);
  const offers = useAppSelector((state) => state.offers);
  const currentOffers = offers.filter((offer) => offer.city.name === city.name);
  const cities = offers.map((offer) => offer.city);
  const auth = useAppSelector((state) => state.authorizationStatus);
  const userName = useAppSelector((state) => state.name);
  const dispatch = useAppDispatch();
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">{
                auth === AuthorizationStatus.Auth
                && (
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userName}</span>
                      <span className="header__favorite-count">{offers.filter((offer) => offer.isFavourite).length}</span>
                    </a>
                  </li>
                )
              }
              {auth === AuthorizationStatus.Auth ?
                <Link
                  className="header__nav-link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(authLogout());
                  }}
                  to={AppRoute.Main}
                >
                  <span className="header__signout">Sign out</span>
                </Link> :
                <Link className="header__nav-link" to={AppRoute.Login}>
                  <span className="header__signout">Sign in</span>
                </Link>}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities.filter((someCity, i, arr) => arr.findIndex((anotherCity) => anotherCity.name === someCity.name) === i).sort((a, b) => +(a.name > b.name))} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {city?.name}</b>
              <SortingVariables/>
              <OffersList offers={currentOffers} offerClassNameType='cities' offersDivClassName={'cities__places-list places__list tabs__content'}/>
            </section>
            <div className="cities__right-section">
              <OffersMap points={currentOffers.map((offer) => [offer.location, offer.id === currentOfferId])} className={'cities__map map'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
