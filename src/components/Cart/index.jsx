import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart, setCart} from '@/store/slices/cartSlice.js';
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import {trimText} from "@/utils/TextTrim.js";
import LazyImage from "@/utils/LazyImage.jsx";
import React, {useEffect, useState} from "react";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {getLocal} from "@/utils/LocalStorage.js";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCartItems = getLocal("cartItems", []);
            const savedTotalAmount = getLocal("totalAmount", 0);
            // Veriyi Redux store'a dispatch et
            dispatch(setCart({ items: savedCartItems, totalAmount: savedTotalAmount }));
        }
    }, [dispatch]);

    console.log(items);

    return (
        <div>
            <h3>Shopping Cart</h3>

            <div>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id}>
                            <div>
                                <div>
                                    <LazyImage src={item.images[0]} alt={item.title} loading="lazy" width={150} height={175}/>
                                </div>
                                <div>
                                    <StarRatings
                                        rating={item.rating}
                                        starRatedColor="#08ac0a"
                                        starDimension="20px"
                                        starSpacing="1px"
                                        numberOfStars={5}
                                    />
                                </div>
                            </div>

                            <div>
                            <h3>{trimText(item.title, 30) }</h3>
                                <p>{item.category}</p>
                                <p>${item.price * item.quantity}</p>
                            </div>

                            <div>
                                <button onClick={() => dispatch(removeFromCart(item))}><IoTrashOutline/></button>
                                <p>{item.quantity}</p>
                                <button onClick={() => dispatch(addToCart(item))}><FaPlus/></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        Your cart is empty!
                    </div>
                )
                }
            </div>

            <div>
                <h3>Total: ${cart.totalAmount.toFixed(2)}</h3>
                <button>Complete order</button>
            </div>

        </div>
    );
}