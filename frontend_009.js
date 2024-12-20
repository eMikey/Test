
var dtDirectorSocialShare = {

	dtInit : function() {

		// Social Share Toggle

			jQuery('.dtsl-listings-social-share-container').each(function () {

				jQuery(this).find('.dtsl-listings-social-share-item-icon').on('click', function(e) {
					jQuery('.dtsl-listings-social-share-container').removeClass('active');
					jQuery(this).parents('.dtsl-listings-social-share-container').toggleClass('active');
					e.stopPropagation();
				});

			});

			jQuery('body:not(.dtsl-listings-social-share-container)').on('click', function() {
				jQuery('.dtsl-listings-social-share-container').each(function () {

					if(jQuery(this).length > 0 && jQuery(this).hasClass('active')) {
						jQuery(this).toggleClass('active');
					}

				});
			});


	}

};


jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtDirectorSocialShare.dtInit();
	}

});


( function( $ ) {

	"use strict";

	var dtDirectorSocialShareJs = function($scope, $){
		dtDirectorSocialShare.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sp-social-share.default', dtDirectorSocialShareJs);
		}
	});

} )( jQuery );