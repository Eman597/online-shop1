const newArrivalsData = [
    {
        id: 1,
        name: "Linen Blend Sundress",
        image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
        rating: 5,
        price: "870EGP"
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        image_url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80",
        rating: 5,
        price: "740EGP"
    },
    {
        id: 3,
        name: "Shint Blend Skirt",
        image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
        rating: 5,
        price: "290EGP"
    }
];

// دالة عرض المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    generateProductGrid(newArrivalsData);
    setupSearch();
});

// دالة رسم شبكة المنتجات بجانب بعضها بشكل منظم
function generateProductGrid(productsToDisplay) {
    const productGrid = document.getElementById('product-grid');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = ''; 
    
    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = '<p class="text-muted w-100 text-center">لا توجد منتجات تطابق بحثك</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-4'; // بيخلي كل 3 منتجات جنب بعض بشكل متساوي
        
        colDiv.innerHTML = `
            <div class="product product-card p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                    <img src="${product.image_url}" class="card-img-top mb-3 img-fluid" alt="${product.name}" style="height: 250px; object-fit: cover;">
                    <div class="product-details text-start text-white text-uppercase" style="font-size: 0.85rem;">
                        <h6 class="product-name fw-semibold text-truncate mb-1">${product.name}</h6>
                        <div class="rating mb-1 text-gold">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                        <p class="price fw-bold text-white mb-2" style="font-size: 1.1rem;">${product.price}</p>
                    </div>
                </div>
                
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-velora-gold w-75" onclick="addToCart('${product.name}')">
                       Add to Cart
                    </button>
                    <button class="btn btn-outline-warning w-25" onclick="addToWishlist('${product.name}', '${product.price}', '${product.image_url}')" title="إضافة للمفضلة">
                       <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(colDiv);
    });
}

// دالة رسالة الإضافة للسلة
function addToCart(productName) {
    alert(`Added to Cart: ${productName} successfully!`);
}

// دالة إضافة المنتج للمفضلة والانتقال لصفحتها تلقائياً
function addToWishlist(productName, productPrice, productImg) {
    let wishlist = JSON.parse(localStorage.getItem('veloraWishlist')) || [];
    
    const exists = wishlist.some(item => item.name === productName);
    if (!exists) {
        wishlist.push({ name: productName, price: productPrice, image: productImg });
        localStorage.setItem('veloraWishlist', JSON.stringify(wishlist));
    }
    
    window.location.href = 'wishlist Velora.html';
}

// دالة البحث المباشر
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            const filteredProducts = newArrivalsData.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            
            generateProductGrid(filteredProducts);
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
