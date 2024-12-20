var dtStoreLocatorFrontendUtils = {

	dtStoreLocatorListingsListingIsotope : function() {

	    jQuery('.dtsl-listings-item-apply-isotope .dtsl-listings-item-container').each(function() {

	    	var this_item = jQuery(this);

	        this_item.isotope({
				itemSelector: '.dtsl-column',
				percentPosition: true,
				masonry: {
					columnWidth: '.grid-sizer'
				}
	        });

			window.setTimeout(function(){
				this_item.isotope();
			}, 1400);

	    });

	    jQuery('.dtsl-listings-item-apply-isotope .dtsl-listings-item-isotope-filter').each(function() {

	    	var isotope_filter = jQuery(this);

			isotope_filter.find('a').on('click', function() {

				isotope_filter.find('a').removeClass('active-sort');
				var selector = jQuery(this).attr('data-filter');
				jQuery(this).addClass('active-sort');

				jQuery(this).parents('.dtsl-listings-item-apply-isotope').find('.dtsl-listings-item-container').isotope({ filter: selector, masonry: {  }, animationEngine : 'jquery' });

				return false;

			});

	    });


	},

	dtStoreLocatorListingCarousel : function(output_container) {

		var swiperGalleryListing = [];
		var swiperGalleryListingOptions = [];
		var swiperListingIterator = 1;

		output_container.find('.dtsl-listings-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperListingIterator;
			swiperGalleryListingOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = output_container.attr('data-carouseleffect');

			var autoplay = parseInt(output_container.attr('data-carouselautoplay'), 10);
			var autoplay_enable = false;
			if(autoplay > 0) {
				autoplay_enable = true;
				swiperGalleryListingOptions[swiperUniqueId]['autoplay'] = autoplay;
			} else {
				swiperGalleryListingOptions[swiperUniqueId]['autoplay'] = 0;
			}

			var slidesperview = parseInt(output_container.attr('data-carouselslidesperview'), 10);
			var loopmode = (output_container.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = (output_container.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;

			var pagination_class = '';
			var pagination_type = '';

			if(output_container.attr('data-carouselbulletpagination') == 'true') {
				var pagination_class = output_container.find('.dtsl-swiper-bullet-pagination');
				var pagination_type = 'bullets';
			}

			var spacebetween = parseInt(output_container.attr('data-carouselspacebetween'), 10);
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
				var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1;
			} else if(slidesperview >= 4) {
				var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 1;
			}

			// Generate swiper
		    swiperGalleryListing[swiperUniqueId] = new Swiper($swiperItem, {

     			initialSlide: 0,
                simulateTouch: true,
                roundLengths: true,
                spaceBetween: spacebetween,
                keyboardControl: true,
                paginationClickable: true,
                autoHeight: true,

                grabCursor: true,
                autoplay: {
                			enabled: autoplay_enable,
						    delay: autoplay,
						},
                slidesPerView: slidesperview,
                loop:loopmode,
                mousewheel: mousewheelcontrol,

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
		            0: {
		                slidesPerView: breakpoint_slides_4,
		            },
		            768: {
		                slidesPerView: breakpoint_slides_3,
		            },
		            1025: {
		                slidesPerView: breakpoint_slides_2,
		            },
		            1280: {
		                slidesPerView: breakpoint_slides_1,
		            }
		        },

		    });

		    if(output_container.attr('data-carouselarrowpagination') == 'true') {

			    output_container.find('.dtsl-swiper-pagination-holder .dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-prev').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
			        swiperGalleryListing[swiperUniqueId].slidePrev();
			        if(swiperGalleryListingOptions[swiperUniqueId]['autoplay'] > 0) {
			        	swiperGalleryListing[swiperUniqueId].autoplay.start();
			        }
			        e.preventDefault();
			    });

			    output_container.find('.dtsl-swiper-pagination-holder .dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-next').on('click', function(e) {
			    	var swiperUniqueId = $swiperItem.attr('id');
			        swiperGalleryListing[swiperUniqueId].slideNext();
			        if(swiperGalleryListingOptions[swiperUniqueId]['autoplay'] > 0 ) {
			        	swiperGalleryListing[swiperUniqueId].autoplay.start();
			        }
			        e.preventDefault();
			    });

			}

		    swiperListingIterator++;

		});

	},

	dtStoreLocatorFilterOptions : function() {

		// Keyword
		var keyword = jQuery('.dtsl-sf-keyword').val();

    	// Location
		var user_latitude = jQuery('.dtsl-sf-location-latitude').val();
		var user_longitude = jQuery('.dtsl-sf-location-longitude').val();

		var radius = radius_unit = '';
		if(user_latitude != '' && user_latitude != '') {
			if(jQuery('.dtsl-sf-radius').length > 0 && jQuery('.dtsl-sf-radius-unit').length > 0) {
				var radius      = jQuery('.dtsl-sf-radius').val();
				var radius_unit = jQuery('.dtsl-sf-radius-unit').val();
			} else if(jQuery('.dtsl-sf-location-max-radius').length > 0 && jQuery('.dtsl-sf-location-radius-unit').length > 0) {
				var radius      = jQuery('.dtsl-sf-location-max-radius').val();
				var radius_unit = jQuery('.dtsl-sf-location-radius-unit').val();
			}
		}


		// Categories
		var categories = jQuery('.dtsl-sf-categories option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(categories.length === 0) {
			var categories = jQuery('.dtsl-sf-categories:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Tags
		var tags = jQuery('.dtsl-sf-tags option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(tags.length === 0) {
			var tags = jQuery('.dtsl-sf-tags:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Cities
		var cities = jQuery('.dtsl-sf-cities option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(cities.length === 0) {
			var cities = jQuery('.dtsl-sf-cities:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Neighborhood
		var neighborhood = jQuery('.dtsl-sf-neighborhood option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(neighborhood.length === 0) {
			var neighborhood = jQuery('.dtsl-sf-neighborhood:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Counties / States
		var countystate = jQuery('.dtsl-sf-countystate option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(countystate.length === 0) {
			var countystate = jQuery('.dtsl-sf-countystate:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Countries
		var countries = jQuery('.dtsl-sf-countries option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(countries.length === 0) {
			var countries = jQuery('.dtsl-sf-countries:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Contract Types
		var ctype = jQuery('.dtsl-sf-ctype option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(ctype.length === 0) {
			var ctype = jQuery('.dtsl-sf-ctype:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Start Date
		var startdate = jQuery('.dtsl-sf-startdate').val();

		// Price Range
		var pricerange_start = jQuery('.dtsl-sf-pricerange-start').val();
		var pricerange_end = jQuery('.dtsl-sf-pricerange-end').val();

		// Features
		var features_query = {};
		var features_total_query = 0;
		jQuery('.dtsl-sf-features-field-holder').each(function () {

			var field_type = jQuery(this).find('.dtsl-sf-features-field-type').val();

			var tab_id = jQuery(this).find('.dtsl-sf-features-tab-id').val();

			var features_item_data = {};

			features_item_data['field_type'] = field_type;

			if(field_type == 'dropdown' || field_type == 'list') {

				var item_values = jQuery(this).find('.dtsl-sf-features option:selected').map(function(){
					if(this.value != '') {
						return this.value;
					}
				}).get();
				if(item_values.length === 0) {
					var item_values = jQuery(this).find('.dtsl-sf-features:checked').map(function(){
						if(this.value != '') {
							return this.value;
						}
					}).get();
				}

				features_item_data['item_values'] = item_values;

				if(item_values.length != 0) {
					features_total_query = features_total_query + 1;
				}

			} else if(field_type == 'range') {

				var start = jQuery(this).find('.dtsl-sf-features-start').val();
				var end = jQuery(this).find('.dtsl-sf-features-end').val();

				features_item_data['start'] = start;
				features_item_data['end'] = end;

				features_total_query = features_total_query + 1;

			}

			features_query[tab_id] = features_item_data;

		});


		// Sellers
		var sellers = jQuery('.dtsl-sf-sellers option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(sellers.length === 0) {
			var sellers = jQuery('.dtsl-sf-sellers:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}

		// Incharges
		var incharges = jQuery('.dtsl-sf-incharges option:selected').map(function(){
			if(this.value != '') {
				return this.value;
			}
		}).get();
		if(incharges.length === 0) {
			var incharges = jQuery('.dtsl-sf-incharges:checked').map(function(){
				if(this.value != '') {
					return this.value;
				}
			}).get();
		}


		// Order By
		var orderby = jQuery('.dtsl-sf-orderby option:selected').val();
		if(orderby === undefined) {
			var orderby = jQuery('.dtsl-sf-orderby-list a.active').attr('data-itemvalue');
		}

		// MLS Number
		var mls_number = jQuery('.dtsl-sf-mls-number').val();

		// Others
		var others = jQuery('.dtsl-sf-others-list-item.active').map(function(){
			if(jQuery(this).attr('data-itemvalue') != '') {
				return jQuery(this).attr('data-itemvalue');
			}
		}).get();


		// Radius

		if(jQuery.inArray( 'nearby', others ) > -1) {

			if((radius == '' && radius_unit == '') || (radius == undefined && radius_unit == undefined)) {
				var radius = jQuery('.dtsl-sf-location-max-radius').val();
				var radius_unit = jQuery('.dtsl-sf-location-radius-unit').val();
			}

			if(radius == undefined && radius_unit == undefined) {
				var radius = 100;
				var radius_unit = 'km';
			}

		}

		var use_radius = '';
		if((radius != '' && radius_unit != '') && (radius != undefined && radius_unit != undefined)) {
			var use_radius = 'true';
		}


		// Create array
		var filter_data = {};
		filter_data['keyword']              = keyword;
		filter_data['user_latitude']        = user_latitude;
		filter_data['user_longitude']       = user_longitude;
		filter_data['use_radius']           = use_radius;
		filter_data['radius']               = radius;
		filter_data['radius_unit']          = radius_unit;
		filter_data['categories']           = categories;
		filter_data['tags']                 = tags;
		filter_data['cities']               = cities;
		filter_data['neighborhood']         = neighborhood;
		filter_data['countystate']          = countystate;
		filter_data['countries']            = countries;
		filter_data['ctype']                = ctype;
		filter_data['startdate']            = startdate;
		filter_data['pricerange_start']     = pricerange_start;
		filter_data['pricerange_end']       = pricerange_end;
		filter_data['features_query']       = features_query;
		filter_data['features_total_query'] = features_total_query;
		filter_data['sellers']              = sellers;
		filter_data['incharges']            = incharges;
		filter_data['orderby']              = orderby;
		filter_data['mls_number']           = mls_number;
		filter_data['others']               = others;

		return filter_data;

	},

	dtStoreLocatorLoadDataOutput : function(output_container) {

		var load_data = load_map = 'false';

		if(output_container == undefined) {

			var output_container = map_output_container = '';
			if(jQuery('.dtsl-listing-output-data-container.dtsl-search-list-items').length) {
				var output_container = jQuery('.dtsl-listing-output-data-container.dtsl-search-list-items');
				load_data = 'true';
			}

			if(jQuery('.dtsl-listing-output-map-container.dtsl-search-list-items').length) {
				var map_output_container = jQuery('.dtsl-listing-output-map-container.dtsl-search-list-items');
				load_map = 'true';
			}

			if(load_data == 'false' && load_map == 'false') {
				alert(dtslfrontendobject.outputDivAlert);
				return;
			}

		} else {

			if(output_container.hasClass('dtsl-listing-output-data-container')) {
				load_data = 'true';
			} else if(output_container.hasClass('dtsl-listing-output-map-container')) {
				var map_output_container = output_container;
				output_container = '';
				load_map = 'true';
			}

		}

		if(load_data == 'true') {
			var parent_item = output_container;
		} else if(load_map == 'true') {
			var parent_item = map_output_container;
		}

		// Default options

		var enable_carousel = keyword = user_latitude = user_longitude = use_radius = radius = radius_unit = list_items = categories = tags = cities = neighborhood = countystate = countries = ctype = startdate = pricerange_start = pricerange_end = features_query = features_total_query = sellers = incharges = orderby = mls_number = others = '';

		var type = gallery = post_per_page = columns = apply_isotope = excerpt_length = features_image_or_icon = features_include = no_of_cat_to_display = apply_equal_height = apply_category_toggle = category_toggle_type ='';

		var isotope_filter = apply_child_of = featured_items = custom_options = '';

		if(load_data == 'true') {

			type                   = output_container.find('.dtsl-listing-output-data-holder').attr('data-type');
			gallery                = output_container.find('.dtsl-listing-output-data-holder').attr('data-gallery');
			post_per_page          = output_container.find('.dtsl-listing-output-data-holder').attr('data-postperpage');
			columns                = output_container.find('.dtsl-listing-output-data-holder').attr('data-columns');
			apply_isotope          = output_container.find('.dtsl-listing-output-data-holder').attr('data-applyisotope');
			excerpt_length         = output_container.find('.dtsl-listing-output-data-holder').attr('data-excerptlength');
			features_image_or_icon = output_container.find('.dtsl-listing-output-data-holder').attr('data-featuresimageoricon');
			features_include       = output_container.find('.dtsl-listing-output-data-holder').attr('data-featuresinclude');
			no_of_cat_to_display   = output_container.find('.dtsl-listing-output-data-holder').attr('data-noofcattodisplay');
			apply_equal_height     = output_container.find('.dtsl-listing-output-data-holder').attr('data-applyequalheight');
			apply_category_toggle  = output_container.find('.dtsl-listing-output-data-holder').attr('data-applycategorytoggle');
			category_toggle_type   = output_container.find('.dtsl-listing-output-data-holder').attr('data-categorytoggletype');

			isotope_filter         = output_container.find('.dtsl-listing-output-data-holder').attr('data-isotopefilter');
			apply_child_of         = output_container.find('.dtsl-listing-output-data-holder').attr('data-applychildof');
			featured_items         = output_container.find('.dtsl-listing-output-data-holder').attr('data-featureditems');
			custom_options         = output_container.find('.dtsl-listing-output-data-holder').attr('data-customoptions');

		}

		// Direct item listings

		if((load_data == 'true' && output_container.hasClass('dtsl-direct-list-items')) || (load_map == 'true' && map_output_container.hasClass('dtsl-direct-list-items'))) {

			var item_type = output_holder_type = '';
			if(load_data == 'true') {
				item_type = 'data';
				output_holder_type = output_container;
			} else if(load_map == 'true') {
				item_type = 'map';
				output_holder_type = map_output_container;
			}

			// Filters

			var list_item_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-listitemids');
			if(list_item_ids != undefined && list_item_ids != '') {
				list_items = list_item_ids.split(',');
			}

			var category_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-categoryids');
			if(category_ids != undefined && category_ids != '') {
				categories = category_ids.split(',');
			}

			var cities_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-citiesids');
			if(cities_ids != undefined && cities_ids != '') {
				cities = cities_ids.split(',');
			}

			var neighborhoods_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-neighborhoodsids');
			if(neighborhoods_ids != undefined && neighborhoods_ids != '') {
				neighborhood = neighborhoods_ids.split(',');
			}

			var countiesstates_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-countiesstatesids');
			if(countiesstates_ids != undefined && countiesstates_ids != '') {
				countystate = countiesstates_ids.split(',');
			}

			var contracttypes_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-contracttypesids');
			if(contracttypes_ids != undefined && contracttypes_ids != '') {
				ctype = contracttypes_ids.split(',');
			}

			var tag_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-tagids');
			if(tag_ids != undefined && tag_ids != '') {
				tags = tag_ids.split(',');
			}

			var country_id = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-countryid');
			if(country_id != undefined && country_id != '') {
				countries = country_id.split(',');
			}

			var seller_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-sellerids');
			if(seller_ids != undefined && seller_ids != '') {
				sellers = seller_ids.split(',');
			}

			var incharge_ids = output_holder_type.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-inchargeids');
			if(incharge_ids != undefined && incharge_ids != '') {
				incharges = incharge_ids.split(',');
			}

			// Carousel

			var enable_carousel = output_holder_type.attr('data-enablecarousel');


		} else {

			// Filter options

			var filter_data      = dtStoreLocatorFrontendUtils.dtStoreLocatorFilterOptions();
			keyword              = filter_data.keyword;
			user_latitude        = filter_data.user_latitude;
			user_longitude       = filter_data.user_longitude;
			use_radius           = filter_data.use_radius;
			radius               = filter_data.radius;
			radius_unit          = filter_data.radius_unit;
			categories           = filter_data.categories;
			tags                 = filter_data.tags;
			cities               = filter_data.cities;
			neighborhood         = filter_data.neighborhood;
			countystate          = filter_data.countystate;
			countries            = filter_data.countries;
			ctype                = filter_data.ctype;
			startdate            = filter_data.startdate;
			pricerange_start     = filter_data.pricerange_start;
			pricerange_end       = filter_data.pricerange_end;
			features_query       = filter_data.features_query;
			features_total_query = filter_data.features_total_query;
			sellers              = filter_data.sellers;
			incharges            = filter_data.incharges;
			orderby              = filter_data.orderby;
			mls_number           = filter_data.mls_number;
			others               = filter_data.others;

			// Filter Option in Output Data Container
			if(categories == '') {
				if(load_data == 'true') {
					var category_ids = output_container.find('.dtsl-listing-output-data-holder').attr('data-categoryids');
				} else if(load_map == 'true') {
					var category_ids = map_output_container.find('.dtsl-listing-output-map-holder').attr('data-categoryids');
				}
				if(category_ids != undefined && category_ids != '') {
					categories = category_ids.split(',');
				}
			}

		}

		var data_apply_isotope = apply_isotope;
		var data_load_map      = load_map;

		jQuery.ajax({
			type: "POST",
			url: dtslfrontendobject.ajaxurl,
			dataType: "JSON",
			data:
			{
				action                : 'dtsl_generate_load_search_data_ouput',
				current_page          : 1,
				offset                : 0,
				type                  : type,
				gallery               : gallery,
				post_per_page         : post_per_page,
				columns               : columns,
				apply_isotope         : apply_isotope,
				isotope_filter        : isotope_filter,
				apply_child_of        : apply_child_of,
				featured_items        : featured_items,
				excerpt_length        : excerpt_length,
				features_image_or_icon: features_image_or_icon,
				features_include      : features_include,
				no_of_cat_to_display  : no_of_cat_to_display,
				apply_equal_height    : apply_equal_height,
				apply_category_toggle : apply_category_toggle,
				category_toggle_type  : category_toggle_type,

				custom_options        : custom_options,

				keyword               : keyword,
				user_latitude         : user_latitude,
				user_longitude        : user_longitude,
				use_radius            : use_radius,
				radius                : radius,
				radius_unit           : radius_unit,
				list_items            : list_items,
				categories            : categories,
				tags                  : tags,
				cities                : cities,
				neighborhood          : neighborhood,
				countystate           : countystate,
				countries             : countries,
				ctype                 : ctype,
				startdate             : startdate,
				pricerange_start      : pricerange_start,
				pricerange_end        : pricerange_end,
				features_query        : features_query,
				features_total_query  : features_total_query,
				sellers               : sellers,
				incharges             : incharges,
				orderby               : orderby,
				mls_number            : mls_number,
				others                : others,

				enable_carousel       : enable_carousel,
				load_data             : load_data,
				load_map              : load_map
			},
			beforeSend: function(){
				dtStoreLocatorCommonUtils.dtStoreLocatorAjaxBeforeSend(parent_item);
			},
			success: function (response) {

				// Load data
				if(load_data == 'true') {

					output_container.find('.dtsl-listing-output-data-holder').html(response.data);

					if(data_apply_isotope == 'true') {
						// Isotope
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingsListingIsotope();
					} else if(enable_carousel == 'true') {
						// Carousel
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingCarousel(output_container);
					} else if(apply_equal_height == 'true') {
						// Equal Height
						output_container.find('.dtsl-listings-item-wrapper').matchHeight({ property:"min-height" });
					} else if(apply_category_toggle == 'true') {
						// Category Toggle
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingsToggle();
					}

					setTimeout(function(){
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingImageSwiperGallery();
						if(jQuery.fn.niceScroll !== undefined) {
							jQuery('.dtsl-content-scroll').getNiceScroll().resize();
						}
					},1000);

				}

				// Load map
				if(data_load_map == 'true' && map_output_container != undefined) {
					dtStoreLocatorFrontendLocationUtils.dtStoreLocatorLoadMapOutput(response.dataids, map_output_container);
				}

			},
			complete: function(){
				dtStoreLocatorCommonUtils.dtStoreLocatorAjaxAfterSend(parent_item);
			}
		});


	},

	dtStoreLocatorListingsToggle : function() {

		jQuery( '.dtsl-toggle-group .dtsl-toggle-title' ).on( 'click', function () {
			jQuery(this).toggleClass('active');
			jQuery(this).next('.dtsl-toggle-content').slideToggle();
			setTimeout(function(){
				if(jQuery.fn.niceScroll !== undefined) {
					jQuery('.dtsl-content-scroll').getNiceScroll().resize();
				}
			},500);
		});

		jQuery( '.dtsl-toggle-group .dtsl-toggle-title:last' ).trigger('click');

	},

	dtStoreLocatorAjaxPagination : function() {

		jQuery( 'body' ).delegate( '.dtsl-listing-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			var listing_options = this_item.parents('.dtsl-pagination').attr('data-listing-options');
			listing_options = jQuery.parseJSON(listing_options);

			// Pagination Data
			if(this_item.parent().hasClass('prev-post')) {
				current_page = parseInt(this_item.attr('data-currentpage'), 10)-1;
			} else if(this_item.parent().hasClass('next-post')) {
				current_page = parseInt(this_item.attr('data-currentpage'), 10)+1;
			} else {
				current_page = this_item.text();
			}

			var post_per_page = listing_options['post_per_page'];

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call         = this_item.parents('.dtsl-pagination').attr('data-functioncall');
			var output_div            = this_item.parents('.dtsl-pagination').attr('data-outputdiv');

			var apply_isotope         = listing_options['apply_isotope'];
			var enable_carousel       = listing_options['enable_carousel'];
			var loader                = listing_options['loader'];
			var loader_parent         = listing_options['loader_parent'];
			var apply_equal_height    = listing_options['apply_equal_height'];
			var apply_category_toggle = listing_options['apply_category_toggle'];
			var category_toggle_type  = listing_options['category_toggle_type'];
			var parent_item           = this_item.parents(loader_parent);

			var default_options =
			{
				action       : function_call,
				current_page : current_page,
				offset       : offset
			};

			var list_items = categories = cities = neighborhood = countystate = ctype = tags = countries = sellers = incharges = '';
			var keyword = user_latitude = user_longitude = use_radius = radius = radius_unit = startdate = pricerange_start = pricerange_end = features_query = features_total_query = orderby = mls_number = others = '';


			if(this_item.parents().hasClass('dtsl-direct-list-items')) {

				var item_type = '';
				var map_output_container = '';
				if(this_item.parents('.dtsl-direct-list-items').hasClass('dtsl-listing-output-data-container')) {
					var output_container = this_item.parents('.dtsl-direct-list-items');
					item_type = 'data';
				} else if(this_item.parents('.dtsl-direct-list-items').hasClass('dtsl-listing-output-map-container')) {
					var map_output_container = this_item.parents('.dtsl-direct-list-items');
					item_type = 'map';
				}

				// Filters

				var list_item_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-listitemids');
				if(list_item_ids != undefined && list_item_ids != '') {
					list_items = list_item_ids.split(',');
				}

				var category_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-categoryids');
				if(category_ids != undefined && category_ids != '') {
					categories = category_ids.split(',');
				}

				var cities_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-citiesids');
				if(cities_ids != undefined && cities_ids != '') {
					cities = cities_ids.split(',');
				}

				var neighborhoods_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-neighborhoodsids');
				if(neighborhoods_ids != undefined && neighborhoods_ids != '') {
					neighborhood = neighborhoods_ids.split(',');
				}

				var countiesstates_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-countiesstatesids');
				if(countiesstates_ids != undefined && countiesstates_ids != '') {
					countystate = countiesstates_ids.split(',');
				}

				var contracttypes_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-contracttypesids');
				if(contracttypes_ids != undefined && contracttypes_ids != '') {
					ctype = contracttypes_ids.split(',');
				}

				var tag_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-tagids');
				if(tag_ids != undefined && tag_ids != '') {
					tags = tag_ids.split(',');
				}

				var country_id = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-countryid');
				if(country_id != undefined && country_id != '') {
					countries = country_id.split(',');
				}

				var seller_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-sellerids');
				if(seller_ids != undefined && seller_ids != '') {
					sellers = seller_ids.split(',');
				}

				var incharge_ids = output_container.find('.dtsl-listing-output-'+item_type+'-holder').attr('data-inchargeids');
				if(incharge_ids != undefined && incharge_ids != '') {
					incharges = incharge_ids.split(',');
				}

				var unique_options =
				{
					list_items          : list_items,
					categories          : categories,
					cities              : cities,
					neighborhood        : neighborhood,
					countystate         : countystate,
					ctype               : ctype,
					tags                : tags,
					countries           : countries,
					sellers             : sellers,
					incharges           : incharges
				};

			} else {

				var output_container = jQuery('.dtsl-listing-output-data-container');
				var map_output_container = jQuery('.dtsl-listing-output-map-container');


				// Filter options

				var filter_data      = dtStoreLocatorFrontendUtils.dtStoreLocatorFilterOptions();
				keyword              = filter_data.keyword;
				user_latitude        = filter_data.user_latitude;
				user_longitude       = filter_data.user_longitude;
				use_radius           = filter_data.use_radius;
				radius               = filter_data.radius;
				radius_unit          = filter_data.radius_unit;
				categories           = filter_data.categories;
				tags                 = filter_data.tags;
				cities               = filter_data.cities;
				neighborhood         = filter_data.neighborhood;
				countystate          = filter_data.countystate;
				countries            = filter_data.countries;
				ctype                = filter_data.ctype;
				startdate            = filter_data.startdate;
				pricerange_start     = filter_data.pricerange_start;
				pricerange_end       = filter_data.pricerange_end;
				features_query       = filter_data.features_query;
				features_total_query = filter_data.features_total_query;
				sellers              = filter_data.sellers;
				incharges            = filter_data.incharges;
				orderby              = filter_data.orderby;
				mls_number           = filter_data.mls_number;
				others               = filter_data.others;

				// Filter Option in Output Data Container
				if(categories == '') {
					var category_ids = output_container.find('.dtsl-listing-output-data-holder').attr('data-categoryids');
					if(category_ids != undefined && category_ids != '') {
						categories = category_ids.split(',');
					}
				}

				var unique_options =
				{
					keyword             : keyword,
					user_latitude       : user_latitude,
					user_longitude      : user_longitude,
					use_radius          : use_radius,
					radius              : radius,
					radius_unit         : radius_unit,
					categories          : categories,
					tags                : tags,
					cities              : cities,
					neighborhood        : neighborhood,
					countystate         : countystate,
					countries           : countries,
					ctype               : ctype,
					startdate           : startdate,
					pricerange_start    : pricerange_start,
					pricerange_end      : pricerange_end,
					features_query      : features_query,
					features_total_query: features_total_query,
					sellers             : sellers,
					incharges           : incharges,
					orderby             : orderby,
					mls_number          : mls_number,
					others              : others,
				};

			}

			var consolidated_options = Object.assign(default_options, listing_options, unique_options);
			consolidated_options['custom_options'] = JSON.stringify(consolidated_options['custom_options']);

			// ajax call
			jQuery.ajax({
				type: "POST",
				url: dtslcommonobject.ajaxurl,
				dataType: "JSON",
				data: consolidated_options,
				beforeSend: function(){
					if(loader == 'true') {
						dtStoreLocatorCommonUtils.dtStoreLocatorAjaxBeforeSend(parent_item);
					}
				},
				success: function (response) {

					var offset_top = this_item.parents('.'+output_div).offset().top;

					this_item.parents('.'+output_div).html(response.data);

					if(apply_isotope == 'true') {
						// Isotope
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingsListingIsotope();
					} else if(enable_carousel == 'true') {
						// Carousel
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingCarousel(output_container);
					} else if(apply_equal_height == 'true') {
						//Equal Height
						output_container.find('.dtsl-listings-item-wrapper').matchHeight({ property:"min-height" });
					} else if(apply_category_toggle == 'true') {
						// Category Toggle
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingsToggle();
					}

					setTimeout(function(){
						dtStoreLocatorFrontendUtils.dtStoreLocatorListingImageSwiperGallery();
						if(jQuery.fn.niceScroll !== undefined) {
							jQuery('html').getNiceScroll().resize();
						}
					},1000);

					// Load map
					if(map_output_container.length) {
						dtStoreLocatorFrontendLocationUtils.dtStoreLocatorLoadMapOutput(response.dataids, map_output_container);
					}

					// Scroll to top
				    jQuery('html, body').animate({
				        scrollTop: parseInt(offset_top, 10)-60
				    }, 600);

				},
				complete: function(){
					if(loader == 'true') {
						dtStoreLocatorCommonUtils.dtStoreLocatorAjaxAfterSend(parent_item);
					}
				}
			});

			e.preventDefault();

		});

	},

	dtStoreLocatorListingImageSwiperGallery : function() {

		// Image gallery swiper
		var swiperGallery = [];
		var swiperGalleryOptions = [];
		var swiperIterator = 1;

		jQuery('.dtsl-listings-image-gallery-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-imggal-'+swiperIterator;

			swiperGalleryOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = $swiperItem.attr('data-carouseleffect');
			var autoheight = false;

			var paginationtype = ($swiperItem.attr('data-carouselpaginationtype') != '') ? $swiperItem.attr('data-carouselpaginationtype') : '';

			var autoplay = parseInt($swiperItem.attr('data-carouselautoplay'), 10);
			if(autoplay > 0) {
				swiperGalleryOptions[swiperUniqueId]['autoplay_enable'] = true;
				autoplay_enable = true;
			} else {
				swiperGalleryOptions[swiperUniqueId]['autoplay_enable'] = false;
				autoplay_enable = false;
			}

			var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
			swiperGalleryOptions[swiperUniqueId]['centeredslides'] = true;
			if(slidesperview > 1) {
				swiperGalleryOptions[swiperUniqueId]['centeredslides'] = false;
			}

			var noofimages = parseInt($swiperItem.attr('data-carouselnoofimages'), 10);
			var initialSlide = 0;
			if(noofimages > 2) {
				initialSlide = 2;
				swiperGalleryOptions[swiperUniqueId]['initialSlide'] = 2;
			}

			var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;
			var verticaldirection = ($swiperItem.attr('data-carouselverticaldirection') == 'true') ? true : false;
			var direction = 'horizontal';
			swiperGalleryOptions[swiperUniqueId]['direction'] = 'horizontal';
			if(verticaldirection) {
				direction = 'vertical';
				swiperGalleryOptions[swiperUniqueId]['direction'] = 'vertical';
			}

			var pagination_class = '';
			var pagination_type = '';
			var watch_state = false;


			if(paginationtype == 'bullets') {
				var pagination_class = $swiperItem.find('.dtsl-swiper-bullet-pagination');
				var pagination_type = 'bullets';
				var watch_state = true;
			}

			if(paginationtype == 'fraction') {
				var pagination_class =  $swiperItem.find('.dtsl-swiper-fraction-pagination');
				var pagination_type = 'fraction';
			}

			if(paginationtype == 'progressbar') {
				var pagination_class =  $swiperItem.find('.dtsl-swiper-progress-pagination');
				var pagination_type = 'progressbar';
			}

			var scrollbar_class = '';
			var	scrollbar_hide = true;
			if(paginationtype == 'scrollbar') {
				scrollbar_class = $swiperItem.find('.dtsl-swiper-scrollbar');
				scrollbar_hide = false;
			}

			if(paginationtype == 'thumbnail') {
				swiperGalleryOptions[swiperUniqueId]['thumbnailpagination'] = true;
				swiperGalleryOptions[swiperUniqueId]['numberofthumbnails'] = $swiperItem.attr('data-carouselnumberofthumbnails');
				loopmode = false;
			} else {
				swiperGalleryOptions[swiperUniqueId]['thumbnailpagination'] = false;
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

     			initialSlide: initialSlide,
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
					watchState: watch_state
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

				scrollbar: {
					el: scrollbar_class,
					hide: scrollbar_hide,
					draggable: true,
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

			    $swiperItem.find('.dtsl-listings-swiper-pagination-holder .dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-prev').on('click', function(e) {
			    	var swiperUniqueId = $swiperItem.attr('id');
			        swiperGallery[swiperUniqueId].slidePrev();
			        if(swiperGalleryOptions[swiperUniqueId]['autoplay_enable']) {
			        	swiperGallery[swiperUniqueId].autoplay.start();
			        }
			        e.preventDefault();
			    });

			    $swiperItem.find('.dtsl-listings-swiper-pagination-holder .dtsl-swiper-arrow-pagination .dtsl-swiper-arrow-next').on('click', function(e) {
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

		// Generate gallery thumb pagination
		for(i = 1; i < swiperIterator; i++) {
			if(swiperGalleryOptions['swiperuniqueid-imggal-'+i]['thumbnailpagination']) {

				var swiperUniqueId = 'swiperuniqueid-imggal-'+i;

				var $swiper_gallerythumb_item = jQuery('#'+swiperUniqueId).parents('.dtsl-listings-image-gallery-holder').find('.dtsl-listings-image-gallery-thumb-container');

			    var swiperGalleryThumbs = new Swiper($swiper_gallerythumb_item, {
			    	initialSlide       : swiperGalleryOptions[swiperUniqueId]['initialSlide'],
			        spaceBetween       : 10,
			        direction          : swiperGalleryOptions[swiperUniqueId]['direction'],
			        centeredSlides     : swiperGalleryOptions[swiperUniqueId]['centeredslides'],
			        slidesPerView      : swiperGalleryOptions[swiperUniqueId]['numberofthumbnails'],
			        touchRatio         : 0.2,
			        slideToClickedSlide: true
			    });

			    swiperGallery[swiperUniqueId].controller.control = swiperGalleryThumbs;
			    swiperGalleryThumbs.controller.control = swiperGallery[swiperUniqueId];

			}
		}

	},

	dtStoreLocatorContentScroll : function() {

		if(jQuery('.dtsl-content-scroll').length) {

			jQuery('.dtsl-content-scroll').niceScroll({ cursorcolor:dtslfrontendobject.primaryColor, cursorwidth: '5px', background:dtslfrontendobject.tertiaryColor, cursorborder:'none' });

		}

	},

	dtStoreLocatorResponsiveMortageCalculator : function() {

		if(jQuery('.lidd_mc_form').length) {

			jQuery('.lidd_mc_input input[type="text"]').each(function() {
				jQuery( this ).wrap( '<div class="dtsl-rmc-field-wrap"></div>' );
				jQuery( '<span></span>' ).insertAfter( jQuery(this) );
			});

		}

	}

};

var dtStoreLocatorFrontend = {

	dtInit : function() {

		var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
		var currentWidth = window.innerWidth || document.documentElement.clientWidth;

		dtStoreLocatorFrontend.dtStoreLocator(isMobile, currentWidth);
		dtStoreLocatorFrontend.dtLoginForm();
		dtStoreLocatorFrontend.dtLoadData();

	},

	dtStoreLocator : function(isMobile, currentWidth) {

		jQuery(window).on('resize', function() {
			dtStoreLocatorFrontendUtils.dtStoreLocatorListingsListingIsotope();
			dtStoreLocatorFrontendUtils.dtStoreLocatorContentScroll();
		});

		dtStoreLocatorFrontendUtils.dtStoreLocatorListingsListingIsotope();

		dtStoreLocatorFrontendUtils.dtStoreLocatorAjaxPagination();

		dtStoreLocatorFrontendUtils.dtStoreLocatorListingImageSwiperGallery();

		dtStoreLocatorFrontendUtils.dtStoreLocatorContentScroll();

		dtStoreLocatorFrontendUtils.dtStoreLocatorResponsiveMortageCalculator();

	},

	dtLoginForm : function(isMobile, currentWidth) {

		jQuery( 'body' ).delegate( '.dtsl-login-link', 'click', function(e){

			var location = window.location.href;

			jQuery.ajax({
				type: "POST",
				url: dtslfrontendobject.ajaxurl,
				data:
				{
					action: 'dtsl_show_login_form_popup',
					redirect_url: location
				},
				beforeSend: function(){
					dtStoreLocatorCommonUtils.dtStoreLocatorAjaxBeforeSend(undefined);
				},
				success: function (response) {

					jQuery('body').find('.dtsl-login-form-container').remove();
					jQuery('body').find('.dtsl-login-form-overlay').remove();
					jQuery('body').append(response);

					// Login Form - Span Tag
					jQuery('.dtsl-login-form-holder #loginform input[type="text"]').each(function() {
						jQuery(this).wrap( '<div class="dtsl-login-field-item"></div>' );
						jQuery('<span></span>').insertAfter( jQuery(this) );
					});

					jQuery('.dtsl-login-form-holder #loginform input[type="password"]').each(function() {
						jQuery(this).wrap( '<div class="dtsl-login-field-item"></div>' );
						jQuery('<span></span>').insertAfter( jQuery(this) );
					});

					if(jQuery('.dtsl-login-form-holder .login-remember').length) {
						var rememberme_input = jQuery('.dtsl-login-form-holder .login-remember').find('#rememberme');
						jQuery('.dtsl-login-form-holder .login-remember').find('label').attr('for', 'rememberme');
						jQuery('.dtsl-login-form-holder .login-remember').prepend(rememberme_input);
					}

				},
				complete: function() {
					dtStoreLocatorCommonUtils.dtStoreLocatorAjaxAfterSend(undefined);
				}
			});

			e.preventDefault();

		});

		jQuery( 'body' ).delegate( '.dtsl-login-form-overlay', 'click', function(e){

			jQuery('body').find('.dtsl-login-form-container').fadeOut();
			jQuery('body').find('.dtsl-login-form-overlay').fadeOut();

			e.preventDefault();

		});

	},

	dtLoadData : function() {

		jQuery('.dtsl-direct-list-items').each(function() {
			dtStoreLocatorFrontendUtils.dtStoreLocatorLoadDataOutput(jQuery(this));
		});

	},

	dtInitTab : function() {

		if(jQuery('.elementor-tabs-wrapper .elementor-tab-title').length) {
			window.setTimeout(function(){
				window.dispatchEvent(new Event("resize"));
			}, 600);
		}

		jQuery('.elementor-tabs-wrapper .elementor-tab-title').on('click', function () {
			window.setTimeout(function(){
				window.dispatchEvent(new Event("resize"));
			}, 600);
		});

	}

};

jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtStoreLocatorFrontend.dtInit();
		dtStoreLocatorFrontend.dtInitTab();
	}

});

( function( $ ) {

	"use strict";

	var dtStoreLocatorFrontendJs = function($scope, $){
		dtStoreLocatorFrontend.dtInit();
	};
	var dtStoreLocatorFrontendInitTabJs = function($scope, $){
		dtStoreLocatorFrontend.dtInitTab();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-df-listings-listing.default', dtStoreLocatorFrontendJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/tabs.default', dtStoreLocatorFrontendInitTabJs);
		}
	});

} )( jQuery );