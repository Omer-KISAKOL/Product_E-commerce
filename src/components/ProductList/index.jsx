import React, {useMemo, useState, useEffect, Suspense, lazy} from 'react';
import {useQuery} from "react-query";
import {useSelector} from 'react-redux';
import {productsService} from "@/services/products.service.js";
import {filterProducts} from "@/utils/FilterProducts.js";
import useInView from "../../hooks/useInView.js";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
import {API_CONFIG, UI_CONFIG} from "@/constants/config.js";
import NoFound from "../NoFound/index.jsx";
import {Skeleton} from "@/styles/SkeletonImage.jsx";

const ProductCard = lazy(() => import("../ProductCard/index.jsx"));

const ProductList = () => {
    const [page, setPage] = useState(1);
    const [visibleProducts, setVisibleProducts] = useState([]);

    const filter = useSelector((state) => state.filters.filter);
    const sort = useSelector((state) => state.filters.sort);
    const search = useSelector((state) => state.filters.search);

    const {data: products, isLoading, error,} = useQuery("products", () => productsService.fetchProducts(), {
        staleTime: API_CONFIG.STALE_TIME, // 15 minutes
        refetchOnWindowFocus: false,
    });

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return filterProducts(products, filter, sort, search);
    }, [products, filter, sort, search]);

    //determining how long the sequence will be long
    useEffect(() => {
        if (filteredProducts) {
            setVisibleProducts(filteredProducts.slice(0, UI_CONFIG.ITEMS_PER_PAGE));
        }
    }, [filteredProducts]);

    const {ref: loadMoreRef} = useInView(() => {
        const nextPage = page + 1;
        const newVisibleProducts = filteredProducts.slice(0, nextPage * UI_CONFIG.ITEMS_PER_PAGE);
        setVisibleProducts(newVisibleProducts);
        setPage(nextPage);
    })

    if (isLoading) return <div><LoadingCircle size="30px"/></div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!visibleProducts.length) return <div><NoFound/></div>;

    console.log(visibleProducts, filteredProducts);


    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {visibleProducts.map((product) => (
                    <div key={product.id}>
                        <Suspense fallback={<div><Skeleton width="300" height="385" borderRadius="8"/></div>}>
                            <ProductCard product={product}/>
                        </Suspense>
                    </div>
                ))}
            </div>
            <div ref={loadMoreRef}>
                {visibleProducts.length > 0 && (<div>No more products found!</div>)}
            </div>
        </div>
    )
}

ProductList.displayName = "ProductList";

export default React.memo(ProductList);