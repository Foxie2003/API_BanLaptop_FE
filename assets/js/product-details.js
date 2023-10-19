var slideIndexProduct = 0;
var productId = localStorage.getItem("current-product-id");
var productData;
var imgs = [];
var descs;
function loadData() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var haveProduct = false;
    for (const property in products.phanloai) {
        for (var i = 0; i < products.phanloai[property].length; i++) {
            var id = products.phanloai[property][i].id;
            if(productId == id) {
                haveProduct = true;
                productData = products.phanloai[property][i];
                for (let index = 1; index < products.phanloai[property][i].images.length; index++) {
                    imgs.push(products.phanloai[property][i].images[index]);
                }
                break;
            }
        }
    }
    if (!haveProduct) {
        alert("Sản phẩm không tồn tại");
        return;
    }
    var names = document.getElementsByClassName("product-name");
    for (let index = 0; index < names.length; index++) {
        names[index].textContent = productData.name;
    }
    document.getElementById("title").textContent = productData.name;
}
function loadDesc() {
    descs = productData.desc;
    document.getElementById("product-desc-header").innerHTML = "";
    document.getElementById("product-desc-header").innerHTML = descs.header;
    descs.body.forEach(info => {
        document.getElementById("product-desc-body").innerHTML += "<li>" + info + "</li>";
    });
}
function loadPrice() {
    const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
    document.getElementById("price-panel").innerHTML = 
    `<div class="price-new">${format.format(productData.price)}₫ *</div>
    <div class="price-old">${format.format(productData.price + productData.price * 10 / 100)}₫</div>
    <div class="price-sale-percent">-10%</div>
    <div class="price-installment">Trả góp 0%</div>`;
}
function loadSpec() {
    document.getElementById("cpu").innerText = productData.specs.cpu;
    document.getElementById("ram").innerText = productData.specs.ram;
    document.getElementById("disk").innerText = productData.specs.disk;
    document.getElementById("screen").innerText = productData.specs.screen;
    document.getElementById("gpu").innerText = productData.specs.gpu;
    document.getElementById("port").innerText = productData.specs.port;
    document.getElementById("os").innerText = productData.specs.os;
    document.getElementById("size").innerText = productData.specs.size;
}
function showDescBody() {
    var descBody = document.getElementById("product-desc-body");
    if(descBody.offsetHeight > 200) {
        descBody.style.height = "200px";
        document.getElementById("btn-showMoreDesc").innerHTML = 
        `Xem thêm
        <i class="fa-solid fa-caret-down fa-sm"></i>`;
    }
    else {
        descBody.style.height = "auto";
        document.getElementById("btn-showMoreDesc").innerHTML = 
        `Thu gọn
        <i class="fa-solid fa-caret-up fa-sm"></i>`;
    }
}
function zoomSlideProduct() {
    $('#product-details-slide').extm({
        position: 'right',
        rightPad: 5,
        squareOverlay: true,
        zoomSize: 2000,
    });
}

function showSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slide.src = imgs[slideIndexProduct];
    zoomSlideProduct();
    
}
function nextSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct++;
    if(slideIndexProduct == imgs.length) {
        slideIndexProduct = 0;
    }
    slide.src = imgs[slideIndexProduct];
    zoomSlideProduct();
}
function backSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct--;
    if(slideIndexProduct == -1) {
        slideIndexProduct = imgs.length - 1;
    }
    slide.src = imgs[slideIndexProduct];
    zoomSlideProduct();
}

// Add to cart
function addToCart() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));
    if(loginData != null) {
        var userData = JSON.parse(localStorage.getItem(loginData.userName));
        var inCart = false;
        
        for (let index = 0; index < loginData.cart.length; index++) {
            if(loginData.cart[index].product.id == productData.id) {
                inCart = true;

                loginData.cart[index].quantity += 1;

                localStorage.setItem("loginData", JSON.stringify(loginData));
                localStorage.setItem(loginData.userName, JSON.stringify(loginData));
                
                alert("Sản phẩm đã có trong giỏ hàng");
                break;
            }
        }
        if (!inCart) {
            var cartData = {
                product :  productData,
                quantity : 1
            };

            loginData.cart.push(cartData);
            userData.cart.push(cartData);

            localStorage.setItem("loginData", JSON.stringify(loginData));
            localStorage.setItem(loginData.userName, JSON.stringify(userData));
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        }
    }
    else {
        alert("Vui lòng đăng nhập trước khi mua hàng");
        window.location.href = "sign-up-sign-in.html";
    }
}