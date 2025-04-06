// Ensure this URL points to your running backend server
const BACKEND_URL = "https://edge-clothing.onrender.com"; // Or whatever port your backend runs on

/**
 * Displays the fetched products in the results container.
 * @param {Array} products - An array of product objects from the backend.
 */
function redirectToProduct(productId) {
    console.log("Redirecting to product page with ID:", productId);
    window.open(`../product/p.html?id=${productId}`, '_blank'); 
}
function displayProducts(products) {
    const container = document.getElementById("results-container");
    console.log("Container:", container); 
    console.log("display function called"); // Debugging line to check if products are fetched correctly
    // Debugging line to check if container is found
    if (!container) {
        console.error("Error: Results container element not found in search.html");
        return;
    }

    container.innerHTML = ""; // Clear the "Loading..." text or previous results

    if (!products || products.length === 0) {
        container.innerHTML = "<p>No products found matching your query.</p>";
        return;
    }

    // Loop through each product and create HTML elements to display it
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item"); // Add class for styling

        // --- Customize this part based on your actual Product model ---
        // Assuming your product has fields like title, description, price, image
        let imageHTML = '';
        if (product.image1) { // Check if an image URL exists
            // You might need to adjust the image path if it's not a full URL
            // e.g., imageHTML = `<img src="${BACKEND_URL}/${product.image}" alt="${product.title}">`;
            imageHTML = `<img  onclick="redirectToProduct('${product._id}')" src="${product.image1}" alt="${product.name}">`;
        }

        productElement.innerHTML = `
            ${imageHTML}
            <h2  onclick="redirectToProduct('${product._id}')">${product.name || 'No Title'}</h2>
          
            <p  onclick="redirectToProduct('${product._id}')"><strong>Price:</strong> ₹${product.price !== undefined ? product.price.toFixed(2) : 'N/A'}</p>
             <p  onclick="redirectToProduct('${product._id}')"><small>Attire: ${product.attire_type || 'N/A'}, Type: ${product.clothing_type || 'N/A'}</small></p>
             <div style="clear:both;"  onclick="redirectToProduct('${product._id}')"></div> 
        `;
        // --- End customization ---

        container.appendChild(productElement);
    });
}

// Run this code when the page content is loaded
window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q"); // Get the search query from the URL (?q=...)

    const resultsTitle = document.querySelector('h1'); // Get the H1 tag

    if (query) {
        if (resultsTitle) {
             resultsTitle.textContent = `Search Results for "${query}"`; // Update title
        }
        const container = document.getElementById("results-container");
        if (container) container.innerHTML = `<p>Searching for "${query}"...</p>`; // Show searching message

        try {
            // Fetch data from your backend search endpoint
            const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                 // Try to get more specific error from backend response body
                 let errorMsg = `Search failed: Server returned status ${response.status}`;
                 try {
                     const errorData = await response.json();
                     errorMsg += ` - ${errorData.error || 'Unknown server error'}`;
                 } catch (e) { /* Ignore if response is not JSON */ }
                 throw new Error(errorMsg);
            }

            const products = await response.json(); // Parse the JSON response
            displayProducts(products);          // Display the products

        } catch (error) {
            console.error("Error fetching search results:", error);
            const container = document.getElementById("results-container");
             if (container) {
                // Display a user-friendly error message
                container.innerHTML = `<p>Sorry, couldn't load search results. ${error.message}</p>`;
             }
        }
    } else {
        if (resultsTitle) {
            resultsTitle.textContent = `Search Results`;
        }
        const container = document.getElementById("results-container");
        if (container) {
            container.innerHTML = "<p>Please enter a search term in the navigation bar.</p>";
        }
        console.log("No search query (q) found in URL.");
    }
});