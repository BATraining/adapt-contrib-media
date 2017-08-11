(function($) {
	$.fn.dragMedia = function(opt) {
		var dragging = false;
		opt = $.extend({handle:"", cursor:"default", container: '', draggableEvent: ''}, opt);

		if(opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.css('cursor', opt.cursor)
			.on("mouseenter", function(e) {
				$(this).attr('style', 'cursor:' + opt.cursor);
			})
			.on("mouseleave", function(e) {
				$(this).attr('style', 'cursor: default');
			})
			.on("mousedown", function(e) {

				$(document).trigger('mediaDraggedStart');

				if(opt.handle === "") {
					var $drag = $(this).addClass('draggable');
				} else {
					var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
				}

				// drag released outside of btn
				$(document).on("mouseup", function() {
					if (window.dragging) {
						$drag.removeClass('draggable').attr('style', 'cursor:' + opt.cursor);
						window.dragging = null;
						$(document).trigger('mediaDraggedEnd');
						$(document).off("mediaDraggedStart mediaDraggedEnd");
					}
				});

				var drg_w = $drag.outerWidth(),
					pos_x = $drag.offset().left + drg_w - e.pageX;

				$drag.css('z-index', 1000).parents(opt.container).on("mousemove", function(e) {
					window.dragging = true;
					var dragEl = $('.draggable');
					dragEl.parents(opt.container).trigger(opt.draggableEvent, e);
					dragEl.offset({
						left: e.pageX + pos_x - drg_w
					}).on("mouseup", function() {
						dragging = false;
						if (window.dragging) {
							window.dragging = null;
							$(document).trigger('mediaDraggedEnd');
						}
					});
				});
				e.preventDefault(); // disable selection
			})
			.on("mouseup", function() {
				if(opt.handle === "") {
					$(this).removeClass('draggable');
				} else {
					$(this).removeClass('active-handle').parent().removeClass('draggable');
				}

				$(document).trigger('mediaDraggedEnd');
			});
	}
})(jQuery);