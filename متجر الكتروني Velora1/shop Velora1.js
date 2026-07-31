const shopProducts = [
    {
        id: 1,
        name: "Linen Blend Sundress",
        image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
        rating: 5,
        price: "860 EGP"
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        image_url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80",
        rating: 5,
        price: "750 EGP"
    },
    {
        id: 3,
        name: "Shint Blend Skirt",
        image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
        rating: 5,
        price: "330 EGP"
    },
    {
        id: 4,
        name: "Sandals Skirt",
        image_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80",
        rating: 5,
        price: "240 EGP"
    },
    {
        id: 5,
        name: "Sandals Shorts",
        image_url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
        rating: 5,
        price: "220 EGP"
    },
    {
        id: 6,
        name: "Elegant Black Dress",
        image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
        rating: 5,
        price: "980 EGP"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderShopProducts(shopProducts);
    setupSearch();
});

function renderShopProducts(productsToDisplay) {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<p class="text-muted text-center w-100">No products found matching your search!</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-4'; // تقسيم العرض لثلاث أعمدة متساوية ومنظمة

        col.innerHTML = `
            <div class="product-card p-3 shadow-sm h-100 d-flex flex-column justify-content-between border border-secondary bg-dark">
                <div>
                    <img src="${product.image_url}" class="card-img-top mb-3 img-fluid" alt="${product.name}" style="height: 220px; object-fit: cover;">
                    <div class="product-details  text-start text-white text-uppercase" style="font-size: 0.8rem;">
                        <h6 class="fw-semibold text-truncate mb-1">${product.name}</h6>
                        <div class="rating mb-1 text-gold" style="color: #d1b86c;">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                        <p class="price fw-bold text-white mb-2" style="font-size: 1rem;">${product.price}</p>
                    </div>
                </div>
                
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-velora-gold w-75 fw-bold text-dark rounded-0" style="background-color: #d1b86c;" onclick="addToCart('${product.name}')">
                       Add to Cart
                    </button>
                    <button class="btn btn-outline-warning w-25 rounded-0" style="border-color: #d1b86c; color: #d1b86c;" onclick="addToWishlist('${product.name}', '${product.price}', '${product.image_url}')" title="أضف للمفضلة">
                       <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function addToCart(productName) {
    alert(`Added to Cart: ${productName} Successfully`);
}

// دالة إضافة المنتج للمفضلة والانتقال الفوري لصفحتها
function addToWishlist(productName, productPrice, productImg) {
    let wishlist = JSON.parse(localStorage.getItem('veloraWishlist')) || [];
    
    const exists = wishlist.some(item => item.name === productName);
    if (!exists) {
        wishlist.push({ name: productName, price: productPrice, image: productImg });
        localStorage.setItem('veloraWishlist', JSON.stringify(wishlist));
    }
    
    window.location.href = 'wishlist Velora.html';
}

// دالة البحث المباشر في صفحة المتجر
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            const filteredProducts = shopProducts.productsToDisplay || shopProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            
            renderShopProducts(filteredProducts);
        });
    }
}

    document.addEventListener("DOMContentLoaded", function() {
        // نختار كل كروت المنتجات في الصفحة
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // جعل كارت المنتج بأكمله قابلاً للنقر وتغيير شكل الماوس ليد
            card.style.cursor = 'pointer';

            card.addEventListener('click', function(e) {
                // منع الضغط إذا كان المستخدم يضغط على زر "Add to Cart" أو "Wishlist" لكي لا ينتقل بالغلط
                if (e.target.closest('button')) return;

                // استخراج بيانات المنتج من داخل الكارت الحالي تلقائياً
                const nameElement = card.querySelector('h6, h5, .product-title');
                const priceElement = card.querySelector('.price');
                const imgElement = card.querySelector('img');

                const name = nameElement ? nameElement.innerText.trim() : 'Product Name';
                const price = priceElement ? priceElement.innerText.trim() : '0 EGP';
                const image = imgElement ? imgElement.src : '';

                // حفظ البيانات في الذاكرة والانتقال لصفحة التفاصيل
                const product = { name: name, price: price, image: image };
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                
                window.location.href = 'product-details Velora1.html';
            });
        });
    });
