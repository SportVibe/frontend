import styles from "./ProductCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import capitalize from '../../utils/capitalize.js';
import { useDispatch, useSelector } from "react-redux";
import { brandAction, categoryAction, discountProducts, filterCounterAction, genreFilterAction, getProducts, priceFilterAction, searchActivity, sortAction, sportAction } from "../../redux/actions";

function ProductCard({ productData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [imgHover, setImgHover] = useState(false);
    const genre = useSelector((state => state.genre));
    const sport = useSelector((state => state.sport));
    const _category = useSelector((state => state.category));
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const priceFilter = useSelector((state => state.priceFilter));
    const sort = useSelector((state => state.sort));
    const _discount = useSelector((state => state.discount));

    const id = productData?.id ? productData.id : "";
    const Colors = productData?.Colors.length ? productData.Colors : [""];
    const Images = productData?.Images.length ? productData.Images : [""];
    const Stocks = productData?.Stocks.length ? productData.Stocks : [""];
    const available = productData?.available ? productData.available : "";
    const category = productData?.category ? productData.category : "";
    const description = productData?.description ? productData.description : "";
    const discount = productData?.discount > 0 ? productData.discount : "";
    const gender = productData?.gender ? productData.gender : "";
    const brand = productData?.brand ? productData.brand : "";
    const subCategory = productData?.subCategory ? productData.subCategory : "";
    const title = productData?.title ? capitalize(productData.title) : "";
    let currentPrice = productData?.price ? Number(productData.price) : '';
    let oldPrice = (discount && Number(discount) > 0) ? currentPrice * 100 / (100 - discount) : '';
    currentPrice = (currentPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    oldPrice = (oldPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const countReviews = productData?.countReviews ? productData?.countReviews : 0;
    let avgScore = productData?.averageScore ? productData?.averageScore : 0;
    avgScore = parseFloat(avgScore.toFixed(1));


    function categoryHandler(event) {
        const id = event.target.id; // pasamos la categoría como si fuera una búsqueda del search bar, para que pise lo que se busca con él.
        const propertiesArray = [{ search: id }];
        dispatch(genreFilterAction([{ gender: '' }]));
        dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
        dispatch(priceFilterAction(['', '']));
        dispatch(discountProducts([{ discount: 0 }]));
        dispatch(searchActivity(id));
        dispatch(categoryAction(id));
        dispatch(sportAction([{ sport: '' }]));
        dispatch(brandAction([{ brand: '' }]));
        dispatch(filterCounterAction({}));

        dispatch(getProducts(propertiesArray));
        if (pathname !== '/search') navigate('/search');
    }

    function brandHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, _category[0], { brand: id }, sport[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], _discount[0], { search: search_Activity }]
        dispatch(brandAction([{ brand: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
    }

    function handleNavigate() {
        navigate(`/detail/${id}`);
    }

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <p className={`${styles.newProduct} ${(id && parseInt(id) >= 30) ? '' : styles.hiddenText}`}>Nuevo</p>
                <div
                    onClick={handleNavigate}
                    className={styles.imgContainer}
                    id={imgHover && styles.imgHover}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={Images[0]} alt="imagen" />
                    {imgHover && (
                        <div className={styles.layout}>
                            <div>
                                <i className="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.downSideContainer}>
                    <div className={styles.categoryNameContainer}>
                        <p id={category} className={styles.category} onClick={categoryHandler}>{category}</p>
                        <div className={styles.starContainer}>
                            <p>{avgScore}</p>
                            {(avgScore > 0 && avgScore < 1) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 1 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 1 && avgScore < 2) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 2 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 2 && avgScore < 3) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 3 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 3 && avgScore < 4) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 4 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 4 && avgScore < 5) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 5 && <i className="fa-solid fa-star"></i>}

                            {(avgScore <= 4) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 3) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 2) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 1) && <i className="fa-regular fa-star"></i>}
                            {(avgScore === 0) && <i className="fa-regular fa-star"></i>}
                            <p>{`(${countReviews})`}</p>
                        </div>
                    </div>
                    <div className={styles.titleContainer} onClick={handleNavigate}>
                        <p onClick={handleNavigate}>{title}</p>
                    </div>
                    <div id={brand} onClick={brandHandler} className={styles.brandContainer}>
                        <p id={brand} onClick={brandHandler}>{capitalize(brand)}</p>
                    </div>
                    <div className={styles.priceContainer}>
                        {!discount ?
                            <p>$USD {currentPrice}</p> :
                            <div>
                                <p className={styles.newPrice}>$USD {currentPrice}</p>
                                <div className={styles.discountContainer}>
                                    <p className={styles.discount}><span>-{discount}%</span></p>
                                    <p className={styles.oldPrice}>Antes: <span>$USD {oldPrice}</span></p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
