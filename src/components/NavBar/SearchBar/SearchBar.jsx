import styles from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getProducts, searchActivity, genreFilterAction, sortAction, priceFilterAction, discountProducts, filterCounterAction, sportAction, brandAction } from '../../../redux/actions';

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const search_Activity = useSelector((state => state.search));
  const category = useSelector((state => state.category));
  const [searchTerm, setSearchTerm] = useState(search_Activity);

  const handleSearch = () => {
    if (searchTerm.trim().length) {
      const propertiesArray = [{ search: searchTerm }]
      // reseteamos todos los filtrso y ordenamientos
      dispatch(genreFilterAction([{ gender: '' }]));
      dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
      dispatch(priceFilterAction(['', '']));
      dispatch(discountProducts([{ discount: 0 }]));
      dispatch(searchActivity(searchTerm));
      dispatch(sportAction([{ sport: '' }]));
      dispatch(brandAction([{ brand: '' }]));
      dispatch(filterCounterAction({}));

      dispatch(getProducts(propertiesArray));
      if (pathname !== '/search') navigate('/search');
    }
  };

  const handleInputClick = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    setSearchTerm('');
  }, [search_Activity]);

  return (
    <div className={`${styles.mainView} ${isInputFocused ? styles.onClick : ''}`}>
      <input
        type="text"
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        placeholder={t('translation.Product')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
