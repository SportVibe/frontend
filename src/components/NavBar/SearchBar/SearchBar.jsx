import styles from './SearchBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts, searchActivity, genreFilterAction, sortAction, priceFilterAction } from '../../../redux/actions';

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.length) {
      const propertiesArray = [{ search: searchTerm }]
      // reseteamos todos los filtrso y ordenamientos
      dispatch(genreFilterAction([{ gender: '' }]));
      dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
      dispatch(priceFilterAction(['', '']));
      dispatch(searchActivity(searchTerm));

      dispatch(getProducts(propertiesArray));
      navigate('/search');
    }
  };

  return (
    <div className={styles.mainView}>
      <input
        type="text"
        placeholder="Product..."
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
