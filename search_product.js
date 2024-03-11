// const searchproducts = (color = "", size = "") => {
//     let url = "https://cloth-store-backend.onrender.com/products/";

//     if (color) {
//         url += `?color=${color}`;
//     }
//     if (size) {
//         url += `${color ? "&" : "?"}size=${size}`;
//     }

//     fetch(url)
//     .then((res) => res.json())
//     .then((data) => displaysearchProduct(data))
//     .catch((err) => console.log(err));
// };

// const filterProducts = () => {
//     const colorFilter = document.getElementById("filter-by-color").value;
//     const sizeFilter = document.getElementById("filter-by-size").value;
//     searchproducts(colorFilter, sizeFilter);
// };

// // Event listener for filter button
// document.getElementById("filter-btn").addEventListener("click", filterProducts);
// const displaysearchProduct = (products) => {
//     console.log(products)
//     let htmlContent = ""; // Initialize an empty string to accumulate HTML content
    
//     products.forEach(product => {
//         htmlContent += `
//         <div class="card w-72 bg-base-100 shadow-xl ">
//             <figure><img src="${product.image}" alt="${product.name}" /></figure>
//             <div class="card-body">
//               <h2 class="card-title">${product.name}</h2>
//               <h2 class="card-title">Color : ${product.color}</h2>
//               <h2 class="card-title">Size : ${product.size}</h2>
//               <h2 class="card-title">price : ${product.price}</h2>
//               <div class="card-actions justify-end">
//                 <button class="btn btn-primary" onclick="redirectToDetails(${product.id})">Details</button>
//               </div>
//             </div>
//         </div>`;
//     });
    
//     // Set the accumulated HTML content to the parent element
//     const parent = document.getElementById("Product-container");
//     parent.innerHTML = `
//     <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
//         ${htmlContent}
//     </div>`;
// };


// searchproducts()


const searchProducts = () => {
    fetch("https://cloth-store-backend.onrender.com/products/")
        .then((res) => res.json())
        .then((data) => {
            const filteredProducts = applyFilters(data);
            displaySearchProduct(filteredProducts);
        })
        .catch((err) => console.log(err));
};

const applyFilters = (products) => {
    const selectedSize = document.getElementById("filter-by-size").value;
    const selectedColor = document.getElementById("filter-by-color").value;

    if (!selectedSize && !selectedColor) {
        return products; // No filters applied, return all products
    }

    return products.filter(product => {
        if (selectedSize && selectedColor) {
            return product.size === selectedSize && product.color === selectedColor;
        } else if (selectedSize) {
            return product.size === selectedSize;
        } else if (selectedColor) {
            return product.color === selectedColor;
        }
    });
};

const displaySearchProduct = (products) => {
    const parent = document.getElementById("Product-container");
    if (products.length === 0) {
        parent.innerHTML = "<p>No products found</p>";
        return;
    }

    let htmlContent = "";
    products.forEach(product => {
        htmlContent += `
        <div class="card w-72 bg-base-100 shadow-xl ">
            <figure><img src="${product.image}" alt="${product.name}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${product.name}</h2>
              <h2 class="card-title">Color : ${product.color}</h2>
              <h2 class="card-title">Size : ${product.size}</h2>
              <h2 class="card-title">price : ${product.price}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" onclick="redirectToDetails(${product.id})">Details</button>
              </div>
            </div>
        </div>`;
    });

    parent.innerHTML = `
    <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        ${htmlContent}
    </div>`;
};

const filterButton = document.getElementById("filter-btn");
filterButton.addEventListener("click", searchProducts);

searchProducts()

