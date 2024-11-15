import {useDispatch, useSelector} from 'react-redux';
import {setFilter, setSearch, setSort} from '@/store/slices/filterSlice.js';
import {useEffect, useRef, useState} from "react";
import classNames from 'classnames';
import categories from "@/data/categories.js";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import {useRouter} from "next/router";
import {getLocal} from "@/utils/LocalStorage";
import {setCart} from "@/store/slices/cartSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const search = useSelector(state => state.filters.search);
    const items = useSelector((state) => state.cart.items);

    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
    const [isCategoryMobilOpen, setIsCategoryMobilOpen] = useState(false);
    const [isPriceRangeMobilOpen, setIsPriceRangeMobilOpen] = useState(false);
    const [animateBounce, setAnimateBounce] = useState(false);
    const [animatPing, setAnimatPing] = useState(false)
    const categoryRef = useRef(null);
    const priceRangeRef = useRef(null);
    const isHome = router.pathname === "/";

    const handleCategoryChange = (value) => {
        dispatch(setFilter({type: 'category', value: value}));
        setCategory(value);
    };

    const handlePriceRangeChange = (value) => {
        dispatch(setFilter({type: 'priceRange', value: value}));
    };

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value));
    };

    const handleInputChange = (e) => {
        dispatch(setSearch(e.target.value))

        if (router.pathname !== "/") {
            router.push("/");
        }
    };

    useEffect(() => {
        if (items.length > 0) {
            setAnimateBounce(true);
            setAnimatPing(true)

            // Animasyonun bitmesini bekleyip animasyonu kapat
            const timer = setTimeout(() => {
                setAnimateBounce(false);
            }, 430); // 1 saniye animasyonu sürdür

            return () => clearTimeout(timer);
        }
    }, [items.length]);

    useEffect(() => {
        const input = document.getElementById("search-input");
        if (input) input.focus();
    }, [router.pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (priceRangeRef.current && !priceRangeRef.current.contains(event.target)) {
                setIsPriceRangeOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="sticky top-0 z-50 bg-white border-b-2">
                <div className="max-w-7xl mx-auto flex items-center justify-between ">

                    <Link href="/" className="lg-desktop:flex hidden items-center">
                        <Image src="/logo.png" alt="Logo" width={250} height={200} className="lg-desktop:block hidden"
                               priority/>
                    </Link>
                    <Link href="/" className="lg-desktop:hidden flex items-center ms-8 my-3 text-green-800">
                        <FaOpencart size={40}/>
                    </Link>

                    {isHome && (
                        <div className="flex space-x-6">

                            <div className="lg-desktop:block hidden">
                                <select id="sort" onChange={handleSortChange}
                                        className=" border-2 bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5">
                                    <option className="pe-2" value="">Sort by</option>
                                    <option value="price-down">Price: Low to High</option>
                                    <option value="price-up">Price: High to Low</option>
                                    <option value="popularity">Popularity</option>
                                </select>
                            </div>

                            <div className="lg-desktop:flex justify-center hidden">
                                <button
                                    className="text-gray-700 font-semibold hover:text-green-600 relative"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                                    Categories
                                </button>
                            </div>

                            <div className="lg-desktop:flex justify-center hidden">
                                <button
                                    className="text-gray-700 font-semibold hover:text-green-600 relative"
                                    onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}>
                                    Price Range
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-1 space-x-2 w-64">
                        <input
                            id="search"
                            type="text"
                            placeholder="Search Product..."
                            className="bg-transparent focus:outline-none w-full text-md"
                            value={search}
                            onChange={handleInputChange}
                        />
                        <button>
                            <IoIosSearch size={25}/>
                        </button>
                    </div>

                    <div className="flex items-center space-x-6 me-4">
                        <Link href="/cart" target="_blank"
                              className={`relative flex items-center gap-2 border-2 py-1 px-2 border-gray-500 rounded-xl text-gray-700 hover:text-green-600 hover:border-green-600 ${animateBounce ? 'animate-bounce' : ''}`}>
                            <span className="absolute flex h-3 w-3 -top-1 -right-1">
                              <span className={`absolute h-full w-full rounded-full bg-green-600 opacity-75 ${animatPing ? 'animate-ping' : ''}`}></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>


                            Cart <FaOpencart/>
                        </Link>
                        <button
                            className="flex items-center gap-2 border-2 py-1 px-2 border-gray-500 rounded-xl text-gray-700 hover:text-green-600 hover:border-green-600">
                        Account <RiAccountPinCircleLine/>
                        </button>
                    </div>

                </div>

                {isCategoryOpen && (
                    <div ref={categoryRef}
                         className="hidden lg-desktop:grid desktop:grid-cols-5 tablet:grid-cols-3 phone:grid-cols-2 gap-3 p-4 scroll-auto absolute inset-x-1/4 justify-center border-2 border-t-0 rounded-t-none rounded-xl z-50 bg-white origin-top animate-open">
                        {categories.map((cat) => (
                            <div
                                key={cat.value}
                                className={classNames(
                                    'p-2 border rounded cursor-pointer',
                                    {'bg-green-600 text-white': category === cat.value.toLowerCase()}
                                )}
                                onClick={() => handleCategoryChange(cat.value.toLowerCase())}
                            >
                                <input
                                    type="radio"
                                    className="mr-2 hidden"
                                    checked={category === cat.value.toLowerCase()}
                                    onChange={() => handleCategoryChange(cat.value.toLowerCase())}
                                />
                                {cat.name}
                            </div>
                        ))}
                    </div>
                )}

                {isPriceRangeOpen && (
                    <div
                        ref={priceRangeRef}
                        className="hidden lg-desktop:block p-4 absolute phone:inset-x-6 laptop:inset-x-1/4 justify-center border-2 border-t-0 rounded-t-none rounded-xl z-50 bg-white origin-top animate-open"
                    >
                        <div className="p-2 border rounded cursor-pointer flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="border-2 rounded focus:outline-none focus:border-green-600"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="border-2 rounded focus:outline-none focus:border-green-600"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                            <button
                                onClick={() => handlePriceRangeChange(`${minPrice}-${maxPrice}`)}
                                className="ml-2 p-2 bg-blue-500 text-white rounded"
                            >
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    setMinPrice('');
                                    setMaxPrice('');
                                    handlePriceRangeChange('all');
                                }}
                                className="ml-2 p-2 bg-gray-500 text-white rounded"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {isHome && (
                <div className="flex items-center justify-center space-x-6 mt-5">
                    <div className="lg-desktop:hidden flex justify-center">
                        <button
                            className="text-gray-700 font-semibold hover:text-green-600 relative"
                            onClick={() => setIsCategoryMobilOpen(!isCategoryMobilOpen)}>
                            Categories
                        </button>
                    </div>

                    <div className="lg-desktop:hidden flex justify-center">
                        <button
                            className="text-gray-700 font-semibold hover:text-green-600 relative"
                            onClick={() => setIsPriceRangeMobilOpen(!isPriceRangeMobilOpen)}>
                            Price Range
                        </button>
                    </div>
                </div>
            )}

            {isCategoryMobilOpen && (
                isHome && (
                    <div ref={categoryRef}
                         className="lg-desktop:hidden grid grid-cols-2 phone:grid-cols-3 text-md text-center items-center gap-3 p-3 scroll-auto justify-center bg-white origin-top animate-open">
                        {categories.map((cat) => (
                            <div
                                key={cat.value}
                                className={classNames(
                                    'p-1 border rounded cursor-pointer',
                                    {'bg-green-600 text-white': category === cat.value.toLowerCase()}
                                )}
                                onClick={() => handleCategoryChange(cat.value.toLowerCase())}
                            >
                                <input
                                    type="radio"
                                    className="mr-2 hidden"
                                    checked={category === cat.value.toLowerCase()}
                                    onChange={() => handleCategoryChange(cat.value.toLowerCase())}
                                />
                                {cat.name}
                            </div>
                        ))}
                    </div>
                )
            )}
            {isPriceRangeMobilOpen && (
                isHome && (
                    <div
                        ref={priceRangeRef}
                        className="lg-desktop:hidden p-4 phone:inset-x-6 laptop:inset-x-1/4 justify-center bg-white origin-top animate-open">

                        <div className="p-2 border rounded cursor-pointer flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-full p-1 border-2 rounded focus:outline-none focus:border-green-600"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-full p-1 border-2 rounded focus:outline-none focus:border-green-600"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                            <button
                                onClick={() => handlePriceRangeChange(`${minPrice}-${maxPrice}`)}
                                className=" ml-2 p-2 bg-blue-500 text-white rounded"
                            >
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    setMinPrice('');
                                    setMaxPrice('');
                                    handlePriceRangeChange('all');
                                }}
                                className="ml-2 p-2 bg-gray-500 text-white rounded"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )
            )}
        </>
    );
}