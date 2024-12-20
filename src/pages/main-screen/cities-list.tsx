import { memo, useCallback } from 'react';
import {useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/action.ts';
import { City } from '../../types/city.ts';


type CitiesListProps = {
  cities: City[];
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const callbackCityChange = useCallback((city: City) => {
    dispatch(changeCity(city));
  }, [dispatch]);
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={`city-${city.name}`}
          className="locations__item"
          onClick={() => callbackCityChange(city)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
