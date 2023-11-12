const priceFormat = new Intl.NumberFormat({ maximumSignificantDigits: 3 });
$(document).ready(function(){
	
	$('#price-range-submit').hide();

	$(function () {
		$("#slider-range").slider({
			range: true,
			orientation: "horizontal",
			min: 0,
			max: 100000000,
			values: [0, 100000000],
			step: 100000,
			
			slide: function (event, ui) {
			if (ui.values[0].toString().replaceAll(",", "") == ui.values[1].toString().replaceAll(",", "")) {
				return false;
			}
			$("#min_price").val(priceFormat.format(ui.values[0]));
			$("#max_price").val(priceFormat.format(ui.values[1]));
			priceFilter();
		}
	  });

	  $("#min_price").val($("#slider-range").slider("values", 0));
	  $("#max_price").val($("#slider-range").slider("values", 1));
	  $("#max_price").val(priceFormat.format(100000000));

	});

	
	$("#slider-range,#price-range-submit").click(function () {
		
		var min_price = $('#min_price').val();
		var max_price = $('#max_price').val();
		
		$("#searchResults").text("Here List of products will be shown which are cost between " + min_price  +" "+ "and" + " "+ max_price + ".");
	});
	
});