const loadWishlist = () => {
    console.log("boss")
    const token = localStorage.getItem("token")
    const sessionId = sessionStorage.getItem("sessionId");

    console.log(token)
    console.log(sessionId)
    fetch("https://cloth-store-backend.onrender.com/wishlist/items/")
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch wishlist items");
        }
        return res.json();
    })
    .then(data => {
        console.log("Wishlist data:", data);
        displayWishlist(data);
    })
    .catch(error => console.error("Error fetching wishlist items:", error));
}

const displayWishlist = (data) => {
    console.log(data)
    let htmlContent = "";
    data.forEach(product => {
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
    
    const parent = document.getElementById("wishlist-container");
    parent.innerHTML = `
    <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        ${htmlContent}
    </div>`;
}


// loadWishlist()

// const loadWishlist = () => {
//     fetch("https://cloth-store-backend.onrender.com/wishlist/items/")
//     .then(res => {
//         if (!res.ok) {
//             throw new Error("Failed to load wishlist: " + res.status);
//         }
//         return res.json();
//     })
//     .then(data => displayWishlist(data))
//     .catch(error => console.error("Error loading wishlist:", error));
// }

// const displayWishlist = (data) => {
//     let htmlContent = "";
//     data.forEach(product => {
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
    
//     // Check if parent element exists before setting inner HTML
//     const parent = document.getElementById("wishlist-container");
//     if (parent) {
//         parent.innerHTML = `
//         <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
//             ${htmlContent}
//         </div>`;
//     } else {
//         console.error("Parent element 'wishlist-container' not found.");
//     }
// }

// loadWishlist();


const addToWishlist = (productId) => {

    console.log(productId)
    const urlParams = new URLSearchParams(window.location.search);
    const product_id = urlParams.get('id');
    const wishlistData = {
        product_id: productId
    };

    fetch("https://cloth-store-backend.onrender.com/wishlist/add/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishlistData)
    })
    .then(response => {
        if (response.ok) {
            console.log("Product added to wishlist successfully.");
        } else {
            throw new Error("Failed to add product to wishlist");
        }
    })
    .catch(error => {
        console.error("Error adding product to wishlist:", error);
    });
};


loadWishlist()
