(function($) {
	//https://codepen.io/chriscoyier/pen/zdsty
	$.fn.dragMedia = function(opt) {
		var dragging = false;
		opt = $.extend({handle:"", cursor:"move", container: '', draggableEvent: ''}, opt);

		if(opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
			if(opt.handle === "") {
				var $drag = $(this).addClass('draggable');
			} else {
				var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
			}

			$(document).on("mouseup", function() {
				if (dragging) {
					$(this).trigger('draggedEnd');
					$drag.removeClass('draggable').attr('style', 'cursor:' + opt.cursor);
					dragging = false;
				}
			});

			var drg_w = $drag.outerWidth(),
				pos_x = $drag.offset().left + drg_w - e.pageX;
			$drag.css('z-index', 1000).parents().on("mousemove", function(e) {
				dragging = true;
				var dragEl = $('.draggable');
				dragEl.parents(opt.container).trigger(opt.draggableEvent, e);
				dragEl.offset({
					left: e.pageX + pos_x - drg_w
				});
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function() {
			if(opt.handle === "") {
				$(this).removeClass('draggable').removeAttr('style');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable').removeAttr('style');
			}
		});
	}
})(jQuery);