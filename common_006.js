var dtStoreLocatorCommonUtils = {

	dtStoreLocatorBackendAjaxPagination : function() {

		jQuery( 'body' ).delegate( '.dtsl-default-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			if(jQuery(this).parent().hasClass('prev-post')) {
				current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)-1;
			} else if(jQuery(this).parent().hasClass('next-post')) {
				current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)+1;
			} else {
				current_page = jQuery(this).text();
			}

			var post_per_page = jQuery(this).parents('.dtsl-pagination').attr('data-postperpage');

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call = jQuery(this).parents('.dtsl-pagination').attr('data-functioncall');
			var output_div = jQuery(this).parents('.dtsl-pagination').attr('data-outputdiv');

			var user_id = jQuery(this).parents('.dtsl-pagination').attr('data-userid');
			var dashboard_page_id = jQuery(this).parents('.dtsl-pagination').attr('data-dashboardpageid');

			var loader = jQuery(this).parents('.dtsl-pagination').attr('data-loader');
			var loader_parent = jQuery(this).parents('.dtsl-pagination').attr('data-loaderparent');

			var seller_id = jQuery(this).parents('.dtsl-pagination').attr('data-sellerid');


			// ajax call
			jQuery.ajax({
				type: "POST",
				url: dtslcommonobject.ajaxurl,
				data:
				{
					action: function_call,
					ajax_call: true,
					current_page: current_page,
					offset: offset,
					post_per_page: post_per_page,
					function_call: function_call,
					output_div: output_div,
					user_id: user_id,
					dashboard_page_id: dashboard_page_id,
					seller_id: seller_id,
				},
				beforeSend: function(){
					if(loader == 'true') {
						dtStoreLocatorCommonUtils.dtStoreLocatorAjaxBeforeSend(jQuery(loader_parent));
					}
				},
				success: function (response) {
					this_item.parents('.'+output_div).html(response);
				},
				complete: function(){
					if(loader == 'true') {
						dtStoreLocatorCommonUtils.dtStoreLocatorAjaxAfterSend(jQuery(loader_parent));
					}
				}
			});

			e.preventDefault();

		});

	},

	dtStoreLocatorAjaxBeforeSend : function(this_item) {

		if(this_item != undefined) {
			if(!this_item.find('.dtsl-ajax-load-image').hasClass('first')) {
				this_item.find('.dtsl-ajax-load-image').show();
			} else {
				this_item.find('.dtsl-ajax-load-image').removeClass('first');
			}
		} else {
			if(!jQuery('.dtsl-ajax-load-image').hasClass('first')) {
				jQuery('.dtsl-ajax-load-image').show();
			} else {
				jQuery('.dtsl-ajax-load-image').removeClass('first');
			}
		}

	},

	dtStoreLocatorAjaxAfterSend : function(this_item) {
		if(this_item != undefined) {
			this_item.find('.dtsl-ajax-load-image').hide();
		} else {
			jQuery('.dtsl-ajax-load-image').hide();
		}

	},

	dtStoreLocatorChosenSelect : function(this_item) {

		if (jQuery().chosen) {

			jQuery(this_item).each(function(){
				if(jQuery(this).css('display') != 'none') {
					jQuery(this).wrap( '<div class="selection-box"></div>' );
				}
			});


			if(this_item == '.dtsl-social-chosen-select') {
				jQuery(this_item).chosen('destroy');
			}

			jQuery(this_item).chosen({
				no_results_text: dtslcommonobject.noResult,
				inherit_select_classes: true,
				width: '100%'
			}).change(function(e) {
			    jQuery(this_item).find('option').each(function() {
			        if (this_item.selected == true) {
			            jQuery(this_item).trigger('liszt:updated');
			        }
			    });
			});

			jQuery('.dtsl-sf-fields-holder .selection-box').each(function() {
				jQuery( '<span></span>' ).insertAfter( jQuery(this).find('.chosen-search-input') );
			});

		}

	},

};

var dtStoreLocatorCommon = {

	dtInit : function() {
		dtStoreLocatorCommon.dtDefault();
		dtStoreLocatorCommon.dtMediaUploader();
	},

	dtDefault : function() {

		// Pagination - Used in Backend and Dashboard
		dtStoreLocatorCommonUtils.dtStoreLocatorBackendAjaxPagination();

		// Chosen jQuery
		dtStoreLocatorCommonUtils.dtStoreLocatorChosenSelect('.dtsl-chosen-select');

	},

	dtMediaUploader : function() {

		jQuery('body').delegate('.dtsl-upload-media-item-button', 'click', function(e){

			var file_frame = null;
			var item_clicked = jQuery(this);
			var multiple = false;
			var button_text = "Insert Image";

			if(item_clicked.hasClass('multiple')) {
				multiple = true;
				button_text = "Insert Image(s)";
			}

		    file_frame = wp.media.frames.file_frame = wp.media({
		    	multiple: multiple,
		    	title : "Upload / Select Media",
		    	button :{
		    		text : button_text
		    	}
		    });

		    // When an image is selected, run a callback.
		    file_frame.on( 'select', function() {

		    	var attachments = file_frame.state().get('selection').toJSON();

		    	if(item_clicked.hasClass('multiple')) {

			        var items = '';
			        jQuery.each( attachments, function(key, value) {

				        var id = value.id;
				        var title = value.title;
						var image_url = '';

						if(jQuery.type(value.sizes.thumbnail) != 'undefined') {
							image_url =  value.sizes.thumbnail.url;
						} else {
							image_url =  value.sizes.full.url;
						}

			        	items += '<li>'+
			        				'<img src="'+image_url+'"/>'+
                                    '<input name="dtsl_media_attachment_ids[]" type="hidden" class="uploadfieldid hidden" readonly value="'+id+'"/>'+
                                    '<input name="dtsl_media_attachment_titles[]" type="text" class="media-attachment-titles" value="'+title+'"/>'+
                                    '<span class="dtsl-remove-media-item"><span class="fas fa-times"></span></span>'+
                                    '<span class="dtsl-featured-media-item"><span class="far fa-user"></span></span>'+
                                '</li>';

					});

					if(item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-items').length) {
						item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-items').append(items);
					} else {
						var data = '<div class="dtsl-upload-media-items-holder">';
								data += '<ul class="dtsl-upload-media-items">';
								data += items;
								data += '</ul>';
							data += '</div>';
						item_clicked.parents('.dtsl-upload-media-items-container').prepend(data);
					}


		    	} else {

			        var id = attachments[0].id;
			        var url = attachments[0].url;

			        item_clicked.parents('.dtsl-upload-media-items-container').find('.uploadfieldurl').val(url);
			        item_clicked.parents('.dtsl-upload-media-items-container').find('.uploadfieldid').val(id);

			        if(item_clicked.hasClass('show-preview')) {
			        	item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-preview-tooltip img').attr('src', url);
			        } else if(item_clicked.hasClass('show-image-holder')) {
			        	item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-holder img').attr('src', url);
			        }

			    }

		    });

		    // Finally, open the modal
		    file_frame.open();

		});

		jQuery('body').delegate('.dtsl-upload-media-item-reset', 'click', function(e) {

			var item_clicked = jQuery(this);

			if(item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-item-button').hasClass('multiple')) {

				item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-items').html('');

			} else {

		        item_clicked.parents('.dtsl-upload-media-items-container').find('.uploadfieldurl').val('');
		        item_clicked.parents('.dtsl-upload-media-items-container').find('.uploadfieldid').val('');

		        if(item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-item-button').hasClass('show-preview')) {
					var $noimage = item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-preview-tooltip img').attr('data-default');
					item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-preview-tooltip img').attr('src', $noimage);
				} else if(item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-upload-media-item-button').hasClass('show-image-holder')) {
					var $noimage = item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-holder img').attr('data-default');
					item_clicked.parents('.dtsl-upload-media-items-container').find('.dtsl-image-holder img').attr('src', $noimage);
				}

			}

			e.preventDefault();

		});

		jQuery('body').delegate('.dtsl-remove-media-item', 'click', function(e) {

			jQuery(this).parents('li').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtsl-upload-media-items').sortable({ placeholder: 'sortable-placeholder' });
		}

	}

};

jQuery(document).ready(function() {

	"use strict";

	dtStoreLocatorCommon.dtInit();

});