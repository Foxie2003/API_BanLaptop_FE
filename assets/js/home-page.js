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
    console.log(slideIndexBody1);
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
    setTimeout(showSlideBody1(), -2500);
}
function nextSlideBody1() {
    setTimeout(showSlideBody1(), 0);
}
function setIndexSlideBody1(index) {
    slideIndexBody1 = index;
    setTimeout(showSlideBody1(), 0);
}

// Load product
let loaded = 0; //Product loaded

function loadInnerProduct(sanpham) {
    const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    document.getElementById("products").innerHTML
        += `<div class="product-item col-2-4 col-s-6" onclick="showDetails('${sanpham.id.trim()}')">
        <img src="` + sanpham.images[0] + `" alt="">
        <div class="title">` + sanpham.name.split("/")[0] + `</div>
        <div class="price">` + format.format(sanpham.price) + `₫</div>
        <div class="price" style="font-size: 14px; margin-top: -2px;">` + format.format(sanpham.price) + `₫</div>
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
            console.log("id: " + products.phanloai[property][i].id);
            console.log("loading: " + loading);
            if(loading > loaded) {
                loadInnerProduct(products.phanloai[property][i]);
                loaded++;
                console.log("loaded: " + loaded);
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
             loaded = 0; loadAllProduct();
             document.getElementById('showMoreProduct').style.display = 'block';
    }
}

// Show details
function showDetails(id) {
    alert(id);
    // Current ID
    localStorage.setItem("current-product-id", id);
    window.location.href = "product-details.html";
}