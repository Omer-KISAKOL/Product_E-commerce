import {Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage/index.jsx";
import ProductPage from "../pages/ProductPage/index.jsx";
import CartPage from "../pages/CartPage/index.jsx";
import NotFoundPage from "../pages/NotFoundPage/index.jsx";

export const Root = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
