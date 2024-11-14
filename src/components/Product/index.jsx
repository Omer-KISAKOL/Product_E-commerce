import React, {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {Skeleton} from "@/styles/SkeletonImage.jsx";
import {LoadingCircle} from "@/styles/LoadingCircle.jsx";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {API_CONFIG} from "@/constants/config.js";
import {addToCart} from "@/store/slices/cartSlice.js";
import {useDispatch} from "react-redux";
import Modal from 'react-modal';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import {IoMdCloseCircleOutline} from "react-icons/io";
const LazyImage = lazy(() => import('@/utils/LazyImage.jsx'))

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        border: '2px solid rgb(22 163 74)',
        borderRadius: '16px',
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    },
};

Modal.setAppElement('#__next');


export default function Product({id}) {
    const numericId = parseInt(id, 10);
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleImageClick = (img, index) => {
        setSelectedImage(img);
        setSelectedIndex(index);
    };

    const handleNextImage = () => {
        const nextIndex = (selectedIndex + 1) % product.images.length;
        setSelectedIndex(nextIndex);
        setSelectedImage(product.images[nextIndex]);
    };

    const handlePrevImage = () => {
        const prevIndex = (selectedIndex - 1 + product.images.length) % product.images.length;
        setSelectedIndex(prevIndex);
        setSelectedImage(product.images[prevIndex]);
    };

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

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
        <div className="flex flex-col justify-center place-items-center  container">

            <div className="max-w-6xl mx-auto my-6">
                {/* Breadcrumbs */}
                <div className="text-gray-500 text-sm mb-4">
                    Home / {product.category.charAt(0).toUpperCase() + product.category.slice(1)} / {product.title}
                </div>

                {/* Main Product Section */}
                <div className="flex flex-col laptop:flex-row gap-8">
                    {/* Image Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Suspense fallback={<Skeleton/>}>
                            <LazyImage
                                src={selectedImage ? selectedImage : product.images[0]}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="rounded-lg mb-4 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                                onClick={openModal}
                            />
                        </Suspense>

                        {/* Ek Resimler */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {product.images.map((img, index) => (
                                <Suspense key={index} fallback={<LoadingCircle/>}>
                                    <LazyImage
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        loading="lazy"
                                        className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${selectedIndex === index ? 'border-2 border-green-600' : ''}`}
                                        onClick={() => handleImageClick(img, index)}
                                    />
                                </Suspense>
                            ))}
                        </div>

                        {/* Modal Galeri */}
                        {modalIsOpen && (
                            <Modal
                                onClose={closeModal}
                                isOpen={openModal}
                                contentLabel={"Galeri"}
                                style={customStyles}
                            >
                                <div className="flex flex-col items-center">
                                    <button onClick={closeModal}
                                            className="hover:text-green-600 self-end">
                                        <IoMdCloseCircleOutline size={40}/></button>
                                    <div className="relative">
                                        <Suspense fallback={<LoadingCircle/>}>
                                            <LazyImage
                                                src={selectedImage ? selectedImage : product.images[0]}
                                                alt={`Selected Image ${selectedIndex + 1}`}
                                                width={800}
                                                height={800}
                                                className="rounded-lg mb-4 transition-transform duration-400 ease-in-out transform hover:scale-105"
                                            />
                                        </Suspense>
                                        <button onClick={handlePrevImage} className="absolute left-0 top-1/2 hover:text-green-600">
                                            <FaChevronLeft
                                                size={25}/></button>
                                        <button onClick={handleNextImage} className="absolute right-0 top-1/2 hover:text-green-600">
                                            <FaChevronRight
                                                size={25}/></button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {product.images.map((img, index) => (
                                            <Suspense key={index} fallback={<LoadingCircle/>}>
                                                <LazyImage
                                                    src={img}
                                                    alt={`Image ${index + 1}`}
                                                    loading="lazy"
                                                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${selectedIndex === index ? 'border-2 border-green-600' : ''}`}
                                                    onClick={() => handleImageClick(img, index)}
                                                />
                                            </Suspense>
                                        ))}
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
                        <p className="text-gray-700 mb-2 text-xs font-semibold">{product.description}</p>
                        <div className="flex gap-2 items-center pb-4 border-b-2">
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="#08ac0a"
                                starDimension="16px"
                                starSpacing="0.5px"
                                numberOfStars={5}
                            />
                            <p className="text-sm text-gray-700">({product.reviews.length})</p>
                        </div>

                        <div className="flex items-center py-4">
                            <span className="text-2xl font-medium">
                                ${Math.floor(product.price)}
                                <span
                                    className="text-sm align-text-bottom">{(product.price % 1).toFixed(2).toString().slice(1)}</span>
                            </span>
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
                            <button className="border border-gray-300 px-6 py-3 rounded-lg"
                                    onClick={handleAddToCart}>Add to Cart
                            </button>
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
