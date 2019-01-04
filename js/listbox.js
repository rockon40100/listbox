
var ww = window.innerWidth;
//判斷是否有RWD
var head2 = $('head').html();	
var RWD_status = 'N';
if (head2.indexOf('main_RWD.css') > 0) {
	RWD_status = 'Y';
}
var wwlb = window.innerWidth;

//調整th寬
var getWidth = function(){
		
	//
	setTimeout(function(){
		//因為th是absolute所以要給thead標題高度，否則tbody的內容會上移被absolute的th蓋住
		$('.lb-table thead').each(function(){
			$(this).height($(this).find('tr').height());
		});
		$('.lb-table').each(function(){
			var tableW = $(this).width();
			var origin_getwidth = 0;
			$(this).find('.get-width').each(function(){
				origin_getwidth += parseInt($(this).css('width'));
			});
			var origin_trwidth = $(this).find('thead tr').width();
			var length = $(this).find('.get-width').length;
			$(this).find('.get-width').css('width',(tableW - origin_trwidth + origin_getwidth) / length);
		});
		
	},100);	
};

var max_height = function(){
	//調整sourcebox max-height
	if($('.listbox-style2').length > 0){
		var target_num = 1;
	}
	else{
		var target_num = $('.targetbox-content').length;	
	}
	var target_max = $('.targetbox > div').css('max-height');
	var target_margin = $('.targetbox-content').css('margin-bottom');
	var target_border = $('.targetbox').css('borderTopWidth');
	var soucrce_max = 300;
	
	if(target_num > 1){
		soucrce_max = target_num*parseInt(target_max)+parseInt(target_margin)*(target_num - 1)+parseInt(target_border)*target_num*2;
	}
	$('.sourcebox > div').css('max-height',soucrce_max);
};

var min_height = function(){
	if($('.listbox-style2').length > 0){
		var target_num = 1;
	}
	else{
		var target_num = $('.targetbox-content').length;	
	}
	var target_height = $('.targetbox > div').height();
	var target_margin = $('.targetbox-content').css('margin-bottom');
	var target_border = $('.targetbox').css('borderTopWidth');
	var target_max = $('.targetbox > div').css('max-height');
	var soucrce_height = $('.sourcebox > div').height();

	if(target_height < soucrce_height && target_height <= parseInt(target_max)){
		$('.targetbox').height((soucrce_height - parseInt(target_margin)*(target_num - 1) - parseInt(target_border)*target_num*2 + 2) / target_num);
	}
};


//li點擊時勾選checkbox
var li_event = function(){
	var key = 0; //判斷ctrl或shift
	var sel_start = -1; //shift選取起始點
	var sel_end = -1; //shift選取終點
	var input_click = 0; //是否點擊input
	$('input').click(function(){
		input_click = 1;
	});
	$('.listbox tr').click(function() {
		
		//如果listbox沒有nowclick表示現在所點擊的是另一個lisbox
		if($(this).parentsUntil($('.rightmain'),'.listbox').hasClass('nowclick') == false){
			//移除上一個listbox的標記
			$('.nowclick input').prop('checked',false);
			$('.nowclick .checked').removeClass('checked');
			$('.listbox .lb-up-btn,.listbox .lb-down-btn,.listbox .put-target,.listbox .put-source').addClass('disabled');
			//移除nowclick
			$('.nowclick').removeClass('nowclick');
			//將新點擊的listbox加上nowclick
			$(this).parentsUntil($('.rightmain'),'.listbox').addClass('nowclick');
		}

		var source_box = $(this).parentsUntil($('.rightmain'),'.sourcebox').attr('class');
		var target_box = $(this).parentsUntil($('.rightmain'),'.targetbox').attr('class');
		var now_box = '';
		var now_group = $(this).parentsUntil($('.rightmain'),'.targetbox').attr('data-group');
		var other_box = '';

		if(source_box != undefined){
			now_box = '.sourcebox';
			other_box = '.targetbox';
		}
		else{
			now_box = '.targetbox';
			other_box = '.sourcebox';
		}
		
		$('.nowclick '+other_box+' .checked').find('input').prop('checked',false); //移除另一邊被選擇的對象
		$('.nowclick '+other_box+' .checked').removeClass('checked'); //移除另一邊的標記
		//移除同box不同group的對象和標記
		if(now_box == '.targetbox'){
			$('.nowclick '+now_box+'[data-group!='+now_group+']').find('input').prop('checked',false); 
			$('.nowclick '+now_box+'[data-group!='+now_group+'] .checked').removeClass('checked'); 
		}
		$('.nowclick '+other_box+' tr:first').find('input').prop('checked',false);
		
		if($(this).find('th').html() != undefined){
			if($(this).find('th').hasClass('sort-th') == true && $(this).find('input').prop('checked') == true){
				$(this).parent().siblings().find('tr').addClass('checked');
				$(this).parent().siblings().find('input').prop('checked',true);
				input_click = 0;
			}
			else if($(this).find('th').hasClass('sort-th') == false){
				if((input_click == 1 && $(this).find('input').prop('checked') == false) || (input_click == 0 && $(this).find('input').prop('checked') == true)){
					$(this).find('input').prop('checked',false);
					$('.checked').find('input').prop('checked',false); //true/false""不能""加引號!!
					$('.checked').removeClass('checked');
				}
				else{
					$(this).find('input').prop('checked',true);
					$(this).parent().siblings().find('tr').addClass('checked');
					$(this).parent().siblings().find('input').prop('checked',true);
					$(this).addClass('checked');
				}
				input_click = 0;
			}
			else{
				$(this).find('input').prop('checked',false);
				$('.checked').find('input').prop('checked',false); //true/false""不能""加引號!!
				$('.checked').removeClass('checked');
			}
			
		}
		//按ctrl時點擊
		else if( key == 17 ){
			//若點擊已選取對象則取消選取
			if ( $(this).hasClass('checked')) {
				$(this).find('input').prop('checked',false); //true/false""不能""加引號!!
				$(this).removeClass('checked');
			}
			else{
				$(this).find('input').prop('checked',true);
				$(this).addClass('checked');
			}
			
		} 
		//按shift時點擊
		else if( key == 16 ){
			//在sel_start被刷新成-1前只會記錄一次起始點
			if( sel_start == -1){
				sel_start = $('.checked').index();
				if(sel_start == -1){
					sel_start = 0;
				}
			}
			sel_end = $(this).index();
			var i = Math.abs(sel_start - sel_end);
			if(now_box == '.targetbox'){
				var now_box = now_box+'[data-group='+now_group+']';	
			}
			$(''+now_box+' tr').find('input').prop('checked',false); //true/false""不能""加引號!!
			$(''+now_box+' tr').removeClass('checked');
			while(i >= 0){
				if( sel_start > sel_end){
					i = 0 - i;
				}
				$('.nowclick '+now_box+' tbody tr:eq('+(sel_start+i)+')').find('input').prop('checked',true);
				$('.nowclick '+now_box+' tbody tr:eq('+(sel_start+i)+')').addClass('checked');
				i = Math.abs(i)-1;
				
			}
		}
		else if ($(this).hasClass('checked')) {
				$(this).find('input').prop('checked',false); //true/false""不能""加引號!!
				$(this).removeClass('checked');
			}
		else {
			//若點擊已選取對象，且選取對象等於1個時則取消選取
			if($(this).hasClass('checked') && $(''+now_box+' .checked').length == 1){
				$(this).find('input').prop('checked',false); //true/false""不能""加引號!!
				$(this).removeClass('checked');
				
			}else{
				//$('.checked').find('input').prop('checked',false); //true/false""不能""加引號!!
				//$('.checked').removeClass('checked');
				$(this).find('input').prop('checked',true);
				$(this).addClass('checked');
			}
			
			sel_start = -1;
			sel_end = -1;
		}
		if($(this).parent().find('.checked').length == $(this).parent().find('tr').length ){
			if($(this).parent().parent().find('th').html() != undefined && $(this).parent().parent().find('th input').prop('checked') != true){
				$(this).parent().parent().find('th input').prop('checked',true);
				//$(this).parent().parent().addClass('checked');
			}
		}
		else if($(this).find('th').html() == undefined){
			$(this).parent().parent().find('th input').prop('checked',false);
		}

		//上下移判斷
		btn_disable();
		btn_click();
	});

	$(document).keydown(function(e){
		if ( e.keyCode == 17 ) {
			key = e.keyCode;
		} else if ( e.keyCode == 16 ) {
			key = e.keyCode;
		}
	});

	$(document).keyup(function(e){
		key = 0;
	});
};


//判斷是否禁用按鍵
var btn_disable = function(){
	var group = $('.nowclick .targetbox').has('.checked').attr('data-group');
	var source_chklen = $('.nowclick .sourcebox .checked:has(td)').length; //sourcebox選到的數量
	var target_chklen = $('.nowclick .targetbox[data-group='+group+'] .checked:has(td)').length; //targetbox選到的數量
	var up_status = 0;
	var down_status = 0;

	//只要被選擇到的對象前後不是checked的狀態就能繼續上下移
	$('.nowclick .targetbox .checked').each(function() {
		if($(this).prev().hasClass('checked') == false && $(this).prev().html() != undefined) {
			up_status = 1;
		}
		if($(this).next().hasClass('checked') == false && $(this).next().html() != undefined) {
			down_status = 1;
		}
	});
	
	//判斷是否禁用上鍵//如果第一個前面沒有東西且up_status = 0
	if (target_chklen > 1 || up_status == 0) { 
		$('.nowclick .lb-up-btn').addClass('disabled');
	} else {
		$('.nowclick .move-btn[data-group='+group+'] .lb-up-btn').removeClass('disabled');
		$('.nowclick .move-btn[data-group!='+group+'] .lb-up-btn').addClass('disabled');
	}
	
	//判斷是否禁用下鍵//如果最後一個後面沒有東西且down_status = 0
	if (target_chklen > 1 || down_status == 0) { 
		$('.nowclick .lb-down-btn').addClass('disabled');
	} else {
		$('.nowclick .move-btn[data-group='+group+'] .lb-down-btn').removeClass('disabled');
		$('.nowclick .move-btn[data-group!='+group+'] .lb-down-btn').addClass('disabled');
	}
	//判斷是否禁用左右鍵
	if (source_chklen > 0 ) {
		$('.nowclick .put-btn .put-target').removeClass('disabled').css('display','block');
		$('.nowclick .put-btn .put-source').addClass('disabled').css('display','none');
	} else if (target_chklen > 0) {
		$('.nowclick .put-btn[data-group='+group+'] .put-source').removeClass('disabled').css('display','block');
		$('.nowclick .put-btn[data-group='+group+'] .put-target').addClass('disabled').css('display','none');
		$('.nowclick .put-btn[data-group!='+group+'] i').addClass('disabled');
	} else{
		$('.nowclick .put-btn i').addClass('disabled');
	}
};

var btn_click = function(){
	//點擊put-source(target -> source)
	//將listbox內的按鍵都綁上事件，內容再用nowclick來區分對象
	$('.listbox .lb-up-btn,.listbox .lb-down-btn,.listbox .put-target,.listbox .put-source').off('click');

	$('.nowclick .put-source').click(function() {
		if($(this).hasClass('disabled')){
			return false;
		}
		var group = $(this).parent().attr('data-group');
		$('.nowclick .targetbox .checked:has(td)').each(function() {
			$('.nowclick .sourcebox table').append('<tr>'+$(this).html()+'</tr>');
			$('.nowclick .sourcebox table').find('input[name="target"]').attr('name','source');
			$(this).remove();
		});
		$('.put-source').addClass('disabled');
		$('.targetbox[data-group = '+group+'] tr:first input').prop('checked',false);
		//因為li_event會將全部li綁上事件所以用.listbox而不是用.nowclick
		$('.listbox tr').off('click'); //將全部li解除綁定click事件，避免重複綁定
		li_event(); //綁定click事件
		btn_disable();
		getWidth();
		changeopt($(this).parent().text().trim());
		if($('.listbox-style2').length > 0){
			getTbNameVal($(this).parent().text().trim());	
		}
		
		if(RWD_status == 'Y'){
			if(ww >= 768){
				min_height();		
			}
			else{
				$('.targetbox>div').css('max-height','300px');
			}
		}
		else{
			min_height();	
		}
	});

	//點擊put-target(source -> target)
	$('.nowclick .put-target').click(function() {
		if($(this).hasClass('disabled')){
			return false;
		}
		var group = $(this).parent().attr('data-group');
		$('.nowclick .sourcebox .checked:has(td)').each(function() {
			$('.nowclick .targetbox[data-group = '+group+'] table').append('<tr>'+$(this).html()+'</tr>');
			$('.nowclick .targetbox table').find('input[name="source"]').attr('name','target');
			$(this).remove();
		});
		$('.put-target').addClass('disabled');
		$('.sourcebox tr:first input').prop('checked',false);
		$('.listbox tr').off('click');
		li_event();
		btn_disable();
		getWidth();
		changeopt($(this).parent().text().trim());
		if($('.listbox-style2').length > 0){
			getTbNameVal($(this).parent().text().trim());	
		}

		if(RWD_status == 'Y'){
			if(ww >= 768){
				min_height();		
			}
			else{
				$('.targetbox>div').css('max-height','300px');
			}
		}
		else{
			min_height();	
		}
	});

	//點擊上移
	$('.nowclick .lb-up-btn').click(function() {
		//若有禁止點擊的class就不進行動作
		if($(this).hasClass('disabled') == true){
			return false;
		}
		var up_array = [];
		var i = 0;
		var j = 0;
		$('.nowclick .targetbox .checked').each(function(){
			up_array[i] = $(this); //將被選擇的項目存成陣列
			i++;
		});
		
		for(j=0;j<up_array.length;j++) {
			//若前一項沒有東西且前一項有checked則不進行動作
			if(up_array[j].prev().html() != undefined && up_array[j].prev().hasClass('checked') == false) {
				if(j==0){
					up_array[j].prev().before('<tr class="newchecked">'+up_array[j].html()+'</tr>');
				}
				else{
					var last_up = j-1;
					$('.nowclick .targetbox .checked:eq('+last_up+')').next().before('<tr class="newchecked">'+up_array[j].html()+'</tr>');		
				}
				up_array[j].remove();
				$('.nowclick .targetbox .newchecked').find('input').prop('checked',true);
				$('.nowclick .targetbox .newchecked').removeClass('newchecked').addClass('checked');
				$('.listbox tr').off('click');
			}
		}
		li_event();
		btn_disable();
	});

	//點擊下移
	$('.nowclick .lb-down-btn').click(function() {
		//若有禁止點擊的class就不進行動作
		if($(this).hasClass('disabled') == true){
			return false;
		}
		var down_array = [];
		var i = 0;
		var j = 0;
		$('.nowclick .targetbox .checked').each(function(){
			down_array[i] = $(this); //將被選擇的項目存成陣列
			i++;
		});
		
		var re_down = down_array.reverse(); //倒轉down_array，讓被選擇項目能以倒序執行
		for(j=0;j<re_down.length;j++){
			//若下一項沒有東西且下一項有checked則不進行動作
			if(re_down[j].next().html() != undefined && re_down[j].next().hasClass('checked') == false){
				if(j==0){
					re_down[j].next().after('<tr class="newchecked">'+re_down[j].html()+'</tr>');
				}
				else{
					var last_down = re_down.length-j;
					$('.nowclick .targetbox .checked:eq('+last_down+')').prev().after('<tr class="newchecked">'+re_down[j].html()+'</tr>');		
				}
				re_down[j].remove();
				$('.nowclick .targetbox .newchecked').find('input').prop('checked',true);
				$('.targetbox .newchecked').removeClass('newchecked').addClass('checked');
				$('.listbox tr').off('click');
			}
		}
		li_event();
		btn_disable();
	});
	
};


//判斷是否有data-title
var listboxDataTitle = function() { 
	if ($('.sourcebox[data-title]').html() != undefined || $('.targetbox[data-title]').html() != undefined) {
		$('.sourcebox').parent('.listbox').css('padding-top',30);
		if ( wwlb > 768 ) {
			$('.targetbox').css('margin-top',0);
		} else if ( wwlb <= 768 ) {
			$('.targetbox').css('margin-top',30);
		}
	} else {
		$('.sourcebox').parent('.listbox').css('padding-top',0);
	}
}


function getTbNameVal(getTbNameVal){
	$('.targetbox-content').css('display','none');
	$('.class_select2').val(getTbNameVal)
	$('.targetbox-content').each(function() {
		if ($(this).attr('data-tbname') == getTbNameVal) {
			$(this).css('display','table');
			if($('.listbox-style2').length > 0){
				$(this).find('.put-btn-area').append($('.targetbox-content').not(this).find('.put-btn'));
			}
		}
	});
	getWidth();

}	


function changeopt(tbname){
	var tbIndex = $('.class_select2 option[value="'+tbname+'"]').index();
	var tbNum = $('.targetbox:eq('+tbIndex+') table tbody tr').length;
	$('.class_select2').find('option[value='+tbname+']').text(tbname+'('+tbNum+')');
}


//菜籃式挑選
$(document).ready(function(){

	getWidth();

	$(function(){
		//關閉反白選取
		$('.listbox').attr('unselectable', 'on')
		$('.listbox').css('user-select', 'none')
		$('.listbox').on('selectstart', false);

    });
    
    //關閉所有左右上下按鍵
	$('.listbox .lb-up-btn,.listbox .lb-down-btn,.listbox .put-target,.listbox .put-source').addClass('disabled');
	$('.listbox .put-source').css('display','none');
	//取消所有選取
	$('.listbox th,.listbox td').find('input').prop('checked',false);
	//設定高度
	if(RWD_status == 'Y'){
		if(ww >= 768){
			setTimeout(function(){
				max_height();
				min_height();
			},100);
		}
		else{
			$('.targetbox>div').css('max-height','300px');
		}
	}
	else{
		setTimeout(function(){
			min_height();
		},100);	
	}

	//產生切換targetbox用選單
	var targetboxQut = $('.targetbox-content').length;
	if (targetboxQut > 1 && RWD_status == 'Y') {
		if($('.listbox-style2').length > 0){
			$('.listbox').before('<div class="select_targetbox"><select class="class_select2" onchange="getTbNameVal($(this).val())"></select></div>');
		}
		else{
			$('.targetbox-area').before('<div class="select_targetbox"><select class="class_select2" onchange="getTbNameVal($(this).val())"></select></div>');
		}

		for (var i=0;i<targetboxQut;i++){
			var tbName = $('.targetbox-content:eq('+i+')').attr('data-tbname');
			var tbNum = $('.targetbox:eq('+i+') table tbody tr').length;
			$('.class_select2').append('<option value="'+tbName+'">'+tbName+'('+tbNum+')</option>');
		}	
			
		var wwListBox = window.innerWidth;
		if($('.listbox-style2').length > 0){
			if (wwListBox > 768) {
				$('.listbox').before($('.select_targetbox'));
			} else {
				$('.targetbox-area').before($('.select_targetbox'));
			}
			var classSelectVal = $('.class_select2').val();
			getTbNameVal(classSelectVal);
		}
		else{
			if (wwListBox >= 768) {
				$('.select_targetbox').css('display','none');
				$('.targetbox-content').css('display','block');
			} else {
				$('.targetbox-content').css('display','none');
				$('.select_targetbox').css('display','block');
				var classSelectVal = $('.class_select2').val();
				getTbNameVal(classSelectVal);
			}
		}

		
	}

	li_event();
	btn_disable();
	listboxDataTitle();

	$('.sort-th').click(function(){
		$('.listbox tr').off('click');
		li_event();
	})


	if (head2.indexOf('main_RWD.css') > 0) {
		$(window).bind('resize orientationchange', function() {
			if(wwlb != window.innerWidth){ //若實際上有改變就更新ww並執行adjustMenu()//for iphone resize bug
				wwlb = window.innerWidth;
				listboxDataTitle();
			}
		});
	
	}	

});

