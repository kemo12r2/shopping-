var $grid = $('.xgrid').isotope(());
// filter items on button click
$('.filter-button-group').on("click", "button", function () {
var filtervalue = $(this).attr('data-filter');
Sgrid.isotope({filter: filtervalue });
});