module.exports = {
    siteUrl: 'https://product-e-commerce-omerkisakol.vercel.app',
    generateRobotsTxt: true,
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    exclude: [],
    sitemapSize: 5000,
    transform: async (config, path) => {
        return {
            loc: path, // URL
            changefreq: config.changefreq,
            priority: path === '/' ? 1 : 0.7,
            lastmod: new Date().toISOString(),
        };
    },
    additionalPaths: async (config) => {
        const productSlugs = ['product1', 'product2', 'product3'];
        return productSlugs.map((slug) => ({
            loc: `/product?id=${slug}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));
    },
};