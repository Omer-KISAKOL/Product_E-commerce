import Cart from "../components/Cart/index.jsx";
import Head from "next/head";
import React from "react";

export default function CartPage() {

    return (
        <>
            <Head>
                <title>Cart - Shopcart</title>
                <meta property="og:title" content="Shopcart"/>
                <meta name="keywords" content="product, e-commerce, shopping"/>
            </Head>
            <div>
                <Cart/>
            </div>
        </>
    )
}
