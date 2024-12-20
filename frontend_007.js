var dtDirectorMediaVideos = {

	dtInit : function() {

		// Media - Videos Gallery

			var swiperGallery = [];
			var swiperGalleryOptions = [];
			var swiperIterator = 1;

			jQuery('.dtsl-listings-media-videos-container').each(function() {

				var $swiperItem = jQuery(this);
				var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

				swiperGalleryOptions[swiperUniqueId] = [];
				$swiperItem.attr('id', swiperUniqueId);

				// Get swiper options
				var effect = $swiperItem.attr('data-carouseleffect');
				var autoheight = true;

				swiperGalleryOptions[swiperUniqueId]['autoplay_enable'] = false;
				var autoplay_enable = false;
				var autoplay = 0;


				var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
				swiperGalleryOptions[swiperUniqueId]['centeredslides'] = true;
				if(slidesperview > 1) {
					swiperGalleryOptions[swiperUniqueId]['centeredslides'] = false;
				}

				var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;
				var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;
				var direction = 'horizontal';

				var pagination_class = '';
				var pagination_type = '';

				var paginationtype = ($swiperItem.attr('data-carouselpaginationtype') != '') ? $swiperItem.attr('data-carouselpaginationtype') : 'bullets';

				if(paginationtype == 'bullets') {
					var pagination_class = $swiperItem.find('.dtsl-swiper-bullet-pagination');
					var pagination_type = 'bullets';
				}

				if(paginationtype == 'fraction') {
					var pagination_class =  $swiperItem.find('.dtsl-swiper-fraction-pagination');
					var pagination_type = 'fraction';
				}

				if(paginationtype == 'progressbar') {
					var pagination_class =  $swiperItem.find('.dtsl-swiper-progress-pagination');
					var pagination_type = 'progressbar';
				}

				var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
				if(spacebetween) {
					spacebetween = spacebetween;
				} else {
					spacebetween = 0;
				}

				if(slidesperview == 1) {
					var breakpoint_slides_1 = breakpoint_slides_2 = breakpoint_slides_3 = breakpoint_slides_4 = 1;
				} else if(slidesperview == 2) {
					var breakpoint_slides_1 = 2; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1;
				} else if(slidesperview == 3) {
					var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 3; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1;
				} else if(slidesperview >= 4) {
					var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 3; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1;
				}

				// Generate swiper
				swiperGallery[swiperUniqueId] = new Swiper($swiperItem, {

					initialSlide: 0,
					simulateTouch: true,
					roundLengths: true,
					spaceBetween: spacebetween,
					keyboardControl: true,
					paginationClickable: true,
					autoHeight: autoheight,

					grabCursor: true,
					autoplay: {
								enabled: autoplay_enable,
								delay: autoplay,
							},
					slidesPerView: slidesperview,
					loop:loopmode,
					mousewheel: mousewheelcontrol,
					direction: direction,

					hashNavigation: {
						watchState: true
					},

					pagination: {
						el: pagination_class,
						type: pagination_type,
						clickable: true,
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
									'<span class="dtsl-separator"></span>' +
									'<span class="' + totalClass + '"></span>';
						}
					},

					effect: effect,
					coverflowEffect: {
						slideShadows: false,
						rotate: 0,
						stretch: 0,
						depth: 200,
						modifier: 1,
					},
					cubeEffect: {
						slideShadows: true,
						shadow: true,
						shadowOffset: 20,
						shadowScale: 0.94
					},

					breakpoints: {
						1024: {
							slidesPerView: breakpoint_slides_1,
						},
						768: {
							slidesPerView: breakpoint_slides_2,
						},
						640: {
							slidesPerView: breakpoint_slides_3,
						},
						320: {
							slidesPerView: breakpoint_slides_4,
						}
					},

				});


				// Arrow pagination
				var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

				if(arrowpagination) {

					$swiperItem.find('.dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-prev').on('click', function(e) {
						var swiperUniqueId = $swiperItem.attr('id');
						swiperGallery[swiperUniqueId].slidePrev();
						if(swiperGalleryOptions[swiperUniqueId]['autoplay_enable']) {
							swiperGallery[swiperUniqueId].autoplay.start();
						}
						e.preventDefault();
					});

					$swiperItem.find('.dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-next').on('click', function(e) {
						var swiperUniqueId = $swiperItem.attr('id');
						swiperGallery[swiperUniqueId].slideNext();
						if(swiperGalleryOptions[swiperUniqueId]['autoplay_enable']) {
							swiperGallery[swiperUniqueId].autoplay.start();
						}
						e.preventDefault();
					});

				}

				swiperIterator++;

			});

	}

};


jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtDirectorMediaVideos.dtInit();
	}

});


( function( $ ) {

	"use strict";

	var dtDirectorMediaVideosJs = function($scope, $){
		dtDirectorMediaVideos.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sp-media-videos.default', dtDirectorMediaVideosJs);
		}
	});

} )( jQuery );