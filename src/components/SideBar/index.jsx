import {useEffect, useRef} from "react";
import classNames from "classnames";
import brands from "@/data/brands.js";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {setDiscountSort, setStockSort, setAddedDateSort, setBrand, setSort} from "@/store/slices/filterSlice.js";
import { GiCheckMark } from "react-icons/gi";

export default function SideBar({ isOpen, onClose }) {
    const sidebarRef = useRef();
    const dispatch = useDispatch();
    const discountSort = useSelector((state) => state.filters.discountSort);
    const stockSort = useSelector((state) => state.filters.stockSort);
    const addedDateSort = useSelector((state) => state.filters.addedDateSort);

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value));
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={sidebarRef}
            className={classNames(
                "fixed left-0 top-20 h-full w-72 scroll-auto bg-white shadow-lg py-4 px-6 z-50 transition-transform ",
                {
                    "-translate-x-full": !isOpen,
                    "translate-x-0": isOpen,
                }
            )}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg flex items-center">Filtreler</h2>
                <button onClick={onClose}><IoMdCloseCircleOutline/></button>
            </div>

            <div className="lg-desktop:hidden block mb-4 ">
                <select id="sort" onChange={handleSortChange}
                        className=" border-2 bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5">
                    <option className="pe-2" value="">Sort by</option>
                    <option value="price-down">Price: Low to High</option>
                    <option value="price-up">Price: High to Low</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>

            <div className="mb-4 ">
                <h3 className="font-medium text-md">Markaya Göre</h3>
                <select className="w-full mt-2 border border-gray-300 rounded-md p-2"
                        onChange={(e) => dispatch(setBrand(e.target.value))}>
                    <option value="">Tüm Markalar</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 border-b-2">
                <h3 className="font-medium text-sm">İndirim Oranına Göre</h3>
                <button
                    className={`mt-1 text-left flex items-center ${!discountSort ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setDiscountSort(''))}
                >
                    Tümü
                    <span className={`ml-2 ${!discountSort ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${discountSort === 'discount-up' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setDiscountSort('discount-up'))}>
                    Artan
                    <span className={`ml-2 ${discountSort === 'discount-up' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${discountSort === 'discount-down' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setDiscountSort('discount-down'))}>
                    Azalan
                    <span className={`ml-2 ${discountSort === 'discount-down' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
            </div>

            <div className="mb-4 border-b-2">
                <h3 className="font-medium text-sm">Stok Durumuna Göre</h3>
                <button
                    className={`mt-1 text-left flex items-center ${!stockSort ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setStockSort(''))}
                >
                    Tümü
                    <span className={`ml-2 ${!stockSort ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${stockSort === 'stock-up' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setStockSort('stock-up'))}>
                    Artan
                    <span className={`ml-2 ${stockSort === 'stock-up' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${stockSort === 'stock-down' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setStockSort('stock-down'))}>
                    Azalan
                    <span className={`ml-2 ${stockSort === 'stock-down' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
            </div>

            <div className="mb-4 border-b-2">
                <h3 className="font-medium text-sm">Eklenme Tarihine Göre</h3>
                <button
                    className={`mt-1 text-left flex items-center ${!addedDateSort ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setAddedDateSort(''))}>
                    Tümü
                    <span className={`ml-2 ${!addedDateSort ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${addedDateSort === 'newest' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setAddedDateSort('newest'))}>
                    En Yeni
                    <span className={`ml-2 ${addedDateSort === 'newest' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
                <button
                    className={`mt-1 text-left flex items-center ${addedDateSort === 'oldest' ? "text-green-600" : "text-black"}`}
                    onClick={() => dispatch(setAddedDateSort('oldest'))}>
                    En Eski
                    <span className={`ml-2 ${addedDateSort === 'oldest' ? "inline text-green-600" : "hidden"}`}>
                        <GiCheckMark/>
                    </span>
                </button>
            </div>

        </div>
    );
}