import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import {addToCart} from '../../store/slices/cartSlice.js';
import {lazy, memo, Suspense, useCallback} from "react";
import {LoadingCircle} from "../styles/LoadingCircle.jsx";
import {ProductType} from "../../types/product.types.js";
import {trimText} from "../../utils/TextTrim.js";

const LazyImage = lazy(() => import("../../utils/LazyImage.jsx"));

const ProductCard = memo(({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

    return (
        <div>
            <div>
                <div>
                    <Suspense fallback={<div><LoadingCircle size="30px"/></div>}>
                        <LazyImage src={product.images[0]} alt={product.title} loading="lazy" width={75}/>
                    </Suspense>
                </div>
                <p>{product.rating} ★</p>
            </div>

            <div>
            <h3>{trimText(product.title, 30) }</h3>
                <p>{product.category}</p>
                <p>${product.price}</p>
            </div>

            <div>
                <button onClick={handleAddToCart} >Add to Cart</button>
            </div>
        </div>
    );
});

ProductCard.propTypes = {
    product: PropTypes.shape(ProductType).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
