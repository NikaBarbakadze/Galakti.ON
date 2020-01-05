$(document).ready(function(){
	// სელექტორის გაფორმება
	$("select.selectori").each(function(){
		var placeholder = $(this).data('placeholder') || 'Default placeholder';
		$(this).select2({
			allowClear: true,
			minimumResultsForSearch: -1,
			placeholder: placeholder
		}); 
	});
	// სლაიდერი
	$(".first_slider").slick({
		autoplay: true,
		dots: true,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).find('[data-title]').data('title');
            return '<a class="pager__item"> '+title+' </a>';},
		infinite: true,
		speed: 1000,
		arrows: true,
		slidesToShow: 1,
		fade: true,
		adaptiveHeight: true,
		prevArrow: '<em class="fas fa-arrow-left"></em>',
		nextArrow: '<em class="fas fa-arrow-right"></em>'
	});

	$(".second_slider").slick({
		autoplay: false,
		dots: true,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).find('[data-title]').data('title');
            return '<a class="pager__item"> '+title+' </a>';},
		infinite: true,
		speed: 500,
		arrows: false,
		slidesToShow: 1,
		fade: true,
		adaptiveHeight: true,
		prevArrow: '<em class="fas fa-arrow-left"></em>',
		nextArrow: '<em class="fas fa-arrow-right"></em>'
	});
      	// გალერეა
	$(".magnific").each(function(){
		$(this).magnificPopup({
			delegate: "a",
			type: "image",
			gallery:{
				enabled: true
			},
			zoom:{
				enabled: true,
				duration: 300
			}
		});
	});
	if($(".magnific_video").length){
		$(".magnific_video").magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}
	/**/
	// არტ ფორმა
	$("input.artform").artmediaForm();
});
