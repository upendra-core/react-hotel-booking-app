const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  //console.log("Fetched products:", data.products);

  /**
   * Convert API response
   * into UI-friendly structure
   */
  return data.products.map(product => ({

    id: product.id,

    // existing UI expects "name"
    name: product.title,

    category: product.category,

    price: product.price,

    // extra optional fields
    image: product.thumbnail,

    description: product.description

  }));

}

