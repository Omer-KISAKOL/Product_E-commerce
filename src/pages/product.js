import {useRouter} from "next/router";
import React, {lazy, Suspense} from "react";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
const Product = lazy(() => import('@/components/Product'))

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="flex flex-col justify-center place-items-center w-full">
            <Suspense fallback={<LoadingCircle size="40px"/>}>
                <Product id={id} />
            </Suspense>
        </div>
    )
}
