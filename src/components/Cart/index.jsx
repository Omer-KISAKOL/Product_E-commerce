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


        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 laptop:grid-cols-2 gap-8">
            {/* Left Section - Review Item and Shipping */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold">Review Item And Shipping</h2>

                <div className="bg-white rounded-lg shadow p-4">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="flex border-b pb-4 mb-4">

                                <LazyImage src={item.images[0]} alt={item.title} loading="lazy" width={150} height={175}/>

                                <div className="flex w-full items-center justify-between">
                                    <div className="flex flex-col ">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-gray-500">{item.category}</p>
                                        <div className="flex gap-2 mt-2 border-2 border-green-600/40 rounded-full px-2 py-1 w-fit">
                                            <button onClick={() => dispatch(removeFromCart(item))}
                                                    className="text-green-500 hover:text-red-700">
                                                <IoTrashOutline size={20}/>
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => dispatch(addToCart(item))}
                                                    className="text-green-500 hover:text-green-700">
                                                <FaPlus size={20}/>
                                            </button>
                                        </div>

                                    </div>


                                    <div className="flex space-x-2 mt-2 me-2 self-end">
                                        <p className="text-lg font-bold">
                                            ${Math.floor(item.price * item.quantity)}
                                            <span className="text-sm align-text-bottom">
                                                {(item.price * item.quantity % 1).toFixed(2).toString().slice(1)}
                                            </span>
                                        </p>
                                    </div>


                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty!</p>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                    <div className="text-gray-700">
                        <p><strong>Name:</strong> Wade Warren</p>
                        <p><strong>Address:</strong> 4140 Parker Rd. Allentown, New Mexico 31134</p>
                        <p><strong>City:</strong> Austin</p>
                        <p><strong>Zip Code:</strong> 58566</p>
                        <p><strong>Mobile:</strong> +447700900546</p>
                        <p><strong>Email:</strong> georgia.young@example.com</p>
                    </div>
                    <button className="mt-4 text-blue-500 hover:underline">Edit Information</button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="flex place-content-between w-full">
                        <div>
                            {cart.totalAmount ? (
                                <div>
                                    <p className="text-xl font-bold ms-3 mt-3">Total:
                                        ${Math.floor(cart.totalAmount)}
                                        <span className="text-sm align-bottom">
                                                {(cart.totalAmount % 1).toFixed(2).toString().slice(1)}
                                            </span>
                                    </p>
                                </div>
                            ) : (
                                <h3>0</h3>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Enter Coupon Code"
                                className="w-fit border border-gray-300 rounded-lg p-2 mt-4"
                            />
                            <button className="w-fit bg-green-500 rounded-3xl text-white hover:bg-green-600 py-2 px-4 mt-2">Apply Coupon</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                    <div className="space-y-2">
                        <div>
                            <input type="radio" id="cod" name="payment" className="mr-2"/>
                            <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                        <div>
                            <input type="radio" id="shopcard" name="payment" className="mr-2"/>
                            <label htmlFor="shopcard">Shopcart Card</label>
                        </div>
                        <div>
                            <input type="radio" id="paypal" name="payment" className="mr-2"/>
                            <label htmlFor="paypal">Paypal</label>
                        </div>
                        <div>
                            <input type="radio" id="card" name="payment" className="mr-2" defaultChecked/>
                            <label htmlFor="card">Credit or Debit card</label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Card Holder Name"
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <button className="w-full my-3 border-2 py-2 px-4 bg-green-600 border-green-600 rounded-3xl text-white hover:text-green-600 hover:border-green-600 hover:bg-white">Complete order</button>
                    </div>
                </div>
            </div>
        </div>



        // <div>
        //     <h3>Shopping Cart</h3>
        //
        //     <div>
        //         {items.length > 0 ? (
        //             items.map((item) => (
        //                 <div key={item.id}>
        //                     <div>
        //                         <div>
        //                             <LazyImage src={item.images[0]} alt={item.title} loading="lazy" width={150} height={175}/>
        //                         </div>
        //                         <div>
        //                             <StarRatings
        //                                 rating={item.rating}
        //                                 starRatedColor="#08ac0a"
        //                                 starDimension="20px"
        //                                 starSpacing="1px"
        //                                 numberOfStars={5}
        //                             />
        //                         </div>
        //                     </div>
        //
        //                     <div>
        //                     <h3>{trimText(item.title, 30) }</h3>
        //                         <p>{item.category}</p>
        //                         <p>${item.price * item.quantity}</p>
        //                     </div>
        //
        //                     <div>
        //                         <button onClick={() => dispatch(removeFromCart(item))}><IoTrashOutline/></button>
        //                         <p>{item.quantity}</p>
        //                         <button onClick={() => dispatch(addToCart(item))}><FaPlus/></button>
        //                     </div>
        //                 </div>
        //             ))
        //         ) : (
        //             <div>
        //                 Your cart is empty!
        //             </div>
        //         )
        //         }
        //     </div>
        //
        //     <div>
        //         {cart.totalAmount ? (
        //             <div>
        //                 <h3>Total: ${cart.totalAmount.toFixed(2)}</h3>
        //             </div>
        //         ) : (
        //             <h3>0</h3>
        //         )}
        //         <button>Complete order</button>
        //     </div>
        //
        // </div>
    );
}