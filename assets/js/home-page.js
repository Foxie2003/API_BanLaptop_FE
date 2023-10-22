// Slide show
let slideIndexTop = 0;
function showSlideTop() {
    let i;
    let slides = document.getElementsByClassName("top-slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slideIndexTop == slides.length) {
        slideIndexTop = 0;
    }
    slides[slideIndexTop].style.display = "block";
    slideIndexTop++;
    setTimeout(showSlideTop, 2000);
}
let slideIndexBody1 = 0;
function showSlideBody1() {
    let i;
    let slides = document.getElementsByClassName("body-1-slides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody1 == slides.length) {
        slideIndexBody1 = 0;
    }
    else if (slideIndexBody1 < 0) {
        slideIndexBody1 = slides.length - 1;
    }
    slides[slideIndexBody1].style.display = "block";
    dots[slideIndexBody1].className += " active";
    slideIndexBody1++;
    // setTimeout(showSlideBody1, 2500);
}
function showSlideBody1TimeOut() {
    let i;
    let slides = document.getElementsByClassName("body-1-slides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndexBody1 == slides.length) {
        slideIndexBody1 = 0;
    }
    else if (slideIndexBody1 < 0) {
        slideIndexBody1 = slides.length - 1;
    }
    slides[slideIndexBody1].style.display = "block";
    dots[slideIndexBody1].className += " active";
    slideIndexBody1++;
    setTimeout(showSlideBody1TimeOut, 2500);
}
function backSlideBody1() {
    slideIndexBody1 = slideIndexBody1 - 2;
    showSlideBody1();
}
function nextSlideBody1() {
    showSlideBody1()
}
function setIndexSlideBody1(index) {
    slideIndexBody1 = index;
    showSlideBody1()
}

// Load product
let loaded = 0; //Product loaded

function loadInnerProduct(sanpham) {
    const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    document.getElementById("products").innerHTML
        += `<div class="product-item col-2-4 col-s-6" onclick="showDetails('${sanpham.id.trim()}')">
        <img class="product-img" src="` + sanpham.images[0] + `" alt="">
        <div class="title">` + sanpham.name.split("/")[0] + `</div>
        <div class="price">` + format.format(sanpham.price) + `₫</div>
        <div class="price-old">` + format.format(sanpham.price + sanpham.price * 10 / 100) + `₫</div>
        <ul class="desc">
            <li class="screen">Màn hình: ` + sanpham.specs.screen + `</li>
            <li class="cpu">CPU: ` + sanpham.specs.cpu + `</li>
            <li class="gpu">Card: ` + sanpham.specs.gpu + `</li>
            <li class="ram">Ram: ` + sanpham.specs.ram.split('(')[0].trim() + "," + sanpham.specs.ram.split(',')[2] + `</li>
            <li class="weight">Cân nặng: ` + sanpham.specs.size.split("-")[3] + `</li>
        </ul>
    </div>`;
}

function loadAsusProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
        document.getElementById("products").innerHTML = "";
        document.getElementById("showMoreProduct").style.display = "none";
        products.phanloai.asus.forEach(sanpham => {
        loadInnerProduct(sanpham);
    });
}

function loadHpProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    document.getElementById("showMoreProduct").style.display = "none";
    products.phanloai.hp.forEach(sanpham => {
        loadInnerProduct(sanpham);
    });
}

function loadLenovoProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    document.getElementById("showMoreProduct").style.display = "none";
    products.phanloai.lenovo.forEach(sanpham => {
        loadInnerProduct(sanpham);
    });
}

function loadAcerProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    document.getElementById("showMoreProduct").style.display = "none";
    products.phanloai.acer.forEach(sanpham => {
        loadInnerProduct(sanpham);
    });
}

// Count products
function countProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var count = 0;
    for (const property in products.phanloai) {
        for (var i = 0; i < products.phanloai[property].length; i++) {
            count++;
        }
    }
    return count;
}

// Load all products from local storage
function loadAllProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var loading = 0;
    for (const property in products.phanloai) {
        var check = false;
        for (var i = 0; i < products.phanloai[property].length; i++){
            loading++;
            if(loading > loaded) {
                loadInnerProduct(products.phanloai[property][i]);
                loaded++;
                if(loaded % 15 == 0) {
                    check = true;
                    break;
                }
            }
        };
        let button = document.getElementById("showMoreProduct");
        button.innerHTML = `Xem thêm ${countProduct() - loaded} sản phẩm
        <i class="fa-solid fa-caret-down fa-lg"></i>`
        if(loaded == countProduct()) {
            // let button = document.getElementById("showMoreProduct");
            button.style.display = "none";
        }
        if(check) {
            break;
        };
    }
}


var hotDealProducts = [
    "SP01", "SP02", "SP04", "SP15", "SP16", "SP20"
];
// Load HOTDEAL products from local storage
function loadHotDealProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    for (const property in products.phanloai) {
        for (var i = 0; i < products.phanloai[property].length; i++){
            if(hotDealProducts.includes(products.phanloai[property][i].id)) {
                const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
                    document.getElementById("hotdeal-products").innerHTML
                        += `<div class="product-item col-2-4 col-s-6" onclick="showDetails('${products.phanloai[property][i].id.trim()}')">
                        <img class="product-img" src="` + products.phanloai[property][i].images[0] + `" alt="">
                        <div class="title">` + products.phanloai[property][i].name.split("/")[0] + `</div>
                        <div class="price">` + format.format(products.phanloai[property][i].price) + `₫</div>
                        <div class="price-old">` + format.format(products.phanloai[property][i].price + products.phanloai[property][i].price * 10 / 100) + `₫</div>
                        <ul class="desc">
                            <li class="screen">Màn hình: ` + products.phanloai[property][i].specs.screen + `</li>
                            <li class="cpu">CPU: ` + products.phanloai[property][i].specs.cpu + `</li>
                            <li class="gpu">Card: ` + products.phanloai[property][i].specs.gpu + `</li>
                            <li class="ram">Ram: ` + products.phanloai[property][i].specs.ram.split('(')[0].trim() + "," + products.phanloai[property][i].specs.ram.split(',')[2] + `</li>
                            <li class="weight">Cân nặng: ` + products.phanloai[property][i].specs.size.split("-")[3] + `</li>
                        </ul>
                    </div>`;
            }
        };
    }
}

// Search products from local storage
function searchProduct(name) {
    name = name.toLowerCase();
    const products = JSON.parse(localStorage.getItem("sanpham"));
    document.getElementById("products").innerHTML = "";
    document.getElementById("showMoreProduct").style.display = "none";
    var haveProduct = false;
    for (const property in products.phanloai) {
        for (var i = 0; i < products.phanloai[property].length; i++) {
            var productName = products.phanloai[property][i].name.toLowerCase();
            if(productName.includes(name)) {
                haveProduct = true;
                loadInnerProduct(products.phanloai[property][i]);
            }
        }
    }
    if (!haveProduct) {
        document.getElementById("products").innerHTML
            = `<p style="font-size: 32px; font-weight: bold; color: #333; width: 100%; text-align: center; margin:200px 0;">Không có sản phẩm nào có tên "${name}" </p>
            <p style="font-size: 26px; color: #333; width: 100%; text-align: center; margin-bottom: 20px;">Xem các sản phẩm khác</p>`;
            loaded = 0;
            loadAllProduct();
            document.getElementById('showMoreProduct').style.display = 'block';
    }
}

// Show details
function showDetails(id) {
    // alert(id);
    // Current ID
    localStorage.setItem("current-product-id", id);
    window.location.href = "product-details.html";
}

// Show login data
function showLoginData() {
    var btnLogin = document.getElementById("btn-login");
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if(loginData != null) {
        btnLogin.textContent = "Đăng xuất \n[" + loginData.userName.split("@")[0] + "]";
    }
    else {
        btnLogin.textContent = "Đăng nhập";
    }
}
//Btn login
function btnLoginOnClick() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if(loginData != null) {
        localStorage.setItem("loginData", null);
        alert("Đăng xuất thành công");
        window.location.reload();
    }
    else {
        window.location.href = 'sign-up-sign-in.html';
    }
}

//Btn cart
function btnCartOnClick() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    var cartInfo = loginData.cart;
    window.location.href = "cart.html";
    
}

//Show number of product in cart
function showProductInCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    var cartInfo = loginData.cart;
    document.getElementById("btn-cart").innerHTML =
    `<i class="fa-solid fa-cart-shopping fa-lg"></i>
    <span style="margin-left: 2px;"></span>
    Giỏ hàng (${cartInfo.length})`;
}
