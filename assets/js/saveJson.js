function savaJsonToLocalStorage() {
    fetch('./assets/json/sanpham.json')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        localStorage.setItem("sanpham", JSON.stringify(data));
    })
    .catch(function (err) {
        console.log(err);
    })
}