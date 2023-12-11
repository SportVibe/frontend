import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../redux/actions';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.length) {
      const propertiesArray = [{search: searchTerm}]
      dispatch(getProducts(propertiesArray));
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
