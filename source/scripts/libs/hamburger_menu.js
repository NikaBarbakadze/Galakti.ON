$(document).ready(function(){
	// ჰორიზონტალური მენიუს და მისი ზე მენიუების ავტომატური მონიშვნა
	$("nav.navigation > ul > li ul li.active").parents("li").addClass("active");
	// რესპონსივ მენიუს კლონირება
	var clone = $("nav.navigation > ul").clone();
	$("div.resp_menu div.resp_menu_ul").html(clone);
	// რესპონსივ მენიუ
	$("div.resp_menu > div.resp_menu_toggle").click(function(){
		var resp_menu = $(this).next("div.resp_menu_ul");
		if(resp_menu.is(":hidden")){
			$(this).addClass("resp_menu_toggled");
			resp_menu.slideDown(500);
		}else{
			$(this).removeClass("resp_menu_toggled");
			resp_menu.slideUp(500);
		}
	});
	$("div.resp_menu ul li").has("ul").append('<div class="plus_minus"><div class="plus"></div><div class="minus"></div></div>');
	$("div.resp_menu ul li div.plus_minus").click(function(){
		var resp_sub_menu = $(this).prev("ul");
		if(resp_sub_menu.is(":hidden")){
			$(this).addClass("plus_minus_toggled");
			resp_sub_menu.slideDown(400);
		}else{
			$(this).removeClass("plus_minus_toggled");
			resp_sub_menu.slideUp(400);
		}
	});
});
