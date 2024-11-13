export const filterProducts = (products, {category, priceRange}, sort, search) => {
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
