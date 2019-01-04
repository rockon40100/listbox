// JavaScript Document

$(document).ready(function() {
	
	if($('.listbox-style2').length > 0){
		$(window).resize(function() {
			var wwListBox = window.innerWidth;

			if (wwListBox > 768) {
				$('.listbox').before($('.select_targetbox'));
			} else {
				$('.targetbox-area').before($('.select_targetbox'));
			}
			var classSelectVal = $('.class_select2').val();
			getTbNameVal(classSelectVal);
			
		});

	}
	else if($('.listbox-style1').length > 0){
		$(window).resize(function() {
			var wwListBox = window.innerWidth;
			if (wwListBox >= 768) {
				$('.select_targetbox').css('display','none');
				$('.targetbox-content').css('display','table');
				getWidth();
			} else {
				$('.targetbox-content').css('display','none');
				$('.select_targetbox').css('display','block');
				var classSelectVal = $('.class_select2').val();
				getTbNameVal(classSelectVal);
			}
		});
	}
	else{
		$(window).resize(function() {
			getWidth();	
		});
	}

	$(window).bind('resize orientationchange', function() {
		if(RWD_status == 'Y'){
			if(ww >= 768){
				if($('.listbox-style2').length == 0){
					$('.targetbox>div').css('max-height',''+300/$('.targetbox-content').length+'px');
				}
				max_height();
				min_height();		
			}
			else{
				$('.targetbox').height('auto');
				$('.targetbox>div').css('max-height','300px');
			}
		}
		else{
			min_height();	
		}
	});
});


