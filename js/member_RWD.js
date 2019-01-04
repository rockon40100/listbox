// JavaScript Document

var wwm = window.innerWidth;

/***必須要放在main.js之後，否則$('.blank-name')還沒生成會抓不到對象***/
$(document).ready(function() {
	//1024px以下移除多餘空白
	var empty_1024 = function(){
		$('.blank-name').hide();
		$('.blank-cb').hide();
		//補空白
		$('.member2,.member2-style2').each(function(){
			if($(this).find('.member2-name').length % 4 == 1 || $(this).find('.member2-name').length % 4 == 3){
				$(this).find('.blank-name:first').show();
				$(this).find('.blank-cb:first').show();
			}
		});
	}
	//判斷寬度
	var width_judge = function(){
		if(wwm <= 480){
			$('.blank-name').hide();
			$('.blank-cb').hide();
		}
		else if(wwm <= 1024){
			empty_1024();
		}
		else{
			$('.blank-name').show();
			$('.blank-cb').show();
		}		
	}


	$(window).bind('resize orientationchange', function() {
		if(wwm != window.innerWidth){
			wwm = window.innerWidth;
			width_judge();
		}
	});

	width_judge();
});
