jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtStoreLocatorFrontendUtils.dtStoreLocatorListingImageSwiperGallery();
	}

});


( function( $ ) {

	"use strict";

	var dtDirectorMediaImagesJs = function($scope, $){
		dtStoreLocatorFrontendUtils.dtStoreLocatorListingImageSwiperGallery();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sp-media-images.default', dtDirectorMediaImagesJs);
		}
	});

} )( jQuery );