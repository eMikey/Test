var dtStoreLocatorSearchForm = {

	dtInit : function() {


		// Features field slider

			jQuery('.dtsl-sf-features-slider').each(function() {

				var handle_start = jQuery(this).parents('.dtsl-sf-features-field-holder').find('.dtsl-sf-features-start');
				var handle_end = jQuery(this).parents('.dtsl-sf-features-field-holder').find('.dtsl-sf-features-end');

				var slider_handle_start = jQuery(this).find('.dtsl-sf-features-slider-start-handle');
				var slider_handle_end = jQuery(this).find('.dtsl-sf-features-slider-end-handle');

				var min_value = parseInt(jQuery(this).attr('data-min'), 10);
				var max_value = parseInt(jQuery(this).attr('data-max'), 10);
				var item_unit = jQuery(this).attr('data-itemunit');

				var updated_min_value = parseInt(jQuery(this).attr('data-updated-min'), 10);
				var updated_max_value = parseInt(jQuery(this).attr('data-updated-max'), 10);

				jQuery(this).slider({
					range: true,
					min: min_value,
					max: max_value,
					values: [ updated_min_value, updated_max_value ],
					slide: function(event, ui) {

						handle_start.val(ui.values[0]);
						handle_end.val(ui.values[1]);

						var features_range_start = ui.values[0] + item_unit;
						var features_range_end = ui.values[1] + item_unit;

						slider_handle_start.html(features_range_start);
						slider_handle_end.html(features_range_end);

					},
					stop: function(event, ui) {
						if(jQuery(this).hasClass('dtsl-with-ajax-load')) {
							window.setTimeout(function(){
								dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();
							}, 250);
						}
					},
				});

			});


		// Submitting search form

			jQuery( 'body' ).delegate( '.dtsl-submit-searchform', 'click', function(e) {

				var this_item = jQuery(this);

				if(this_item.attr('data-outputtype') == 'separate-page') {

					var separate_page_url = this_item.attr('data-separatepageurl');

					// Creating form with datas

					var formData = '';
					formData += '<form class="dtslSearchForm" action="' + separate_page_url + '" method="post"></form>';

					var searchForm = jQuery(formData);
					jQuery('body').append(searchForm);

					jQuery('.dtsl-sf-fields-holder').each(function() {

						if(jQuery(this).find('.dtsl-chosen-select').length) {

							var selected_items = [];
							selected_items.push(jQuery(this).find('.dtsl-chosen-select').val());

							var item_name = jQuery(this).find('.dtsl-chosen-select').attr('name');
							jQuery('.dtslSearchForm').append('<input type="text" name="'+item_name+'" value="'+selected_items+'" />');

						} else {
							var item_data = jQuery(this).clone();
							jQuery('.dtslSearchForm').append(item_data);
						}

					});

					jQuery(searchForm).submit();

					searchForm.remove();

				} else {

					dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();

				}

				e.preventDefault();

			});


		// On orderby item selection

			jQuery( 'body' ).delegate( '.dtsl-sf-orderby-list a', 'click', function(e) {

				if(jQuery(this).hasClass('active')) {
					jQuery(this).removeClass('active');
				} else {
					jQuery( '.dtsl-sf-orderby-list a' ).removeClass('active');
					jQuery(this).addClass('active');
				}

				if(jQuery(this).parents('.dtsl-sf-orderby-list').hasClass('dtsl-with-ajax-load')) {
					window.setTimeout(function(){
						dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();
					}, 250);
				}

				e.preventDefault();

			});


		// On others item selection

			jQuery( 'body' ).delegate( '.dtsl-sf-others-list-item', 'click', function(e) {

				if(!jQuery(this).hasClass('dtsl-detect-location') && jQuery(this).hasClass('dtsl-with-ajax-load')) {

					if(jQuery(this).hasClass('active')) {
						jQuery(this).removeClass('active');
					} else {
						jQuery(this).addClass('active');
					}

					window.setTimeout(function(){
						dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();
					}, 250);

				}

				e.preventDefault();

			});


		// Ajax load on input change

			jQuery( 'body' ).delegate( '.dtsl-sf-categories.dtsl-with-ajax-load, .dtsl-sf-features.dtsl-with-ajax-load, .dtsl-sf-tags.dtsl-with-ajax-load, .dtsl-sf-ctype.dtsl-with-ajax-load, .dtsl-sf-orderby.dtsl-with-ajax-load, .dtsl-sf-startdate.dtsl-with-ajax-load', 'change', function() {

				window.setTimeout(function(){
					dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();
				}, 250);

			});

			jQuery( 'body' ).delegate( '.dtsl-sf-keyword.dtsl-with-ajax-load, .dtsl-sf-mls-number.dtsl-with-ajax-load', 'input', function() {

				window.setTimeout(function(){
					dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput();
				}, 800);

			});

			jQuery( 'body' ).delegate( '.dtsl-sf-keyword, .dtsl-sf-mls-number', 'keypress', function(e) {

				if(e.which == 13) {
					jQuery('.dtsl-submit-searchform').trigger('click');
					return false;
				}

			});


		// Load data on search form submit click

			jQuery('.dtsl-submit-searchform.dtsl-execute').trigger('click');


	},

};

jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtStoreLocatorSearchForm.dtInit();
	}

});

( function( $ ) {

	"use strict";

	var dtStoreLocatorSearchFormJs = function($scope, $){
		dtStoreLocatorFrontend.dtInit();
		dtStoreLocatorSearchForm.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sf-output-data-container.default', dtStoreLocatorSearchFormJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sf-submit-button.default', dtStoreLocatorSearchFormJs);
		}
	});

} )( jQuery );