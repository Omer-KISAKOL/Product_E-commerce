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
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiCheckMark } from "react-icons/gi";
import {useRouter} from "next/router";
import Head from "next/head";
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
        maxWidth: '800px',
        maxHeight: '600px',
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
    const [animateBounce, setAnimateBounce] = useState(false)
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const router = useRouter();

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
        setAnimateBounce(true);

        const timer = setTimeout(() => {
            setAnimateBounce(false);
        }, 1000);

        return () => clearTimeout(timer);

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

    if (!product) return <div className="w-dvw min-h-dvh flex justify-center items-center"><LoadingCircle/></div>;
    if (router.isFallback) {
        return <div className="w-dvw min-h-dvh flex justify-center items-center"><LoadingCircle/></div>;
    }
    return (
        <>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description}/>
                <meta property="og:title" content={product.title}/>
                <meta property="og:description" content={product.description}/>
                <meta name="keywords" content={`${product.category}, ${product.brand}`}/>
            </Head>

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
                                width={400}
                                height={400}
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
                                                width={400}
                                                height={400}
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

                        <div className="flex items-center gap-14 py-4">
                            <span className="text-2xl font-medium">
                                ${Math.floor(product.price)}
                                <span
                                    className="text-sm align-text-bottom">{(product.price % 1).toFixed(2).toString().slice(1)}</span>
                            </span>
                            <span
                                className="text-sm text-green-900 bg-green-100 py-2 px-4 rounded-lg ml-2">Discount: {product.discountPercentage}%</span>
                            <button
                                className="flex items-center gap-2 border-2 py-2 px-4 bg-green-600 border-green-600 rounded-3xl text-white hover:text-green-600 hover:border-green-600 hover:bg-white"
                                onClick={handleAddToCart}>
                                Add to Cart
                                {animateBounce && (<GiCheckMark size={18}/>) }
                            </button>
                        </div>

                        <div className="text-[#fa0000] mb-4">Only {product.stock} Items Left!</div>

                        <div className="text-sm mb-2 flex items-center gap-2"><LiaShippingFastSolid size={20}/>{product.shippingInformation}</div>


                        <div className="grid grid-cols-1 gap-x-4">
                            <div className="flex items-center py-2 px-4 bg-gray-100">
                                <span className="font-semibold w-1/2">Brand:</span>
                                <span className="w-1/2">{product.brand}</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-white">
                                <span className="font-semibold w-1/2">Availability:</span>
                                <span className="w-1/2">{product.availabilityStatus}</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-gray-100">
                                <span className="font-semibold w-1/2">Dimensions:</span>
                                <span className="w-1/2">
                                    <p>{product.dimensions.depth} - {product.dimensions.height} - {product.dimensions.width} cm</p>
                                </span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-white">
                                <span className="font-semibold w-1/2">Weight:</span>
                                <span className="w-1/2">{product.weight} g</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-gray-100">
                                <span className="font-semibold w-1/2">Minimum Order Quantity:</span>
                                <span className="w-1/2">{product.minimumOrderQuantity}</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-white">
                                <span className="font-semibold w-1/2">Warranty:</span>
                                <span className="w-1/2">{product.warrantyInformation}</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-gray-100">
                                <span className="font-semibold w-1/2">SKU:</span>
                                <span className="w-1/2">{product.sku}</span>
                            </div>
                            <div className="flex items-center py-2 px-4 bg-white">
                                <span className="font-semibold w-1/2">Barcode:</span>
                                <span className="w-1/2">{product.meta.barcode}</span>
                            </div>
                            <div className="mt-6 space-y-2">
                                <p className="text-sm text-gray-500">{product.returnPolicy}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="bg-gray-100 py-3 px-5 rounded-2xl max-w-lg">
                                <div className="font-medium flex items-center gap-2 text-sm">
                                    <StarRatings
                                        rating={review.rating}
                                        starRatedColor="#08ac0a"
                                        starDimension="16px"
                                        starSpacing="0.5px"
                                        numberOfStars={5}
                                    />
                                    <p className="text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                    <span>|</span>
                                    <p>{review.reviewerName}</p>
                                </div>

                                <p className="mt-2">{review.comment}</p>
                            </div>))}
                    </div>
                </div>
            </div>

        </div>

        </>
    );
}
