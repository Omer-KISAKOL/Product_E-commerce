export const filterProducts = (products, {category, priceRange}, sort, search, discountSort, stockSort, addedDateSort, brand) => {
    if (!products?.length) return [];

    let filtered = [...products];

    if (search) {
        filtered = filtered.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category && category !== "all") {
        filtered = filtered.filter((product) => product.category === category);
    }

    if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        filtered = filtered.filter((product) =>
            max ? product.price >= min && product.price <= max : product.price >= min
        );
    }

    if (brand && brand !== "") {
        filtered = filtered.filter((product) => product.brand === brand);  // Filter products by brand
    }

    if (discountSort) {
        filtered = filtered.sort((a, b) => {
            switch (discountSort) {
                case "discount-up":
                    return a.discountPercentage - b.discountPercentage;
                case "discount-down":
                    return b.discountPercentage - a.discountPercentage;
                default:
                    return 0;
            }
        });
    }

    if (stockSort) {
        filtered = filtered.sort((a, b) => {
            switch (stockSort) {
                case "stock-up":
                    return a.stock - b.stock; // Ascending stock
                case "stock-down":
                    return b.stock - a.stock; // Descending stock
                default:
                    return 0;
            }
        });
    }

    if (addedDateSort) {
        filtered = filtered.sort((a, b) => {
            switch (addedDateSort) {
                case "newest":
                    return new Date(b.meta.createdAt) - new Date(a.meta.createdAt); // Newest first
                case "oldest":
                    return new Date(a.meta.createdAt) - new Date(b.meta.createdAt); // Oldest first
                default:
                    return 0;
            }
        });
    }

    return filtered.sort((a, b) => {
        switch (sort) {
            case "price-down":
                return a.price - b.price;
            case "price-up":
                return b.price - a.price;
            case "popularity":
                return  b.rating - a.rating;
            default:
                return 0;
        }
    });
};
