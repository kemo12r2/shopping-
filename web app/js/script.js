$(document).ready(function () {
    // Simulated product data with stock (increased to 15 products)
    const products = [
        { id: 1, name: "تيشيرت رياضي", price: 150, category: "mostsales", stock: 10, images: ["img/1.jpg", "img/2.jpg"], description: "تيشيرت مريح للرياضة", reviews: [{ user: "أحمد", rating: 5, comment: "ممتاز!" }, { user: "محمد", rating: 4, comment: "جيد جدًا" }] },
        { id: 2, name: "حذاء جري", price: 300, category: "features", stock: 5, images: ["img/4.jpg", "img/5.jpg"], description: "حذاء خفيف ومريح", reviews: [{ user: "علي", rating: 4, comment: "مريح جدًا" }] },
        { id: 3, name: "ساعة ذكية", price: 500, category: "news", stock: 8, images: ["img/6.jpg", "img/7.jpg"], description: "ساعة ذكية متعددة الوظائف", reviews: [{ user: "خالد", rating: 5, comment: "رائعة!" }] },
        { id: 4, name: "سماعة بلوتوث", price: 200, category: "discounts", stock: 15, images: ["img/8.jpg", "img/9.jpg"], description: "سماعة لاسلكية عالية الجودة", reviews: [{ user: "سامي", rating: 3, comment: "جيدة ولكن الصوت متوسط" }] },
        { id: 5, name: "حقيبة ظهر", price: 250, category: "mostsales", stock: 12, images: ["img/11.jpg", "img/12.jpg"], description: "حقيبة ظهر عملية", reviews: [{ user: "يوسف", rating: 5, comment: "متينة جدًا" }] },
        { id: 6, name: "جاكيت شتوي", price: 400, category: "news", stock: 7, images: ["img/1.jpg", "img/2.jpg"], description: "جاكيت دافئ وعصري", reviews: [{ user: "زيد", rating: 4, comment: "مريح جدًا" }] },
        { id: 7, name: "نظارة شمسية", price: 180, category: "features", stock: 20, images: ["img/4.jpg", "img/5.jpg"], description: "نظارة أنيقة مع حماية UV", reviews: [{ user: "رامي", rating: 5, comment: "تصميم رائع" }] },
        { id: 8, name: "مكواة بخار", price: 350, category: "discounts", stock: 10, images: ["img/6.jpg", "img/7.jpg"], description: "مكواة بخار عالية الكفاءة", reviews: [{ user: "عمر", rating: 4, comment: "سهلة الاستخدام" }] },
        { id: 9, name: "مصباح LED", price: 100, category: "mostsales", stock: 25, images: ["img/8.jpg", "img/9.jpg"], description: "مصباح موفر للطاقة", reviews: [{ user: "حسن", rating: 5, comment: "إضاءة ممتازة" }] },
        { id: 10, name: "كرسي مكتب", price: 600, category: "features", stock: 6, images: ["img/11.jpg", "img/12.jpg"], description: "كرسي مكتب مريح", reviews: [{ user: "باسم", rating: 4, comment: "مريح لساعات طويلة" }] },
        { id: 11, name: "مقلاة هوائية", price: 700, category: "news", stock: 4, images: ["img/1.jpg", "img/2.jpg"], description: "مقلاة صحية بدون زيت", reviews: [{ user: "سعيد", rating: 5, comment: "نتائج رائعة" }] },
        { id: 12, name: "سجادة صلاة", price: 120, category: "mostsales", stock: 30, images: ["img/4.jpg", "img/5.jpg"], description: "سجادة مريحة وأنيقة", reviews: [{ user: "فارس", rating: 4, comment: "ناعمة جدًا" }] },
        { id: 13, name: "مروحة مكتب", price: 220, category: "discounts", stock: 18, images: ["img/6.jpg", "img/7.jpg"], description: "مروحة صغيرة وهادئة", reviews: [{ user: "نادر", rating: 3, comment: "جيدة ولكن تحتاج تحسين" }] },
        { id: 14, name: "سماعة رأس", price: 280, category: "features", stock: 9, images: ["img/8.jpg", "img/9.jpg"], description: "سماعة رأس بصوت نقي", reviews: [{ user: "طارق", rating: 5, comment: "صوت ممتاز" }] },
        { id: 15, name: "لوحة مفاتيح", price: 320, category: "news", stock: 11, images: ["img/11.jpg", "img/12.jpg"], description: "لوحة مفاتيح ميكانيكية", reviews: [{ user: "إبراهيم", rating: 4, comment: "تجربة كتابة رائعة" }] },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    let username = localStorage.getItem('username') || '';

    // Initialize UI
    updateCartCount();
    initializeTheme();
    toggleUserProfile();
    showLoadingSpinner(false);
    generateCsrfTokens();

    // Generate CSRF Tokens (Simulated)
    function generateCsrfTokens() {
        const token = Math.random().toString(36).substr(2);
        $('#csrfTokenLogin, #csrfTokenContact, #csrfTokenCheckout').val(token);
    }

    // Theme Toggle
    $('#themeToggle').click(function () {
        const currentTheme = $('html').attr('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        $('html').attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        $(this).find('i').toggleClass('fa-moon fa-sun');
    });

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        $('html').attr('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            $('#themeToggle').find('i').removeClass('fa-moon').addClass('fa-sun');
        }
    }

    // Toggle User Profile
    function toggleUserProfile() {
        if (isLoggedIn) {
            $('#usernameDisplay').text(username || 'حسابي');
            $('#userProfile').show();
        } else {
            $('#userProfile').hide();
        }
    }

    // Password Toggle
    $('.toggle-password').click(function () {
        const passwordInput = $('#password');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });

    // Login Form Validation
    if ($('#loginForm').length) {
        $('#username, #password').on('input', validateLoginForm);
        $('#loginForm').submit(function (e) {
            e.preventDefault();
            showLoadingSpinner(true);
            const email = $('#username').val().trim();
            const password = $('#password').val();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                $('#loginError').text('يرجى إدخال بريد إلكتروني صالح.').show();
                showToast('فشل تسجيل الدخول!', 'danger');
                showLoadingSpinner(false);
                return;
            }
            if (password.length < 8) {
                $('#loginError').text('كلمة المرور يجب أن تكون 8 أحرف على الأقل.').show();
                showToast('فشل تسجيل الدخول!', 'danger');
                showLoadingSpinner(false);
                return;
            }
            // Simulated backend check
            setTimeout(() => {
                if (email === 'test@example.com' && password === 'password123') {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('username', email.split('@')[0]);
                    showToast('تم تسجيل الدخول بنجاح!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    $('#loginError').text('البريد الإلكتروني أو كلمة المرور غير صحيحة.').show();
                    showToast('فشل تسجيل الدخول!', 'danger');
                }
                showLoadingSpinner(false);
            }, 1000);
        });
    }

    function validateLoginForm() {
        const email = $('#username').val().trim();
        const password = $('#password').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;
        if (email && !emailRegex.test(email)) {
            $('#username').addClass('is-invalid');
            isValid = false;
        } else {
            $('#username').removeClass('is-invalid');
        }
        if (password && password.length < 8) {
            $('#password').addClass('is-invalid');
            isValid = false;
        } else {
            $('#password').removeClass('is-invalid');
        }
        return isValid;
    }

    // Forgot Password (Placeholder)
    $('#forgotPassword').click(function (e) {
        e.preventDefault();
        showToast('سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني!', 'info');
    });

    // Logout
    $('#logoutLink').click(function (e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        isLoggedIn = false;
        toggleUserProfile();
        showToast('تم تسجيل الخروج بنجاح!', 'success');
        window.location.href = 'login.html';
    });

    // Load Products
    function loadProducts(container, filter = '*', limit = 6) { // Increased default limit to 6
        showLoadingSpinner(true);
        const filteredProducts = filter === '*' ? products : products.filter(p => p.category === filter.slice(1));
        const sortedProducts = sortProducts(filteredProducts, $('#sortSelect').val());
        const productsToShow = sortedProducts.slice(0, limit);
        $(container).empty();
        productsToShow.forEach(product => {
            const card = `
                <div class="card m-3 xitem ${product.category}" style="width: 18rem;" role="article">
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text blue">${product.price} جنيه</p>
                        <p class="small ${product.stock > 0 ? 'text-success' : 'text-danger'}">${product.stock > 0 ? `متوفر: ${product.stock}` : 'غير متوفر'}</p>
                        <button class="btn btn-primary gradient-btn add-to-cart" data-id="${product.id}" aria-label="أضف ${product.name} إلى السلة" ${product.stock === 0 ? 'disabled' : ''}>أضف إلى السلة <i class="fa-solid fa-cart-shopping"></i></button>
                        <button class="btn btn-outline-primary view-details mt-2" data-id="${product.id}" aria-label="عرض تفاصيل ${product.name}">عرض التفاصيل</button>
                    </div>
                </div>
            `;
            $(container).append(card);
        });
        initializeIsotope();
        showLoadingSpinner(false);
    }

    // Initialize Isotope
    function initializeIsotope() {
        $('.xgrid').isotope({
            itemSelector: '.xitem',
            layoutMode: 'fitRows',
            transitionDuration: '0.4s'
        });
    }

    // Sort Products
    function sortProducts(products, sortBy) {
        if (sortBy === 'name-asc') return products.sort((a, b) => a.name.localeCompare(b.name));
        if (sortBy === 'name-desc') return products.sort((a, b) => b.name.localeCompare(a.name));
        if (sortBy === 'price-asc') return products.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') return products.sort((a, b) => b.price - a.price);
        return products;
    }

    // Load More Products
    let currentLimit = 6; // Start with 6 products
    $('#loadMore').click(function () {
        currentLimit += 6;
        loadProducts('#productGrid', '*', currentLimit);
    });

    // Filter Products
    $('.filter-button-group button').click(function () {
        const filterValue = $(this).attr('data-filter');
        $('.xgrid').isotope({ filter: filterValue });
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Sort Products
    $('#sortSelect').change(function () {
        loadProducts('#productGrid', '*', currentLimit);
    });

    // Add to Cart (Optimized for instant addition)
    $(document).on('click', '.add-to-cart', function () {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);
        if (!product) {
            showToast('المنتج غير موجود!', 'danger');
            return;
        }
        if (product.stock === 0) {
            showToast('المنتج غير متوفر حاليًا!', 'warning');
            return;
        }
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            if (cartItem.quantity + 1 > product.stock) {
                showToast('الكمية المطلوبة غير متوفرة!', 'warning');
                return;
            }
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`تم إضافة ${product.name} إلى السلة!`, 'success');
    });

    // Update Cart Count
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        $('#cartCount').text(count);
    }

    // View Product Details
    $(document).on('click', '.view-details', function () {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);
        if (!product) {
            showToast('المنتج غير موجود!', 'danger');
            return;
        }
        $('#modalTitle').text(product.name);
        $('#modalDescription').text(product.description);
        $('#modalPrice').text(`${product.price} جنيه`);
        $('#modalAddToCart').data('id', productId).prop('disabled', product.stock === 0);
        $('#modalCarouselInner').empty();
        product.images.forEach((img, index) => {
            const carouselItem = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100" alt="${product.name}" loading="lazy">
                </div>
            `;
            $('#modalCarouselInner').append(carouselItem);
        });
        $('#productReviews').empty();
        product.reviews.forEach(review => {
            const reviewHtml = `
                <div class="review mb-2">
                    <strong>${review.user}</strong>: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    <p>${review.comment}</p>
                </div>
            `;
            $('#productReviews').append(reviewHtml);
        });
        $('#exampleModal').modal('show');
    });

    // Load Cart Items
    if ($('#cartItems').length) {
        loadCartItems();
    }

    function loadCartItems() {
        $('#cartItems').empty();
        let total = 0;
        cart = cart.filter(item => item.price && item.quantity && products.find(p => p.id === item.id)); // Validate cart
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = `
                <div class="cart-item d-flex align-items-center justify-content-between">
                    <img src="${item.images[0]}" alt="${item.name}" loading="lazy">
                    <div>
                        <h5>${item.name}</h5>
                        <p>${item.price} جنيه x <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${product.stock}" data-id="${item.id}" style="width: 50px;"></p>
                        <p class="small ${product.stock > 0 ? 'text-success' : 'text-danger'}">${product.stock > 0 ? `متوفر: ${product.stock}` : 'غير متوفر'}</p>
                    </div>
                    <div>
                        <p>${itemTotal} جنيه</p>
                        <button class="btn btn-danger remove-from-cart" data-id="${item.id}" aria-label="إزالة ${item.name} من السلة">إزالة</button>
                    </div>
                </div>
            `;
            $('#cartItems').append(cartItem);
        });
        $('#cartTotal').text(total);
        toggleCheckoutForm();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Toggle Checkout Form
    function toggleCheckoutForm() {
        if (isLoggedIn) {
            $('#checkoutForm').show();
            $('#checkoutBtn').hide();
        } else {
            $('#checkoutForm').hide();
            $('#checkoutBtn').show();
        }
    }

    // Update Quantity
    $(document).on('change', '.quantity-input', function () {
        const productId = $(this).data('id');
        const newQuantity = parseInt($(this).val());
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem && newQuantity > 0 && newQuantity <= product.stock) {
            cartItem.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        } else {
            $(this).val(cartItem.quantity);
            showToast(newQuantity > product.stock ? 'الكمية المطلوبة غير متوفرة!' : 'يرجى إدخال كمية صالحة!', 'warning');
        }
    });

    // Remove from Cart
    $(document).on('click', '.remove-from-cart', function () {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
        showToast('تمت إزالة المنتج من السلة!', 'success');
    });

    // Checkout
    $('#checkoutBtn').click(function () {
        if (!isLoggedIn) {
            showToast('يرجى تسجيل الدخول لإكمال الشراء!', 'warning');
            window.location.href = 'login.html';
        }
    });

    $('#checkoutDetails').submit(function (e) {
        e.preventDefault();
        showLoadingSpinner(true);
        if (cart.length === 0) {
            showToast('عربة التسوق فارغة!', 'warning');
            showLoadingSpinner(false);
            return;
        }
        setTimeout(() => {
            showToast('تم تأكيد الطلب بنجاح!', 'success');
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) product.stock -= item.quantity;
            });
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
            $(this)[0].reset();
            showLoadingSpinner(false);
        }, 1000);
    });

    // Contact Form
    $('#contactForm').submit(function (e) {
        e.preventDefault();
        showLoadingSpinner(true);
        setTimeout(() => {
            showToast('تم إرسال رسالتك بنجاح!', 'success');
            $(this)[0].reset();
            showLoadingSpinner(false);
        }, 1000);
    });

    // Subscribe
    $('#subscribeBtn').click(function () {
        const email = $('#subscribeEmail').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            showToast('تم الاشتراك بنجاح!', 'success');
            $('#subscribeEmail').val('');
        } else {
            showToast('يرجى إدخال بريد إلكتروني صالح!', 'warning');
        }
    });

    // Debounced Live Search with Keyboard Navigation
    let searchTimeout;
    let selectedIndex = -1;
    $('#searchInput').on('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = $(this).val().toLowerCase().trim();
            const suggestions = products.filter(p => p.name.toLowerCase().includes(query));
            $('#searchSuggestions').empty();
            selectedIndex = -1;
            if (query && suggestions.length) {
                suggestions.forEach((product, index) => {
                    const highlightedName = product.name.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
                    const suggestion = `<li class="dropdown-item" data-id="${product.id}" role="option">${highlightedName}</li>`;
                    $('#searchSuggestions').append(suggestion);
                });
                $('#searchSuggestions').show();
            } else {
                $('#searchSuggestions').hide();
            }
        }, 300);
    }).on('keydown', function (e) {
        const suggestions = $('#searchSuggestions .dropdown-item');
        if (!suggestions.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % suggestions.length;
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            suggestions.eq(selectedIndex).click();
        }
    });

    function updateSelectedSuggestion(suggestions) {
        suggestions.removeClass('active');
        if (selectedIndex >= 0) {
            suggestions.eq(selectedIndex).addClass('active');
            suggestions.eq(selectedIndex)[0].scrollIntoView({ block: 'nearest' });
        }
    }

    $(document).on('click', '.search-suggestions .dropdown-item', function () {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);
        if (product) {
            $('#searchInput').val(product.name);
            $('#searchSuggestions').hide();
            $('.view-details[data-id="' + productId + '"]').click();
        }
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('#searchInput, #searchSuggestions').length) {
            $('#searchSuggestions').hide();
        }
    });

    // Show Toast
    function showToast(message, type) {
        const toast = $('#actionToast');
        toast.find('.toast-body').text(message);
        toast.removeClass('bg-success bg-danger bg-warning bg-info').addClass(`bg-${type}`);
        toast.toast({ delay: 3000 });
        toast.toast('show');
    }

    // Show/Hide Loading Spinner
    function showLoadingSpinner(show) {
        $('#loadingSpinner').toggleClass('d-none', !show);
    }

    // Load Products on Home and Products Page
    if ($('#productGrid').length) {
        loadProducts('#productGrid');
    }
});