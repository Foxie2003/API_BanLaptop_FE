var products = JSON.parse(localStorage.getItem("sanpham"));
var accessory = products.phukien;
const format = new Intl.NumberFormat({ maximumSignificantDigits: 3 });


function loadInnerAccessory(sanpham) {
    console.log((sanpham.old_price));
    document.getElementById("products").innerHTML
        += `<div class="product-item col-2-4 col-s-6" onclick="showDetails('${sanpham.id.trim()}')">
        <div class="sale-percent">
        -${Math.round((sanpham.old_price - sanpham.price) / sanpham.old_price * 100)}%
        <i class="fa-solid fa-tag fa-xl"></i></div>
        <img class="product-img" src="` + sanpham.images[0] + `" alt="">
        <div class="title">` + sanpham.name.split("/")[0] + `</div>
        <div class="price">` + format.format(sanpham.price) + `₫</div>
        <div class="price-old">` + format.format(sanpham.old_price) + `₫</div>
    </div>`;
}

// Load all acessories from local storage
function loadAllAccessory() {
    var loading = 0;
    for (const property in accessory) {
        var check = false;
        for (var i = 0; i < accessory[property].length; i++){
            loading++;
            if(loading > loaded) {
                loadInnerAccessory(accessory[property][i]);
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

function countProduct() {
    const products = JSON.parse(localStorage.getItem("sanpham"));
    var count = 0;
    for (const property in products.phukien) {
        for (var i = 0; i < products.phukien[property].length; i++) {
            count++;
        }
    }
    return count;
}