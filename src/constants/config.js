export const API_CONFIG = {
  BASE_URL: " https://dummyjson.com",
  ENDPOINTS: {
    PRODUCTS: "/products?limit=200",
  },
  CACHE_TIME: 1000 * 60 * 5, // 5 minutes
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
};

export const UI_CONFIG = {
  ITEMS_PER_PAGE: 20,
  GRID_BREAKPOINTS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LG_DESKTOP: 4,
  },
  LOADING_STATES: {
    INITIAL: "Loading products...",
    ERROR: "Error loading products. Please try again.",
  },
};