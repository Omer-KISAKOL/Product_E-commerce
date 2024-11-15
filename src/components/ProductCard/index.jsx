import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import {addToCart} from '@/store/slices/cartSlice.js';
import React, {lazy, Suspense, useCallback, useState} from "react";
import {ProductType} from "@/types/product.types.js";
import {trimText} from "@/utils/TextTrim.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
import { FaRegHeart } from "react-icons/fa";
import {useRouter} from "next/router";
import {GiCheckMark} from "react-icons/gi";
const LazyImage = lazy(() => import('@/utils/LazyImage.jsx'))

const ProductCard = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [animateBounce, setAnimateBounce] = useState(false)


    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(product));
        setAnimateBounce(true);

        const timer = setTimeout(() => {
            setAnimateBounce(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch, product]);

    const handleProductClick = (id) => {
        router.push(`/product?id=${id}`);
    };

    return (
        <div
            className="max-w-sm w-[300px] h-[350px] shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col place-content-between rounded-xl">
            <div onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                <div className="relative bg-neutral-100 rounded-t-xl flex justify-center h-[190px]">
                    <Suspense fallback={<LoadingCircle/>}>
                        <LazyImage
                            src={product.images[0]}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                        />
                    </Suspense>
                    <button
                        // onClick={handleAddToWishlist}
                        className="absolute top-2 right-4 text-gray-600 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                    >
                        <FaRegHeart />
                    </button>
                </div>

                <div className="text-center mt-3">
                    <h3 className="text-md font-semibold text-gray-800">{trimText(product.title, 30)}</h3>
                    <div className="flex items-center justify-evenly">
                        <p className="text-gray-700 text-sm">{product.category}</p>
                        <p className="text-xl font-bold text-gray-900">
                            <span className="text-xs align-text-top">$</span>
                            {Math.floor(product.price)}
                            <span className="text-xs align-text-top">{(product.price % 1).toFixed(2).toString().slice(1)}</span>
                        </p>
                    </div>
                    <StarRatings
                        rating={product.rating}
                        starRatedColor="#08ac0a"
                        starDimension="20px"
                        starSpacing="1px"
                        numberOfStars={5}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="my-3 px-3 flex justify-start">
                <button
                    className="flex items-center gap-2 px-3 bg-transparent border-2 border-black text-black py-1 rounded-2xl hover:bg-green-900 hover:border-green-900 hover:text-white transition-colors duration-200"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                    {animateBounce && (<GiCheckMark size={18}/>) }
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
