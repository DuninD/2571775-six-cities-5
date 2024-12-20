import { OffersMap } from './offers-map';
import { MemoizedOffersList } from './offers-list';
import { useAppSelector } from '../../hooks';
import MemoizedCitiesList from './cities-list';
import { MemoizedSortingVariables } from './sorting-versions';
import { MemoizedHeader } from './header';
import { SortTypes } from '../const';
import { memo, useCallback } from 'react';

function MainScreen(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const currentOfferId = useAppSelector((state) => state.currentOfferId);
  const offers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortingType);
  const getCurrentOffers = useCallback(() => {
    const offersToSort = [...offers];
    switch (sortType) {
      case SortTypes.Popular:
        return offersToSort;
      case SortTypes.PriceFromHigh:
        return offersToSort.sort((a, b) => b.price - a.price);
      case SortTypes.PriceFromLow:
        return offersToSort.sort((a, b) => a.price - b.price);
      case SortTypes.TopRated:
        return offersToSort.sort((a, b) => b.rating - a.rating);
    }
  }, [offers, sortType]);
  const currentOffers = getCurrentOffers().filter((offer) => offer.city.name === city.name);
  const cities = offers.map((offer) => offer.city);
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
            <MemoizedHeader/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <MemoizedCitiesList cities={cities.filter((someCity, i, arr) => arr.findIndex((anotherCity) => anotherCity.name === someCity.name) === i).sort((a, b) => a.name.localeCompare(b.name))} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {city?.name}</b>
              <MemoizedSortingVariables/>
              <MemoizedOffersList offers={currentOffers} offerClassNameType='cities' offersDivClassName={'cities__places-list places__list tabs__content'}/>
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

const MemoizedMainScreen = memo(MainScreen);
export default MemoizedMainScreen;
