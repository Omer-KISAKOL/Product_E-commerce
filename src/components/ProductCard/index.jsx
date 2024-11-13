import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import {addToCart} from '@/store/slices/cartSlice.js';
import {memo, useCallback} from "react";
import {ProductType} from "@/types/product.types.js";
import {trimText} from "@/utils/TextTrim.js";
import Link from "next/link.js";
import LazyImage from "@/utils/LazyImage.jsx";


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

    return (
        <Link href={`/product/${product.title}`}>
            <div>
                <div>
                    <LazyImage src={product.images[0]} alt={product.title} loading="lazy" width={150} height={175}/>
                </div>
                <p>{product.rating} ★</p>
            </div>

            <div>
            <h3>{trimText(product.title, 30) }</h3>
                <p>{product.category}</p>
                <p>${product.price}</p>
            </div>

            <div>
                <button className="bg-blue-700 text-white py-1 px-2 rounded-lg" onClick={handleAddToCart}>Add to Cart
                </button>
            </div>
        </Link>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape(ProductType).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
