// JavaScript Document

$(document).ready(function() {
	var table_RWD = function(table){
		var th_qut = $(table + ' > thead > tr:nth-child(1) > th').length;
		
		var th_en = function(e){
			var re = /[a-zA-Z\d\D]+[^\u4e00-\u9fa5]/; // 英文,數字,符號,不包含中文字
			if(re.test(e)){
				
			}
			return(re.test(e));
		};

		for (var i=1;i<=th_qut;i++){
			
			var text = $(table + '> thead > tr:nth-child(1) > th:nth-child(' + i + ')').html();
			//console.log( $(table + ' th:nth-child(' + i + ')').html());
			if ($(table + ' th:nth-child(' + i + ') a').hasClass('table_href')) {// 去除排序
				text = text.replace(/(<a[^>]*>)|(<[^>]a>)/g,""); // 去除a tag
				text = text.replace(/(<u[^>]*>)|(<[^>]u>)/g,""); // 去除u tag
				text = text.replace(/(<font[^>]*>)|(<[^>]font>)/g,""); // 去除font
				//text = text.replace("<br>","/"); // 去除換行符號
				text = text.replace("<br>",""); // 去除換行符號
				text = text.replace("▲",""); // 去除三角符號
				text = text.replace(" ", ""); // 去除取代後的空白
			}
			
			// 去除新版排序符號
			text = text.replace('<div class="sort-th-content">', "");
			text = text.replace('<div class="sort-th-content sort-up">', "");
			text = text.replace('<div class="sort-th-content sort-down">', "");
			text = text.replace('<div class="default-sort-th-ascending">', "");
			text = text.replace('<div class="default-sort-th-descending">', "");
			text = text.replace('<div class="sort-down-last">', "");
			text = text.replace('<div class="sort-down-last sort-down">', "");
			text = text.replace('<div class="sort-up-last">', "");
			text = text.replace('<div class="sort-up-last sort-up">', "");
			text = text.replace('</div>', "");
			
			var remainder = text.length%4;
			var integer = Math.floor(text.length/4);
			if (text.indexOf('&nbsp;') > -1 || text == '') {// 標題空白
				$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:""}</style>');
			} else if (text.indexOf('checkbox') > -1) {// 核取方塊
				$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"選　　取："}</style>');
			} else if (text.indexOf('<br>') > -1) {// 去除換行符號
				text = text.replace("<br>","/")
				$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"'+text+'：";}</style>');
			} else {
				if (th_en(text)) {// 英文,數字,符號,不包含中文字
					$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"'+text+'："}</style>');
				} else if (integer == 0 && remainder == 3) {// 3個字
					text = text.substr(0,1)	+ ' ' + text.substr(1,1) + ' ' + text.substr(2,1) + ' ';
					$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"'+text+'："}</style>');
				} else if (integer == 0 && remainder == 2) {// 2個字
					text = text.substr(0,1)	+ '　　' + text.substr(1,1);
					$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"'+text+'："}</style>');
				} else {// 其餘
					$('head').append('<style>' + table + ' td:nth-child(' + i + '):before{content:"'+text+'："}</style>');
				}
			}
		}
		
		$(table + ' td').each(function() {// 判斷表格內容是否為空值
			var empty = $(this).html();
			if (empty == '') {
				$(this).html('&nbsp;');
			}
		});
	};
	
	for(h=1;h<=$('table').length;h++){
		//如果只有一個表格
		
		if($('table').length == 1){
			var table = 'table';
		}
		// 判斷表格使用的class名稱
		if ($('table:eq('+(h-1)+')').hasClass('table-om')) {
			$('table:eq('+(h-1)+')').addClass('dtom'+h);
			var table = '.dtom' + h;
		} else if ($('table:eq('+(h-1)+')').hasClass('data_table')) {
			$('table:eq('+(h-1)+')').addClass('dt'+h);
			var table = '.dt' + h;;
		}
		table_RWD(table);		
	}		
	var ww = window.innerWidth;

	if(ww <= 480){
		$(table + ' th').find($( ":checkbox" )).parent("th").addClass("allcheck");
		
		if ($(table).find($(".allcheck")).length > 0) {
			$(table + ' tr:eq(1)').css("border-top", "none");
		}
	}
	
	$(window).resize(function() {		
		var ww = window.innerWidth;
		if(ww <= 480) {
			$(table + ' th').find($( ":checkbox" )).parent("th").addClass("allcheck");

			if ($(table).find($(".allcheck")).length > 0) {
				$(table + ' tr:eq(1)').css("border-top", "none");
			}				
		}
	});

});