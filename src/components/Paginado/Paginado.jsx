import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../redux/actions'; 

const Paginado = () => {
  const dispatch = useDispatch();
  const { currentPage, limitPage } = useSelector((state) => state.products);

  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    dispatch(getProductPage({ page: newPage, limit: limitPage }));
  };

  return (
    <div className="mainView d-flex justify-content-center w-100">
      <div id="arrows" className="leftArrow" onClick={() => handlePageChange(pageNumber - 1)}>
        &laquo;
      </div>
      <div className="pagesBox">
        <div className="pagesSubBox">
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
          />
          <p>of {limitPage}</p>
        </div>
      </div>
      <div id="arrows" className="rightArrow" onClick={() => handlePageChange(pageNumber + 1)}>
        &raquo;
      </div>
    </div>
  );
};

export default Paginado;
