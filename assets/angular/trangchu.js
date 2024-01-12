var app = angular.module('appBanLaptop', []);
app.controller("home-page", function ($scope, $http) {
    $scope.host = current_img;
    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.totalPage = 0;
    // Load Laptop Bands
    $scope.listDanhMuc;
    $scope.LoadDanhMuc = function () {
        $http({
            method: 'GET',
            url: current_url + "/api/LoaiSanPham/get-all",
        }).then(function (response) {
            $scope.listDanhMuc = response.data;
        });
    };
    $scope.LoadDanhMuc();

    // Load Laptops
    $scope.listLaptop;
    $scope.LoadLaptops = function(searchInfo) {
        $.ajax({
            method: 'POST',
            url: current_url + "/api/SanPham/search",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(searchInfo)
        }).done(function(response) {
            $scope.$apply(function() {
                $scope.totalPage = Math.ceil(response.totalItems / $scope.pageSize);
                $scope.listLaptop = response.data;
                if(response.totalItems == 0) {
                    alert("Không tìm thấy sản phẩm nào")
                }
                console.log(response);
            });
        }).fail(function() {
            console.log("Load laptops fail");
        });
    };
    $scope.LoadLaptops({
        pageIndex: $scope.pageIndex,
        pageSize: $scope.pageSize,
        tenSanPham: searchInput.value
    });

    $scope.priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });

    $scope.getRandomNum = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    $scope.nextPageLaptops = function() {
        if($scope.pageIndex < $scope.totalPage) {
            $scope.pageIndex = $scope.pageIndex + 1;
            $scope.LoadLaptops({
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize,
                tenSanPham: searchInput.value
            });
        }
    };

    $scope.backPageLaptops = function() {
        if($scope.pageIndex > 1) {
            $scope.pageIndex = $scope.pageIndex - 1;
            $scope.LoadLaptops({
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize,
                tenSanPham: searchInput.value
            });
        }
    };

    $scope.firstPageLaptops = function() {
        $scope.pageIndex = 1;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize,
            tenSanPham: searchInput.value
        });
    };

    $scope.lastPageLaptops = function() {
        $scope.pageIndex = $scope.totalPage;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize,
            tenSanPham: searchInput.value
        });
    };

    $scope.loadAllLaptopsByBandName = function(bandName) {
        $scope.pageIndex = 1;
        searchInput.value = "";
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize,
            tenLoai: bandName
        });
    };

    $scope.searchLaptopByName = function(laptopName) {
        window.location.href = 'search.html?tenSanPham=' + laptopName;
    };

    $scope.loadLaptopById = function(laptopId) {
        window.location.href = 'product-details.html?id=' + laptopId;
    };
});