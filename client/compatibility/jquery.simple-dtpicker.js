/**
 * jquery-simple-datetimepicker (jquery.simple-dtpicker.js)
 * (c) Masanori Ohgita - 2013.
 * https://github.com/mugifly/jquery-simple-datetimepicker
 */

 (function($) {
    var lang = {
    	en: {
    		days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    		months: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    		sep: '-',
    		format: 'YYYY-MM-DD hh:mm',
    		prevMonth: 'Previous month',
    		nextMonth: 'Next month',
    		today: 'Today'
    		},
    	ja: {
    		days: ['日', '月', '火', '水', '木', '金', '土'],
    		months: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
    		sep: '/',
    		format: 'YYYY/MM/DD hh:mm'
    		},
    	ru: {
    		days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    		months: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
    		format: 'DD.MM.YYYY hh:mm'
    		},
    	br: {
    		days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    		months: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
    		format: 'DD/MM/YYYY hh:mm'
    		},
    	pt: {
    		days: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    		months: [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ]
    		},
    	cn: {
    		days: ['日', '一', '二', '三', '四', '五', '六'],
    		months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]
    		},
    	de: {
    		days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    		months: [ "Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez" ],
    		format: 'DD.MM.YYYY hh:mm'
    		},
    	sv: {
    		days: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
    		months: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec" ]
    		},
    	id: {
    		days: ['Min','Sen','Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    		months: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des" ]
    		},
    	it: {
    		days: ['Dom','Lun','Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    		months: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
    		format: 'DD/MM/YYYY hh:mm'
    		},
    	tr: {
    		days: ['Pz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cu', 'Cts'],
    		months: [ "Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Ekm", "Kas", "Arlk" ]
    		},
    	es: {
    		days: ['dom', 'lun', 'mar', 'miér', 'jue', 'vié', 'sáb'],
    		months: [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
    		format: 'DD/MM/YYYY hh:mm'
    		},
    	ko: {
    		days: ['일', '월', '화', '수', '목', '금', '토'],
    		months: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]
    		},
    	nl: {
    		days: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    		months: [ "jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ],
    		format: 'DD-MM-YYYY hh:mm'
    		},
    	cz: {
    		days: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    		months: [ "Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro" ],
    		format: 'DD.MM.YYYY hh:mm'
    		},
    	fr: {
    		days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    		months: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
    		format: 'DD-MM-YYYY hh:mm'
    		},
    	pl: {
    		days: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
    		months: [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ],
    		sep: '-',
    		format: 'YYYY-MM-DD hh:mm',
    		prevMonth: 'Poprzedni miesiąc',
    		nextMonth: 'Następny miesiąc',
    		today: 'Dzisiaj'
    		},
    };

	var PickerObjects = [];
	var InputObjects = [];
	var ActivePickerId = -1;

	var getParentPickerObject = function(obj) {
		return $(obj).closest('.datepicker');
	};

	var getPickersInputObject = function($obj) {
		var $picker = getParentPickerObject($obj);
		if ($picker.data("inputObjectId") != null) {
			return $(InputObjects[$picker.data("inputObjectId")]);
		}
		return null;
	}

	var setToNow = function($obj) {
		var $picker = getParentPickerObject($obj);
		var date = new Date();
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": true
		}, date.getFullYear(), date.getMonth(), date.getDate(), +$(".timelist_item").html().split(':')[0], +$(".timelist_item").html().split(':')[1]);
	};

	var beforeMonth = function($obj) {
		var $picker = getParentPickerObject($obj);
		var date = getPickedDate($picker);
		var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		if (targetMonth_lastDay < date.getDate()) {
			date.setDate(targetMonth_lastDay);
		}
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": true
		}, date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());
    //change here the today date for delivery only to 2 days more.
    if (true) {};
		var todayDate = new Date();
		var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
		var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();

		if (!isCurrentMonth || !$picker.data("futureOnly")) {
			if (targetMonth_lastDay < date.getDate()) {
				date.setDate(targetMonth_lastDay);
			}
			draw($picker, {
				"isAnim": true,
				"isOutputToInputObject": true
			}, date.getFullYear(), date.getMonth() - 1, date.getDate(), date.getHours(), date.getMinutes());
		}
	};

	var nextMonth = function($obj) {
		var $picker = getParentPickerObject($obj);
		var date = getPickedDate($picker);
		var targetMonth_lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		if (targetMonth_lastDay < date.getDate()) {
			date.setDate(targetMonth_lastDay);
		}
		draw($picker, {
			"isAnim": true,
			"isOutputToInputObject": true
		}, date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
	};

	var getDateFormat = function(format, locale, is_date_only) {
		if (format == "default"){
			// Default format
			format = translate(locale,'format');
			if (is_date_only) {
				// Convert the format to date-only (ex: YYYY/MM/DD)
				format = format.substring(0, format.search(' '));
			}
		}
		return format; // Return date-format
	};

	var normalizeYear = function (year) {
		if (year < 99) { // change year for 4 digits
			var date = new Date();
			return parseInt(year) + parseInt(date.getFullYear().toString().substr(0, 2) + "00");
		}
		return year;
	};

	var parseDate = function (str, opt_date_format) {
		if(opt_date_format != null){
			// Parse date & time with date-format

			// Match a string with date format
			var df = opt_date_format.replace(/(-|\/)/g, '[-\/]')
				.replace(/YYYY/gi, '(\\d{2,4})')
				.replace(/(YY|MM|DD|hh|mm)/g, '(\\d{1,2})')
				.replace(/(M|D|h|m)/g, '(\\d{1,2})');
			var re = new RegExp(df);
			var m = re.exec(str);
			if( m != null){

				// Generate the formats array (convert-table)
				var formats = new Array();
				var format_buf = '';
				var format_before_c = '';
				var df = opt_date_format;
				while (df != null && 0 < df.length) {
					var format_c = df.substring(0, 1); df = df.substring(1, df.length);
					if (format_before_c != format_c) {
						if(/(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){
							formats.push( format_buf );
							format_buf = '';
						} else {
							format_buf = '';
						}
					}
					format_buf += format_c;
					format_before_c = format_c;
				}
				if (format_buf != '' && /(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){
					formats.push( format_buf );
				}

				// Convert a string (with convert-table) to a date object
				var date = new Date();
				var is_successful = false;
				for(var i = 0; i < formats.length; i++){
					if(m.length < i){
						break;
					}

					var f = formats[i];
					var d = m[i+1]; // Matched part of date

					if(f == 'YYYY'){
						date.setFullYear(normalizeYear(d));
						is_successful = true;
					} else if(f == 'YY'){
						date.setYear(d);
						is_successful = true;
					} else if(f == 'MM' || f == 'M'){
						date.setMonth(parseInt(d) - 1);
						is_successful = true;
					} else if(f == 'DD' || f == 'D'){
						date.setDate(d);
						is_successful = true;
					} else if(f == 'hh' || f == 'h'){
						date.setHours(d);
						is_successful = true;
					} else if(f == 'mm' || f == 'm'){
						date.setMinutes(d);
						is_successful = true;
					}
				}

				if(is_successful == true && isNaN(date) == false && isNaN(date.getDate()) == false){ // Parse successful
					return date;
				}
			}
		}

		// Parse date & time with common format
		var re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2}) (\d{1,2}):(\d{1,2})$/;
		var m = re.exec(str);
		if (m !== null) {
			m[1] = normalizeYear(m[1]);
			date = new Date(m[1], m[2] - 1, m[3], m[4], m[5]);
		} else {
			// Parse for date-only
			re = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})$/;
			m = re.exec(str);
			if(m !== null) {
				m[1] = normalizeYear(m[1]);
				date = new Date(m[1], m[2] - 1, m[3]);
			}
		}

		if(isNaN(date) == false && isNaN(date.getDate()) == false){ // Parse successful
			return date;
		}
		return false;
	};

	var getFormattedDate = function(date, date_format) {
		if(date == null){
			date = new Date();
		}

		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var hou = date.getHours();
		var min = date.getMinutes();

		var date_format = date_format.replace(/YYYY/gi, y)
		.replace(/YY/g, y - 2000)/* century */
		.replace(/MM/g, zpadding(m))
		.replace(/M/g, m)
		.replace(/DD/g, zpadding(d))
		.replace(/D/g, d)
		.replace(/hh/g, zpadding(hou))
		.replace(/h/g, hou)
		.replace(/mm/g, zpadding(min))
		.replace(/m/g, min);
		return date_format;
	};

	var outputToInputObject = function($picker) {
		var $inp = getPickersInputObject($picker);
		if ($inp == null) {
			return;
		}
		var date = getPickedDate($picker);
		var locale = $picker.data("locale");
		var format = getDateFormat($picker.data("dateFormat"), locale, $picker.data('dateOnly'));

		var old = $inp.val();
		$inp.val(getFormattedDate(date, format));
		if (old != $inp.val()) { // only trigger if it actually changed to avoid a nasty loop condition
			$inp.trigger("change");
		}
	};

	var getPickedDate = function($obj) {
		var $picker = getParentPickerObject($obj);
		return $picker.data("pickedDate");
	};

	var zpadding = function(num) {
		num = ("0" + num).slice(-2);
		return num;
	};

	var draw_date = function($picker, option, date) {
		draw($picker, option, date.getFullYear(), date.getMonth(), date.getDate());
	};
	var translate = function(locale, s) {
		if (typeof lang[locale][s] !== "undefined"){
			return lang[locale][s];
		}
		return lang.en[s];
	};
	var draw = function($picker, option, year, month, day, hour, min) {
		var date = new Date();

		if (hour != null) {
			date = new Date(year, month, day, hour, min, 0);
		} else if (year != null) {
			date = new Date(year, month, day);
		} else {
			date = new Date();
		}
		//console.log("dtpicker - draw()..." + year + "," + month + "," + day + " " + hour + ":" + min + " -> " + date);

		/* Read options */
		var isTodayButton = $picker.data("todayButton");
		var isScroll = option.isAnim; /* It same with isAnim */
		if($picker.data("timelistScroll") == false) {// If disabled by user option.
			isScroll = false;
		}

		var isAnim = option.isAnim;
		if($picker.data("animation") == false){ // If disabled by user option.
			isAnim = false;
		}

		var isFutureOnly = $picker.data("futureOnly");
		var minDate = $picker.data("minDate");
		var maxDate = $picker.data("maxDate");

		var isOutputToInputObject = option.isOutputToInputObject;

		var minuteInterval = $picker.data("minuteInterval");
		var firstDayOfWeek = $picker.data("firstDayOfWeek");

		/* Read locale option */
		var locale = $picker.data("locale");
		if (!lang.hasOwnProperty(locale)) {
			locale = 'en';
		}

		/* Calculate dates */
		var todayDate = new Date();
		var firstWday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - firstDayOfWeek;
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		var beforeMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		var dateBeforeMonth = new Date(date.getFullYear(), date.getMonth(), 0);
		var dateNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
		var isCurrentYear = todayDate.getFullYear() == date.getFullYear();
		var isCurrentMonth = isCurrentYear && todayDate.getMonth() == date.getMonth();
		var isCurrentDay = isCurrentMonth && todayDate.getDate() == date.getDate();
		/* Collect each part */
		var $header = $picker.children('.datepicker_header');
		var $inner = $picker.children('.datepicker_inner_container');
		var $calendar = $picker.children('.datepicker_inner_container').children('.datepicker_calendar');
		var $table = $calendar.children('.datepicker_table');
		var $timelist = $picker.children('.datepicker_inner_container').children('.datepicker_timelist');

		/* Grasp a point that will be changed */
		var changePoint = "";
		var oldDate = getPickedDate($picker);
		if(oldDate != null){
			if(oldDate.getMonth() != date.getMonth() || oldDate.getDate() != date.getDate()){
				changePoint = "calendar";
			} else if (oldDate.getHours() != date.getHours() || oldDate.getMinutes() != date.getMinutes()){
				if(date.getMinutes() == 0 || date.getMinutes() % minuteInterval == 0){
					changePoint = "timelist";
				}
			}
		}


     if ($('#pickUpDateTime').val() !=='') {
     var ifZero0 = $('#pickUpDateTime').val().split(' ')[0];
     var ifZero1 = $('#pickUpDateTime').val().split(' ')[1];

     if (ifZero1 === "00:00") {
       $('#pickUpDateTime').val(ifZero0);
     }
    }

     if ($('#deliveryDateTime').val() !=='') {
     var ifZero0 = $('#deliveryDateTime').val().split(' ')[0];
     var ifZero1 = $('#deliveryDateTime').val().split(' ')[1];

     if (ifZero1 === "00:00") {
       $('#deliveryDateTime').val(ifZero0);
     }
    }

    var pickUpMan = $('#pickUpDateTime').val().substring(0,2);


		/* Save newly date to Picker data */
		$($picker).data("pickedDate", date);

		/* Fade-out animation */
		if (isAnim == true) {
			if(changePoint == "calendar"){
				$calendar.stop().queue([]);
				$calendar.fadeTo("fast", 0.8);
			}else if(changePoint == "timelist"){
				$timelist.stop().queue([]);
				$timelist.fadeTo("fast", 0.8);
			}
		}
		/* Remind timelist scroll state */
		var drawBefore_timeList_scrollTop = $timelist.scrollTop();

		/* New timelist  */
		var timelist_activeTimeCell_offsetTop = -1;

		/* Header ----- */
		$header.children().remove();

		var cDate =  new Date(date.getTime());
		cDate.setMinutes(59);
		cDate.setHours(23);
		cDate.setSeconds(59);
		cDate.setDate(0); // last day of previous month

		if ((!isFutureOnly || !isCurrentMonth)
			&& ((minDate == null) || (minDate < cDate.getTime()))
		) {
			var $link_before_month = $('<a>');
			$link_before_month.text('<');
			$link_before_month.prop('alt', translate(locale,'prevMonth'));
			$link_before_month.prop('title', translate(locale,'prevMonth') );
			$link_before_month.click(function() {
				beforeMonth($picker);
			});
		}

		cDate.setMinutes(0);
		cDate.setHours(0);
		cDate.setSeconds(0);
		cDate.setDate(1); // First day of next month
		cDate.setMonth(date.getMonth() + 1);

		var $now_month = $('<span>');
		$now_month.text(date.getFullYear() + " " + translate(locale, 'sep') + " " + translate(locale, 'months')[date.getMonth()]);

		if ((maxDate == null) || (maxDate > cDate.getTime())) {
			var $link_next_month = $('<a>');
			$link_next_month.text('>');
			$link_next_month.prop('alt', translate(locale,'nextMonth'));
			$link_next_month.prop('title', translate(locale,'nextMonth'));
			$link_next_month.click(function() {
				nextMonth($picker);
			});
		}

		if (isTodayButton) {
			var $link_today = $('<a/>');
			/*
				This icon resource from a part of "FontAwesome" by Dave Gandy - http://fontawesome.io".
				http://fortawesome.github.io/Font-Awesome/license/
				Thankyou.
			*/
			$link_today.addClass('icon-home');
			$link_today.prop('alt', translate(locale,'today'));
			$link_today.prop('title', translate(locale,'today'));
			$link_today.click(function() {
				setToNow($picker);
			});
			$header.append($link_today);
		}

		$header.append($link_before_month);
		$header.append($now_month);
		$header.append($link_next_month);

		/* Calendar > Table ----- */
		$table.children().remove();
		var $tr = $('<tr>');
		$table.append($tr);

		/* Output wday cells */
		var firstDayDiff = 7 + firstDayOfWeek;
		var daysOfWeek = translate(locale,'days');
		for (var i = 0; i < 7; i++) {
			var $td = $('<th>');
			$td.text(daysOfWeek[((i + firstDayDiff) % 7)]);
			$tr.append($td);
		}

		/* Output day cells */
		var cellNum = Math.ceil((firstWday + lastDay) / 7) * 7;
		var i = 0;
		if(firstWday < 0){
			i = -7;
		}
		var realDayObj =  new Date(date.getTime());
		realDayObj.setHours(0);
		realDayObj.setMinutes(0);
		realDayObj.setSeconds(0);
    var X = new Date();
    var xisto = new Date(X.getTime() + 2 * 24 * 60 * 60 * 1000); //
		for (var zz = 0; i < cellNum; i++) {
			var realDay = i + 1 - firstWday;
			var isPast = isCurrentMonth && realDay < xisto.getDate();

			if (i % 7 == 0) {
				$tr = $('<tr>');
				$table.append($tr);
			}

			var $td = $('<td>');
			$td.data("day", realDay);

			$tr.append($td);

			if (firstWday > i) {/* Before months day */
				$td.text(beforeMonthLastDay + realDay);
				$td.addClass('day_another_month');
				$td.data("dateStr", dateBeforeMonth.getFullYear() + "/" + (dateBeforeMonth.getMonth() + 1) + "/" + (beforeMonthLastDay + realDay));
				realDayObj.setDate(beforeMonthLastDay + realDay);
				realDayObj.setMonth(dateBeforeMonth.getMonth() );
				realDayObj.setYear(dateBeforeMonth.getFullYear() );
			} else if (i < firstWday + lastDay) {/* Now months day */
				$td.text(realDay);
				$td.data("dateStr", (date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + realDay);
				realDayObj.setDate( realDay );
				realDayObj.setMonth( date.getMonth()  );
				realDayObj.setYear( date.getFullYear() );
			} else {/* Next months day */
				$td.text(realDay - lastDay);
				$td.addClass('day_another_month');
				$td.data("dateStr", dateNextMonth.getFullYear() + "/" + (dateNextMonth.getMonth() + 1) + "/" + (realDay - lastDay));
				realDayObj.setDate( realDay - lastDay );
				realDayObj.setMonth( dateNextMonth.getMonth() );
				realDayObj.setYear( dateNextMonth.getFullYear() );
			}

			if (((i + firstDayDiff) % 7) == 0) {/* Sunday */
				$td.addClass('wday_sun');
			} else if (((i + firstDayDiff) % 7) == 6) {/* Saturday */
				$td.addClass('wday_sat');
			}

			if (realDay == xisto.getDate()) {/* selected day */
				$td.addClass('active');
			}

			if (isCurrentMonth && realDay == xisto.getDate()) {/* today */
				$td.addClass('today');

			}

      $(".date").click(function() {
      if ($(".timelist_item").html() == undefined) {
        $(".datepicker_timelist").append('<div class="timelist_item other">Choose other day.</div>')
      }
    });
      $(".today").click(function() {
			/* Set event-handler to day cell */
        $(".other").remove();
      if ($(".timelist_item").html() == undefined) {
        $(".datepicker_timelist").append('<div class="timelist_item other">Choose other day.</div>')
      }

    });

			var realDayObjMN =  new Date(realDayObj.getTime());
			realDayObjMN.setHours(23);
			realDayObjMN.setMinutes(59);
			realDayObjMN.setSeconds(59);

			if (
				((minDate != null) && (minDate > realDayObjMN.getTime())) // compare to 23:59:59 on the current day (if MIN is 1pm, then we still need to show this day
				|| ((maxDate != null) && (maxDate < realDayObj.getTime())) // compare to 00:00:00
			) {
				$td.addClass('out_of_range');
			} else if (isFutureOnly && isPast) {
				$td.addClass('day_in_past');
			} else {
				$td.click(function() {
					if ($(this).hasClass('hover')) {
						$(this).removeClass('hover');
					}
					$(this).addClass('active');

					var $picker = getParentPickerObject($(this));
					var targetDate = new Date($(this).data("dateStr"));
					var selectedDate = getPickedDate($picker);
					draw($picker, {
						"isAnim": false,
						"isOutputToInputObject": true
					}, targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), selectedDate.getHours(), selectedDate.getMinutes());
	                                if ($picker.data("dateOnly") == true && $picker.data("isInline") == false && $picker.data("closeOnSelected")){
	                                        // Close a picker
	                                        ActivePickerId = -1;
	                                        $picker.hide();
	                                }
				});


				$td.hover(function() {
					if (! $(this).hasClass('active')) {
						$(this).addClass('hover');
					}
				}, function() {
					if ($(this).hasClass('hover')) {
						$(this).removeClass('hover');
					}
				});
			}
		}

		if ($picker.data("dateOnly") == true) {
			/* dateOnly mode */
			$timelist.css("display", "none");
		} else {
			/* Timelist ----- */
			$timelist.children().remove();

			/* Set height to Timelist (Calendar innerHeight - Calendar padding) */
			if ($calendar.innerHeight() > 0) {
				$timelist.css("height", $calendar.innerHeight() - 10 + 'px');
			}

			realDayObj =  new Date(date.getTime());
			/* Output time cells */
			for (var hour = 6; hour < 19; hour++) {
				for (var min = 0; min < 60; min += minuteInterval) {
					var $o = $('<div>');
					var isPastTime = hour < todayDate.getHours() || (hour == todayDate.getHours() && min < todayDate.getMinutes());
					var isPast = isCurrentDay && isPastTime;

					$o.addClass('timelist_item');
					$o.text(zpadding(hour) + ":" + zpadding(min));

					$o.data("hour", hour);
					$o.data("min", min);

					$timelist.append($o);

					if (hour == date.getHours() && min == date.getMinutes()) {/* selected time */
						$o.addClass('active');
						timelist_activeTimeCell_offsetTop = $o.offset().top;
					}

					/* Set event handler to time cell */

					realDayObj.setHours(hour);
					realDayObj.setMinutes(min);

					if (
						((minDate != null) && (minDate > realDayObj.getTime()))
						|| ((maxDate != null) && (maxDate < realDayObj.getTime()))
					) {
						$o.addClass('out_of_range');
					} else if (isFutureOnly && isPast) {
						$o.addClass('time_in_past');
            $('.time_in_past').remove();
					} else {
						$o.click(function() {
							if ($(this).hasClass('hover')) {
								$(this).removeClass('hover');
							}
							$(this).addClass('active');

							var $picker = getParentPickerObject($(this));
							var date = getPickedDate($picker);
							var hour = $(this).data("hour");
							var min = $(this).data("min");
							draw($picker, {
								"isAnim": false,
								"isOutputToInputObject": true
							}, date.getFullYear(), date.getMonth(), date.getDate(), hour, min);

							if ($picker.data("isInline") == false && $picker.data("closeOnSelected")){
								// Close a picker
								ActivePickerId = -1;
								$picker.hide();
							}
						});

						$o.hover(function() {
							if (! $(this).hasClass('active')) {
								$(this).addClass('hover');
							}
						}, function() {
							if ($(this).hasClass('hover')) {
								$(this).removeClass('hover');
							}
						});
					}
				}
			}

			/* Scroll the timelist */
			if(isScroll == true){
				/* Scroll to new active time-cell position */
				$timelist.scrollTop(timelist_activeTimeCell_offsetTop - $timelist.offset().top);
			}else{
				/* Scroll to position that before redraw. */
				$timelist.scrollTop(drawBefore_timeList_scrollTop);
			}
		}

		/* Fade-in animation */
		if (isAnim == true) {
			if(changePoint == "calendar"){
				$calendar.fadeTo("fast", 1.0);
			}else if(changePoint == "timelist"){
				$timelist.fadeTo("fast", 1.0);
			}
		}

		/* Output to InputForm */
		if (isOutputToInputObject == true) {
			outputToInputObject($picker);
		}
	};

	var init = function($obj, opt) {
		/* Container */
		var $picker = $('<div>');
		$picker.addClass('datepicker');
		$obj.append($picker);

		/* Set current date */
		if(!opt.current) {
			opt.current = new Date();
		} else {
			var format = getDateFormat(opt.dateFormat, opt.locale, opt.dateOnly);
			var date = parseDate(opt.current, format);
			if (date) {
				opt.current = date;
			} else {
				opt.current = new Date();
			}
		}

		/* Set options data to container object  */
		if (opt.inputObjectId != null) {
			$picker.data("inputObjectId", opt.inputObjectId);
		}
		$picker.data("dateOnly", opt.dateOnly);
		$picker.data("pickerId", PickerObjects.length);
		$picker.data("dateFormat", opt.dateFormat);
		$picker.data("locale", opt.locale);
		$picker.data("firstDayOfWeek", opt.firstDayOfWeek);
		$picker.data("animation", opt.animation);
		$picker.data("closeOnSelected", opt.closeOnSelected);
		$picker.data("timelistScroll", opt.timelistScroll);
		$picker.data("calendarMouseScroll", opt.calendarMouseScroll);
		$picker.data("todayButton", opt.todayButton);
		$picker.data('futureOnly', opt.futureOnly);

		var minDate = Date.parse(opt.minDate);
		if (Number.isNaN(minDate)) { // invalid date?
			$picker.data('minDate', null); // set to null
		} else {
			$picker.data('minDate', minDate);
		}

		var maxDate = Date.parse(opt.maxDate);
		if (Number.isNaN(maxDate)) { // invalid date?
			$picker.data('maxDate', null);  // set to null
		} else {
			$picker.data('maxDate', maxDate);
		}
		$picker.data("state", 0);

		if( 5 <= opt.minuteInterval && opt.minuteInterval <= 30 ){
			$picker.data("minuteInterval", opt.minuteInterval);
		} else {
			$picker.data("minuteInterval", 30);
		}

		/* Header */
		var $header = $('<div>');
		$header.addClass('datepicker_header');
		$picker.append($header);
		/* InnerContainer*/
		var $inner = $('<div>');
		$inner.addClass('datepicker_inner_container');
		$picker.append($inner);
		/* Calendar */
		var $calendar = $('<div>');
		$calendar.addClass('datepicker_calendar');
		var $table = $('<table>');
		$table.addClass('datepicker_table');
		$calendar.append($table);
		$inner.append($calendar);
		/* Timelist */
		var $timelist = $('<div>');
		$timelist.addClass('datepicker_timelist');
		$inner.append($timelist);

		/* Set event handler to picker */
		$picker.hover(
			function(){
				ActivePickerId = $(this).data("pickerId");
			},
			function(){
				ActivePickerId = -1;
			}
		);

		/* Set event-handler to calendar */
		if (opt.calendarMouseScroll) {
			if (window.sidebar) { // Mozilla Firefox
				$calendar.bind('DOMMouseScroll', function(e){ // Change a month with mouse wheel scroll for Fx
					var $picker = getParentPickerObject($(this));

					// up,left [delta < 0] down,right [delta > 0]
					var delta = e.originalEvent.detail;
					/*
					// this code need to be commented - it's seems to be unnecessary
					// normalization (/3) is not needed as we move one month back or forth
					if(e.originalEvent.axis !== undefined && e.originalEvent.axis == e.originalEvent.HORIZONTAL_AXIS){
						e.deltaX = delta;
						e.deltaY = 0;
					} else {
						e.deltaX = 0;
						e.deltaY = delta;
					}
					e.deltaX /= 3;
					e.deltaY /= 3;
					*/
					if(delta > 0) {
						nextMonth($picker);
					} else {
						beforeMonth($picker);
					}
					return false;
				});
			} else { // Other browsers
				$calendar.bind('mousewheel', function(e){ // Change a month with mouse wheel scroll
					var $picker = getParentPickerObject($(this));
					// up [delta > 0] down [delta < 0]
					if(e.originalEvent.wheelDelta /120 > 0) {
						beforeMonth($picker);
					} else {
						nextMonth($picker);
					}
					return false;
				});
			}
		}

		PickerObjects.push($picker);

		draw_date($picker, {
			"isAnim": true,
			"isOutputToInputObject": opt.autodateOnStart
		}, opt.current);
	};

	var getDefaults = function() {
		return {
			"current": null,
			"dateFormat": "default",
			"locale": "en",
			"animation": true,
			"minuteInterval": 30,
			"firstDayOfWeek": 0,
			"closeOnSelected": false,
			"timelistScroll": true,
			"calendarMouseScroll": true,
			"todayButton": false,
			"dateOnly": false,
			"futureOnly": false,
			"minDate" : null,
			"maxDate" : null,
			"autodateOnStart": true
		};
	};

	/**
	 * Initialize dtpicker
	 */
	 $.fn.dtpicker = function(config) {


    var date = new Date();

		var defaults = getDefaults();

		defaults.inputObjectId = undefined;
		var options = $.extend(defaults, config);

		return this.each(function(i) {
			init($(this), options);
		});
	 };

	/**
	 * Initialize dtpicker, append to Text input field
	 * */
	 $.fn.appendDtpicker = function(config) {
    //Esse é a data inicial não esquecer
    var date = new Date();
		var defaults = getDefaults();

		defaults.inline = false;
		var options = $.extend(defaults, config);

		return this.each(function(i) {

			/* Add input-field with inputsObjects array */
			var input = this;
			var inputObjectId = InputObjects.length;
			InputObjects.push(input);

			options.inputObjectId = inputObjectId;

			/* Current date */
			var date, strDate, strTime;
			if($(input).val() != null && $(input).val() != ""){
				options.current = $(input).val();
			}

			/* Make parent-div for picker */
			var $d = $('<div>');
			if(options.inline == false){
				/* float mode */
				$d.css("position","absolute");
			}
			$d.insertAfter(input);

			/* Initialize picker */

			var pickerId = PickerObjects.length;

			var $picker_parent = $($d).dtpicker(options); // call dtpicker() method

			var $picker = $picker_parent.children('.datepicker');

			/* Link input-field with picker*/
			$(input).data('pickerId', pickerId);

			/* Set event handler to input-field */

			$(input).keyup(function() {
				var $input = $(this);
				var $picker = $(PickerObjects[$input.data('pickerId')]);
				if ($input.val() != null && (
					$input.data('beforeVal') == null ||
					( $input.data('beforeVal') != null && $input.data('beforeVal') != $input.val())	)
					) { /* beforeValue == null || beforeValue != nowValue  */
					var format = getDateFormat($picker.data('dateFormat'), $picker.data('locale'), $picker.data('dateOnly'));
					var date = parseDate($input.val(), format);
					if (date) {
						draw_date($picker, {
							"isAnim":true,
							"isOutputToInputObject":false
						}, date);
					}
				}
				$input.data('beforeVal',$input.val())
			});

			$(input).change(function(){
				$(this).trigger('keyup');
			});

			if(options.inline == true){
				/* inline mode */
				$picker.data('isInline',true);
			}else{
				/* float mode */
				$picker.data('isInline',false);
				$picker_parent.css({
					"zIndex": 100
				});
				$picker.css("width","auto");

				/* Hide this picker */
				$picker.hide();

				/* Set onClick event handler for input-field */
				$(input).click(function(){
					var $input = $(this);
					var $picker = $(PickerObjects[$input.data('pickerId')]);
					ActivePickerId = $input.data('pickerId');
					$picker.show();
					var _position = $(input).parent().css('position');
					if(_position === 'relative' || _position === 'absolute'){
						$picker.parent().css("top", $input.outerHeight() + 2 + "px");
					}
					else{
						$picker.parent().css("top", $input.position().top + $input.outerHeight() + 2 + "px");
						$picker.parent().css("left", $input.position().left + "px");
					}
				});
			}
		});
	};

	/* Set event handler to Body element, for hide a floated-picker */
	$(function(){
		$('body').click(function(){
			for(var i=0;i<PickerObjects.length;i++){
				var $picker = $(PickerObjects[i]);
				if(ActivePickerId != i){	/* if not-active picker */
					if($picker.data("inputObjectId") != null && $picker.data("isInline") == false){
						/* if append input-field && float picker */
						$picker.hide();
					}
				}
			}
		});
	});

})(jQuery);
