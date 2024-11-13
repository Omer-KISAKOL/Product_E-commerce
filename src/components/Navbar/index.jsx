import {useDispatch, useSelector} from 'react-redux';
import {setFilter, setSearch, setSort} from '@/store/slices/filterSlice.js';
import {useState} from "react";
import classNames from 'classnames';
import categories from "@/data/categories.js";

export default function Navbar() {
    const dispatch = useDispatch();
    const search = useSelector(state => state.filters.search);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');


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

    return (
        <>
            <div>

                <div>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </div>

                <div>
                    <h3>Sort by</h3>
                    <select id="sort" onChange={handleSortChange}>
                        <option value="">All</option>
                        <option value="price-down">Price: Low to High</option>
                        <option value="price-up">Price: High to Low</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>

                <div>
                    <h3>Category</h3>
                    <div className="grid grid-cols-5 gap-3">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                className={classNames(
                                    'your-base-styles',
                                    { 'bg-blue-500 text-white': category === cat.toLowerCase() }
                                )}
                                onClick={() => handleCategoryChange(cat.toLowerCase())}
                            >
                                <input
                                    type="radio"
                                    checked={category === cat.toLowerCase()}
                                    onChange={() => handleCategoryChange(cat.toLowerCase())}
                                />
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Price Range</h3>
                    <div className="grid grid-cols-5 ">
                        {['All', '0-100', '100-200', '200-500', '500-1000'].map((range) => (
                            <div
                                key={range}
                                className={classNames(
                                    'your-base-styles',
                                    { 'bg-blue-500 text-white': priceRange === range.toLowerCase() }
                                )}
                                onClick={() => handlePriceRangeChange(range.toLowerCase())}
                            >
                                <input
                                    type="radio"
                                    checked={priceRange === range.toLowerCase()}
                                    onChange={() => handlePriceRangeChange(range.toLowerCase())}
                                />
                                ${range.split('-').join(' - $')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}