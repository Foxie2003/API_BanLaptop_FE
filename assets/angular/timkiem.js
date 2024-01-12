var app = angular.module('appBanLaptop', []);
app.controller("search", function ($scope, $http) {
    $scope.host = current_img;
    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.totalPage = 0;

    $scope.searchInput = decodeURIComponent(window.location.href.split('=')[1]).split('&')[0];
    $scope.min_price = window.location.href.split('=')[2] != null ? window.location.href.split('=')[2].split('&')[0] : 0;
    $scope.max_price = window.location.href.split('=')[3] != null ? window.location.href.split('=')[3].split('&')[0] : 100000000;
    
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
        tenSanPham: $scope.searchInput,
        giaBatDau: $scope.min_price,
        giaKetThuc: $scope.max_price
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
                tenSanPham: $scope.searchInput,
                giaBatDau: $scope.min_price,
                giaKetThuc: $scope.max_price
            });
        }
    };

    $scope.backPageLaptops = function() {
        if($scope.pageIndex > 1) {
            $scope.pageIndex = $scope.pageIndex - 1;
            $scope.LoadLaptops({
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize,
                tenSanPham: $scope.searchInput,
                giaBatDau: $scope.min_price,
                giaKetThuc: $scope.max_price
            });
        }
    };

    $scope.firstPageLaptops = function() {
        $scope.pageIndex = 1;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize,
            tenSanPham: $scope.searchInput,
            giaBatDau: $scope.min_price,
            giaKetThuc: $scope.max_price
        });
    };

    $scope.lastPageLaptops = function() {
        $scope.pageIndex = $scope.totalPage;
        $scope.LoadLaptops({
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSize,
            tenSanPham: $scope.searchInput,
            giaBatDau: $scope.min_price,
            giaKetThuc: $scope.max_price
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

    $scope.searchLaptop = function(laptopName) {
        var minPrice = document.getElementById("min_price").value.replaceAll(",", "");
        var maxPrice = document.getElementById("max_price").value.replaceAll(",", "");
        window.location.href = 'search.html?tenSanPham=' + laptopName + '&giaBatDau=' + minPrice + '&giaKetThuc=' + maxPrice;
    }
});

