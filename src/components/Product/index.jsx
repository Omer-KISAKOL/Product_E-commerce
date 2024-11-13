import React, {lazy, Suspense, useEffect, useState} from "react";
import {Skeleton} from "@/styles/SkeletonImage.jsx";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {API_CONFIG} from "@/constants/config.js";
import NoFound from "@/components/NoFound/index.jsx";
const LazyImage = lazy(() => import('@/utils/LazyImage.jsx'))

export default function Product({id}) {
    const numericId = parseInt(id, 10);
    const [product, setProduct] = useState(null)

    console.log(numericId)

    useEffect(() => {

        async function fetchProductById() {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT}/${numericId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Ürün fetch edilirken hata oluştu:", error);
            }
        }
        if (numericId) {
            fetchProductById();
        }
    }, [numericId]);

    console.log(product)

    if (!product) return <div className="w-dvw min-h-dvh flex justify-center items-center"><LoadingCircle/></div>;

    return (
        <div>

            <div className="max-w-4xl mx-auto p-6">
                {/* Breadcrumbs */}
                <div className="text-gray-500 text-sm mb-4">
                    Electronics / {product.category} / {product.title}
                </div>

                {/* Main Product Section */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Suspense fallback={<Skeleton />}>
                            <LazyImage
                                src={product.images[0]}
                                alt={product.title}
                                width={400}
                                height={400}
                                className="rounded-lg mb-4"
                            />
                        </Suspense>
                        {/* Additional Images */}
                        <div className="flex gap-2 mt-4">
                            {product.images.map((img, index) => (
                                <Suspense key={index} fallback={<LoadingCircle />}>
                                    <LazyImage
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        loading="lazy"
                                        className="w-20 h-20 rounded-lg object-cover"/>
                                </Suspense>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-lg font-semibold">${product.price}</span>
                            <span className="text-sm text-gray-500 ml-2">Discount: {product.discountPercentage}%</span>
                        </div>

                        {/* Availability and Brand */}
                        <p className="mb-4">
                            <span className="font-medium">Brand:</span> {product.brand} <br/>
                            <span className="font-medium">Availability:</span> {product.availabilityStatus}
                        </p>

                        {/* Dimensions and Weight */}
                        <div className="mb-4">
                            <p className="font-medium">Dimensions:</p>
                            <p>Depth: {product.dimensions.depth} cm, Height: {product.dimensions.height} cm,
                                Width: {product.dimensions.width} cm</p>
                            <p><span className="font-medium">Weight:</span> {product.weight} g</p>
                        </div>

                        {/* Rating */}
                        <div className="mb-4">
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="blue"
                                starDimension="20px"
                                starSpacing="1px"
                                numberOfStars={5}
                            />
                        </div>

                        {/* Minimum Order Quantity */}
                        <p className="mb-4">
                            <span className="font-medium">Minimum Order Quantity:</span> {product.minimumOrderQuantity}
                        </p>

                        {/* Stock */}
                        <p className="text-red-500 mb-4">Only {product.stock} Items Left!</p>

                        {/* SKU and Barcode */}
                        <p className="mb-4">
                            <span className="font-medium">SKU:</span> {product.sku} <br/>
                            <span className="font-medium">Barcode:</span> {product.meta.barcode}
                        </p>

                        {/* Shipping and Warranty Information */}
                        <p className="mb-4">
                            <span className="font-medium">Shipping:</span> {product.shippingInformation} <br/>
                            <span className="font-medium">Warranty:</span> {product.warrantyInformation}
                        </p>

                        {/* Return Policy */}
                        <p className="mb-4">
                            <span className="font-medium">Return Policy:</span> {product.returnPolicy}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 mb-6">
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg">Buy Now</button>
                            <button className="border border-gray-300 px-6 py-3 rounded-lg">Add to Cart</button>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center">
                                <span className="text-green-600">Free Delivery</span>
                                <input
                                    type="text"
                                    placeholder="Enter your Postal Code"
                                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                                />
                            </div>
                            <p className="text-sm text-gray-500">{product.returnPolicy}</p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-300 pb-4">
                                <p className="font-medium">{review.reviewerName} - {review.rating} ⭐</p>
                                <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                                <p className="mt-2">{review.comment}</p>
                            </div>))}
                    </div>
                </div>
            </div>

        </div>
    );
}
