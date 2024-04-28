const products = () => {
    fetch("https://cloth-store-backend.onrender.com/products/")
    .then((res) => res.json())
    .then((data) => displayProduct(data))
    .catch((err) => console.log(err));
    console.log('loded')
  };

//  const displayProduct = (products) =>{
//     console.log(products)
//     products.forEach(product => {
//         const parent = document.getElementById("Product-container")
//         // const li = document.createElement("div");
//         parent.innerHTML = `
//         <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
//         <div class="card w-72 bg-base-100 shadow-xl ">
//             <figure><img src="${product.image}" alt="Shoes" /></figure>
//             <div class="card-body">
//               <h2 class="card-title">${product.name}</h2>
//               <p>If a dog chews shoes whose shoes does he choose?</p>
//               <div class="card-actions justify-end">
//                 <button class="btn btn-primary">Buy Now</button>
//               </div>
//             </div>
//         </div>
        
//     </div>
//         `;
//         // parent.appendChild(li)
//     });
//  }

const displayProduct = (products) => {
    console.log(products)
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
    
    // Set the accumulated HTML content to the parent element
    const parent = document.getElementById("Product-container");
    parent.innerHTML = `
    <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        ${htmlContent}
    </div>`;
};


const redirectToDetails = (product_id) => {
    console.log(product_id)
    window.location.href = `/details.html?id=${product_id}`;
}


const loadDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const product_id = urlParams.get('id');
    if (product_id){
        fetch(`https://cloth-store-backend.onrender.com/products/${product_id}`)
        .then(res => res.json())
        .then(data => {
            showDetails(data);
            const productName = data.name;
            loadReview(productName)
        })
        .catch(err => console.log(err));
    }
}


const showDetails = (data) => {
    let htmlContent = "";
    htmlContent = `
        
        <div class="hero-content flex-col lg:flex-row">
            <img src="${data.image}" class="max-w-sm rounded-lg shadow-2xl" />
            <div class="py-2">
                <h2 class="pb-2 text-3xl">${data.name}</h2>
                <p class="pb-2">${data.description}</p>
                <h1 class="pb-2">Size: ${data.size}</h1>
                <h1 class="pb-2">Color: ${data.color}</h1>
                <h1 class="pb-2">Price: ${data.price}</h1>
                <button class="btn btn-primary" onclick="addToWishlist(${data.id})">Add Wishlist</button>
            </div>
        </div>
            
    `;
    const parent = document.getElementById("details-card");
    parent.innerHTML = `
        <div class="flex sm:flex-nowrap flex-wrap justify-center">
            ${htmlContent}
        </div>

        
    `;

}



const loadReview = (product_name) => {
    fetch(`https://cloth-store-backend.onrender.com/reviews/`)
    .then(res => res.json())
    .then(data => {
        const reviews = data.filter(review => review.product === product_name);
        displayReview(reviews);
    })
}

const displayReview = (reviews) => {

    console.log(reviews)
    let htmlContent = "";

    reviews.forEach(review => {
        htmlContent += `
        <div class="card-body">
            <h2 class="card-title">${review.user}</h2>
            <small>Created on : ${review.created}</small>
            <p>Rating: ${review.rating}</p>
            <p>${review.body}</p>
        </div>
        `;
    });

    const parent = document.getElementById("review-container");
    parent.innerHTML = `
        <h1 class="text-2xl text-center mt-12 mb-3">Review</h1>
        <hr class="w-2/4 mx-auto mb-5">
        <div class="card w-full bg-base-100 shadow-xl">
            ${htmlContent}
        </div>
    `
}



// for submit review 
function setupReviewForm() {
    document.addEventListener("DOMContentLoaded", function() {
        const reviewForm = document.getElementById("review-form");
        if (reviewForm) {
            reviewForm.addEventListener("submit", function(event) {
                event.preventDefault(); 

                const formData = new FormData(this); 

                
                const rating = convertToStars(parseInt(formData.get("rating")));

                const reviewData = {
                    user: formData.get("user"),
                    rating: rating,
                    body: formData.get("body"),
                    product: getProductIdFromUrl() 
                };

                
                fetch("https://cloth-store-backend.onrender.com/reviews/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reviewData)
                })
                .then(response => {
                    if (response.ok) {
                        
                        loadReview(reviewData.product);
                        reviewForm.reset(); 
                    } else {
                        throw new Error("Failed to post review");
                        
                    }
                })
                .catch(error => {
                    console.error("Error posting review:", error);
                });
            });
        } else {
            console.error("Review form not found in the document.");
        }
        function getProductIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id');
        }
        function convertToStars(rating) {
            let stars = '⭐'.repeat(rating);
            return stars;
        }
    });
}



setupReviewForm();




products()
loadDetails()