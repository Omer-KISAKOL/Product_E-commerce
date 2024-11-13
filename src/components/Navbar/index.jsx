import {useDispatch, useSelector} from 'react-redux';
import {setFilter, setSearch, setSort} from '@/store/slices/filterSlice.js';
import {useEffect, useRef, useState} from "react";
import classNames from 'classnames';
import categories from "@/data/categories.js";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";

export default function Navbar() {
    const dispatch = useDispatch();
    const search = useSelector(state => state.filters.search);

    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);
    const categoryRef = useRef(null);
    const priceRangeRef = useRef(null);


    const handleCategoryChange = (value) => {
        dispatch(setFilter({type: 'category', value: value}));
        setCategory(value);
    };

    const handlePriceRangeChange = (value) => {
        dispatch(setFilter({type: 'priceRange', value: value}));
        setPriceRange(value);
    };

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value));
    };

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

                <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={250} height={200} className=""/>
                </div>

                <div className="flex space-x-6">

                    <div>
                        <select id="sort" onChange={handleSortChange}>
                            <option value="">Sort by</option>
                            <option value="price-down">Price: Low to High</option>
                            <option value="price-up">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="text-gray-700 font-semibold hover:text-green-600 relative"
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                            Categories
                        </button>
                    </div>

                    <div>
                        <button
                            className="text-gray-700 font-semibold hover:text-green-600 relative"
                            onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}>
                            Price Range
                        </button>
                    </div>
                </div>

                <div className="flex items-center bg-gray-100 rounded-full px-4 py-1 space-x-2 w-64">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search Product..."
                        className="bg-transparent focus:outline-none w-full text-sm text-gray-700"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                    <button>
                        <IoIosSearch className="w-6 h-6"/>
                    </button>
                </div>

                <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-700 hover:text-green-600">

                        Account
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-green-600">

                        Cart
                    </button>
                </div>

            </div>

            {isCategoryOpen && (
                <div ref={categoryRef} className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-4 absolute inset-x-1/4 justify-center border-2 border-t-0 rounded-t-none rounded-xl z-50 bg-white origin-top animate-open">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            className={classNames(
                                'p-2 border rounded cursor-pointer',
                                {'bg-blue-500 text-white': category === cat.toLowerCase()}
                            )}
                            onClick={() => handleCategoryChange(cat.toLowerCase())}
                        >
                            <input
                                type="radio"
                                className="mr-2 hidden"
                                checked={category === cat.toLowerCase()}
                                onChange={() => handleCategoryChange(cat.toLowerCase())}
                            />
                            {cat}
                        </div>
                    ))}
                </div>
            )}

            {isPriceRangeOpen && (
                <div ref={priceRangeRef} className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-4 absolute inset-x-1/4 justify-center border-2 border-t-0 rounded-t-none rounded-xl z-50 bg-white origin-top animate-open">
                    {['All', '0-100', '100-200', '200-500', '500-1000'].map((range) => (
                        <div
                            key={range}
                            className={classNames(
                                'p-2 border rounded cursor-pointer',
                                {'bg-blue-500 text-white': priceRange === range.toLowerCase()}
                            )}
                            onClick={() => handlePriceRangeChange(range.toLowerCase())}
                        >
                            <input
                                type="radio"
                                className="mr-2 hidden"
                                checked={priceRange === range.toLowerCase()}
                                onChange={() => handlePriceRangeChange(range.toLowerCase())}
                            />
                            ${range.split('-').join(' - $')}
                        </div>
                    ))}
                </div>
            )}

        </div>

</>
    );
}