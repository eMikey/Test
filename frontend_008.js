jQuery(document).ready(function() {

	"use strict";

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectoryFrontendUtils.dtDirectoryListingImageSwiperGallery();
	}

});


( function( $ ) {

	"use strict";

	var dtDirectorMediaImagesJs = function($scope, $){
		dtDirectoryFrontendUtils.dtDirectoryListingImageSwiperGallery();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-media-images.default', dtDirectorMediaImagesJs);
		}
	});

} )( jQuery );