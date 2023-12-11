import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage, getProducts } from '../../redux/actions';

const Paginado = () => {
  const dispatch = useDispatch();
  const { currentPage, limitPage, totalFilteredCount } = useSelector((state) => state.products);
  let arrayPages = [];
  const totalPages = (totalFilteredCount && limitPage) ? totalFilteredCount / limitPage : 1;
  for (let i = 0; i < totalPages; i++) {
    arrayPages.push(i + 1);
  }

  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    dispatch(getProducts([{page: newPage}, {limit: limitPage}]));
    /* dispatch(getProductPage({ page: newPage, limit: limitPage })); */
  };

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {arrayPages.length && arrayPages.map((pageNumber, i) => {
          return (
            <li key={i} class="page-item"  onClick={() => handlePageChange(pageNumber + 1)}><a class="page-link" href="#">{pageNumber}</a></li>
          )
        })}
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginado;

{/* <div className="mainView d-flex justify-content-center w-100">
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
  </div> */}