var slideIndexProduct = 0;
var imgs = [
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-1.jpg",
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-2.jpg",
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-3.jpg",
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-4.jpg",
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-5.jpg",
    "./assets/img/acer/acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002/vi-vn-acer-aspire-7-gaming-a715-43g-r8ga-r5-nhqhdsv002-6.jpg"
];
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
    // zoomSlideProduct();
    
}
function nextSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct++;
    if(slideIndexProduct == imgs.length) {
        slideIndexProduct = 0;
    }
    slide.src = imgs[slideIndexProduct];
    // zoomSlideProduct();
}
function backSlideProduct() {
    var slide = document.getElementById("product-details-slide");
    slideIndexProduct--;
    if(slideIndexProduct == -1) {
        slideIndexProduct = imgs.length - 1;
    }
    slide.src = imgs[slideIndexProduct];
    // zoomSlideProduct();
}