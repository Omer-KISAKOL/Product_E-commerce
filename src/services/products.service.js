import { API_CONFIG } from "../constants/config";

class ProductsService {
  static #instance = null;
  #baseURL = API_CONFIG.BASE_URL;

  static getInstance() {
    if (!ProductsService.#instance) {
      ProductsService.#instance = new ProductsService();
    }
    return ProductsService.#instance;
  }

  async fetchProducts() {
    try {
      const response = await fetch(
          `${this.#baseURL}${API_CONFIG.ENDPOINTS.PRODUCTS}`
      );
      console.log('Fetch işlemi yapıldı!!!')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw new Error("Failed to load products. Please try again later.");
    }
  }
}

export const productsService = ProductsService.getInstance();
