import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import {addToCart} from '@/store/slices/cartSlice.js';
import {lazy, Suspense, useCallback} from "react";
import {ProductType} from "@/types/product.types.js";
import {trimText} from "@/utils/TextTrim.js";
const LazyImage = lazy(() => import('@/utils/LazyImage.jsx'))
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);


    return (
        <div>
            <div>
                <div>
                    <Suspense fallback={<LoadingCircle/>}>
                        <LazyImage src={product.images[0]} alt={product.title} width={150} height={175}/>
                    </Suspense>
                </div>
                <StarRatings
                    rating={product.rating}
                    starRatedColor="blue"
                    starDimension="20px"
                    starSpacing="1px"
                    numberOfStars={5}
                />
            </div>

            <div>
            <h3>{trimText(product.title, 30) }</h3>
                <p>{product.category}</p>
                <p>${product.price}</p>
            </div>

            <div>
                <button className="bg-blue-700 text-white py-1 px-2 rounded-lg hover:bg-blue-900" onClick={handleAddToCart}>Add to Cart
                </button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape(ProductType).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
