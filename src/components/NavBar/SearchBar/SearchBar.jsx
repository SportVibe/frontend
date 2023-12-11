import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts, searchActivity } from '../../../redux/actions';

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.length) {
      const propertiesArray = [{search: searchTerm}]
      dispatch(getProducts(propertiesArray));
      dispatch(searchActivity(searchTerm));
      navigate('/search');
    }
  };

  return (
    <div>
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
