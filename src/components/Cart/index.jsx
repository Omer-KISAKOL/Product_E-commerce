import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '@/store/slices/cartSlice.js';
import {lazy, Suspense} from "react";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import {trimText} from "@/utils/TextTrim.js";
import LazyImage from "@/utils/LazyImage.jsx";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    console.log(cart);

    return (
        <div>
            <h3>Shopping Cart</h3>

            <div>
                {cart.items.length > 0 ? (
                    cart.items.map((item) => (
                        <div key={item.id}>
                            <div>
                                <div>
                                    <LazyImage src={item.images[0]} alt={item.title} loading="lazy" width={150} height={175}/>
                                </div>
                                <p>{item.rating} ★</p>
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