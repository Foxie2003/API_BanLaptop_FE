var app = angular.module('appBanLaptop', []);
app.controller("details", function ($scope, $http) {
    $scope.host = current_img;
    // Load Laptop Data
    $scope.laptopId = window.location.href.split("=")[1];
    $scope.laptopData;
    $scope.loadLaptopData = function () {
        $http({
            method: 'GET',
            url: current_url + "/api/SanPham/get-by-id/" + $scope.laptopId,
        }).then(function (response) {
            $scope.laptopData = response.data;
            console.log($scope.laptopData);
        });
    };
    $scope.loadLaptopData();

    $scope.priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

    $scope.addToCart = function() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];
        var inCart = false;
        
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].maSanPham == $scope.laptopId) {
                inCart = true;
    
                cart[index].soLuong += 1;
    
                localStorage.setItem("cart", JSON.stringify(cart));
                
                alert("Số lượng của sản phẩm đã được + 1");
                break;
            }
        }
        if (!inCart) {
            $scope.laptopData.soLuong = 1;
            cart.push($scope.laptopData);
    
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        }
    }
});