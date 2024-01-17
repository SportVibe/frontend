import styles from './FilterBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort, SearchResults } from '../../helpers/filterComponents.jsx';
import Sports from './FilterBoxes/Sports/Sports';
import Brands from './FilterBoxes/Brands/Brands';
import { useEffect, useState } from 'react';
import { brandAction, discountProducts, genreFilterAction, getProducts, priceFilterAction, responsiveNavBar, sortAction, sportAction } from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import videoSource from '../../Images/bike_-_76618 (1080p).mp4';
import img1 from '../../Images/camiseta-seleccion-argentina-adidas.webp';
import img2 from '../../Images/imagesVidal.jpeg';


function FilterBar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [minimumValue, setMinimumValue] = useState('');
    const [maximumValue, setMaximumValue] = useState('');
    const products = useSelector((state => state.products));
    const masterFilter = useSelector((state => state.masterFilter));
    // console.log(products.filterStatics.genderStatistics);
    const filterCounter = useSelector((state => state.filterCounter));
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const category = useSelector((state => state.category));
    const priceFilter = useSelector((state => state.priceFilter));
    const genre = useSelector((state => state.genre));
    const sort = useSelector((state => state.sort));
    const sport = useSelector((state => state.sport));
    const brand = useSelector((state => state.brand));
    const discount = useSelector((state => state.discount));
    const { totalFilteredCount } = useSelector((state) => state.products);
    // console.log(masterFilter);
    function genreHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], sport[0], brand[0], priceFilter[0], priceFilter[1], sort[0], sort[1], discount[0], { search: search_Activity }, { gender: id }]
        dispatch(genreFilterAction([{ gender: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    function sportHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], { sport: id }, brand[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], discount[0], { search: search_Activity }]
        dispatch(sportAction([{ sport: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    function brandHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], { brand: id }, sport[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], discount[0], { search: search_Activity }]
        dispatch(brandAction([{ brand: id }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    function sortHandler(event) {
        const value = event.target.value;
        const sliceString = value.split('_');
        const newFiltersArray = [...totalFilters, category[0], sport[0], brand[0], priceFilter[0], priceFilter[1], genre[0], discount[0], { search: search_Activity }, { sort: sliceString[0] }, { typeSort: sliceString[1] }]
        dispatch(sortAction([{ sort: sliceString[0] }, { typeSort: sliceString[1] }]));
        dispatch(getProducts(newFiltersArray));
        if (pathname !== '/search') navigate('/search');
    }

    function priceSubmit(value) {
        if (value) {
            const newFiltersArray = [...totalFilters, category[0], sport[0], brand[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: value.min }, { maxPrice: value.max }];
            console.log(category[0], sport[0], brand[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: value.min }, { maxPrice: value.max });
            dispatch(priceFilterAction([{ minPrice: value.min }, { maxPrice: value.max }]));
            dispatch(getProducts(newFiltersArray));
            if (pathname !== '/search') navigate('/search');
        }
        else {
            const newFiltersArray = [...totalFilters, category[0], sport[0], brand[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: '' }, { maxPrice: '' }];
            dispatch(priceFilterAction(['', '']));
            dispatch(getProducts(newFiltersArray));
            if (pathname !== '/search') navigate('/search');
        }
    }

    function submitPriceInput() {
        if (minimumValue && maximumValue) {
            if (minimumValue <= maximumValue) {
                const newFiltersArray = [...totalFilters, category[0], brand[0], sport[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: minimumValue }, { maxPrice: maximumValue }];
                dispatch(priceFilterAction([{ minPrice: minimumValue }, { maxPrice: maximumValue }]));
                dispatch(getProducts(newFiltersArray));
                if (pathname !== '/search') navigate('/search');
            }
            else
                alert('El precio mínimo debe ser menor al precio máximo');
        }
        else alert('Debe completar ambos campos');
    }

    function handleDiscounts() {
        if (discount?.length && discount[0].discount > 0) {
            const newFiltersArray = [...totalFilters, { discount: 0 }, category[0], brand[0], sport[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], { search: search_Activity }]
            dispatch(discountProducts([{ discount: 0 }]));
            dispatch(getProducts(newFiltersArray));
            if (pathname !== '/search') navigate('/search');
        }
        else {
            const newFiltersArray = [...totalFilters, { discount: 1 }, category[0], brand[0], sport[0], priceFilter[0], priceFilter[1], genre[0], sort[0], sort[1], { search: search_Activity }]
            dispatch(discountProducts([{ discount: 1 }]));
            dispatch(getProducts(newFiltersArray));
            if (pathname !== '/search') navigate('/search');
        }
    }

    useEffect(() => {
        /* const sumFilters = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], genre[0], { search: search_Activity }]
        dispatch(getProducts(sumFilters)); */
        dispatch(responsiveNavBar(false));
    }, []);

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sliderContainer}>
                    <div className={styles.sortBy}>
                        <Sort sortHandler={sortHandler} />
                    </div>
                    <div className={styles.resultsBox}>
                        <SearchResults search={search_Activity} totalCount={totalFilteredCount} />
                        <div className={styles.divider}></div>
                    </div>
                    <div className={styles.dicountContainer}>
                        <div onClick={handleDiscounts} className={`${styles.dicountButton} ${discount[0]?.discount > 0 ? styles.discountOn : ''}`}>
                            <div onClick={handleDiscounts}>
                            </div>
                        </div>
                        <p className={discount[0]?.discount > 0 ? styles.textDisplayed : ''}>Con descuento</p>
                    </div>
                    {/* {(filterCounter && Object.values(filterCounter).length > 0) &&
                        <div className={styles.filtrosAplicados}>
                            <p>Filtros aplicados:</p>
                            <p>{Object.values(filterCounter).length}</p>
                        </div>
                    } */}
                    <div className={styles.filterBox}>
                        <PriceBox priceFilter={priceFilter} priceSubmit={priceSubmit} submitPriceInput={submitPriceInput} setMaximumValue={setMaximumValue} setMinimumValue={setMinimumValue} minimumValue={minimumValue} maximumValue={maximumValue} />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <GenreBox genderStatistics={masterFilter?.filterStatics?.genderStatistics} genreHandler={genreHandler} genre={genre} brand={brand} sport={sport} />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <Sports sportStatistics={masterFilter?.filterStatics?.sportStatistics} sportHandler={sportHandler} sport={sport} genre={genre} brand={brand} />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <Brands brandStatistics={masterFilter?.filterStatics?.brandStatistics} brandHandler={brandHandler} brand={brand} sport={sport} genre={genre} />
                    </div>
                    {/* <div className={styles.filterBox}>
                        <SizeBox />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <ColorBox />
                    </div>
                    <div className={styles.divider}></div> */}
                    {/* {pathname !== '/search' &&
                        <div className={styles.videoContainer}>
                            <video autoPlay muted loop>
                                <source src={videoSource} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>} */}
                    {pathname !== '/search' &&
                        <div className={styles.imageContainer}>
                            <img src={img1} alt="" />
                        </div>}
                    {pathname !== '/search' &&
                        <div className={styles.imageContainer}>
                            <img src={img2} alt="" />
                        </div>}
                </div>
            </div>
            <div className={styles.layoutUp}>
            </div>
            <div className={styles.layoutDown}>
            </div>
        </div>
    );
}

export default FilterBar;