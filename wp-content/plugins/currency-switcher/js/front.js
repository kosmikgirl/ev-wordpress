'use strict';

var wpcs_loading_first_time = true;//simply flag var
var wpcs_sumbit_currency_changing = true;//just a flag variable for drop-down redraws when prices redraws by AJAX

jQuery(function () {

    //keeps data of $_GET array
    wpcs_array_of_get = jQuery.parseJSON(wpcs_array_of_get);
    if (Object.keys(wpcs_array_of_get).length == 0) {
        wpcs_array_of_get = {};
    }

    wpcs_array_no_cents = jQuery.parseJSON(wpcs_array_no_cents);


    if (wpcs_array_of_get.currency != undefined || wpcs_array_of_get.removed_item != undefined)
    {
        //wpcs_refresh_mini_cart(555);
    }

    jQuery('.wpcs-style-3-dlg-select-item').on('click', function (e) {
        wpcs_redirect(jQuery(this).find('input[type=radio]').attr('value'));
        return false;
    });

    //+++++++++++++++++++++++++++++++++++++++++++++++
    //console.log(wpcs_drop_down_view);
    if (wpcs_drop_down_view == 'chosen' || wpcs_drop_down_view == 'chosen_dark') {
        try {
            if (jQuery("select.currency-switcher").length) {
                jQuery("select.currency-switcher").chosen({
                    disable_search_threshold: 10
                });

                jQuery.each(jQuery('.currency-switcher-form .chosen-container'), function (index, obj) {
                    jQuery(obj).css({'width': jQuery(this).prev('select').data('width')});
                });
            }
        } catch (e) {
            console.log(e);
        }
    }



    if (wpcs_drop_down_view == 'ddslick') {
        try {
            jQuery.each(jQuery('select.currency-switcher'), function (index, obj) {
                var width = jQuery(obj).data('width');
                var flag_position = jQuery(obj).data('flag-position');
                jQuery(obj).ddslick({
                    //data: ddData,
                    width: width,
                    imagePosition: flag_position,
                    selectText: "Select currency",
                    //background:'#ff0000',
                    onSelected: function (data) {
                        if (!wpcs_loading_first_time)
                        {
			    //document.body.style.cursor = "wait";
                            var form = jQuery(data.selectedItem).closest('form.currency-switcher-form');
                            jQuery(form).find('input[name="currency-switcher"]').eq(0).val(data.selectedData.value);

                            if (Object.keys(wpcs_array_of_get).length == 0) {
                                //jQuery(form).submit();
                                wpcs_redirect(data.selectedData.value);
                            } else {
                                wpcs_redirect(data.selectedData.value);
                            }


                        }
                    }
                });
            });

        } catch (e) {
            console.log(e);
        }
    }




    if (wpcs_drop_down_view == 'wselect' && wpcs_is_mobile != 1) {
        try {
            //https://github.com/websanova/wSelect#wselectjs
            jQuery('select.currency-switcher').wSelect({
                size: 7,
                highlight: true
            });
        } catch (e) {
            console.log(e);
        }
    }

    //for flags view instead of drop-down
    jQuery('.wpcs_flag_view_item').click(function () {
        if (wpcs_sumbit_currency_changing) {
            if (jQuery(this).hasClass('wpcs_flag_view_item_current')) {
                return false;
            }
            //***

            if (Object.keys(wpcs_array_of_get).length == 0) {
                window.location = window.location.href + '?currency=' + jQuery(this).data('currency');
            } else {

                wpcs_redirect(jQuery(this).data('currency'));

            }
        }

        return false;
    });

    //for converter
    if (jQuery('.wpcs_converter_shortcode').length) {
        jQuery('.wpcs_converter_shortcode_button').click(function () {
            var amount = jQuery(this).parent('.wpcs_converter_shortcode').find('.wpcs_converter_shortcode_amount').eq(0).val();
            var from = jQuery(this).parent('.wpcs_converter_shortcode').find('.wpcs_converter_shortcode_from').eq(0).val();
            var to = jQuery(this).parent('.wpcs_converter_shortcode').find('.wpcs_converter_shortcode_to').eq(0).val();
            var precision = jQuery(this).parent('.wpcs_converter_shortcode').find('.wpcs_converter_shortcode_precision').eq(0).val();
            var results_obj = jQuery(this).parent('.wpcs_converter_shortcode').find('.wpcs_converter_shortcode_results').eq(0);
            jQuery(results_obj).val(wpcs_lang_loading + ' ...');
            var data = {
                action: "wpcs_convert_currency",
                amount: amount,
                from: from,
                to: to,
                precision: precision
            };

            jQuery.post(wpcs_ajaxurl, data, function (value) {
                jQuery(results_obj).val(value);
            });

            return false;

        });
    }

    //for rates
    if (jQuery('.wpcs_rates_shortcode').length) {
        jQuery('body').on('change', '.wpcs_rates_current_currency', function () {
            var _this = this;
            var data = {
                action: "wpcs_rates_current_currency",
                current_currency: jQuery(this).val(),
                precision: jQuery(this).data('precision'),
                exclude: jQuery(this).data('exclude')
            };

            jQuery.post(wpcs_ajaxurl, data, function (html) {
                jQuery(_this).parent('.wpcs_rates_shortcode').html(html);
            });

            return false;

        });
    }

    //if we using js price update while the site is cached
    if (typeof wpcs_shop_is_cached !== 'undefined') {
        if (wpcs_shop_is_cached) {
            wpcs_sumbit_currency_changing = false;
            if (typeof wpcs_array_of_get.currency === 'undefined') {

                var prices_data = [];
                jQuery.each(jQuery('.wpcs_price'), function (index, item) {
                    prices_data.push({id: jQuery(item).attr('id'), price: jQuery(item).data('amount')});
                });

                var data = {
                    action: "wpcs_get_prices_html",
                    prices_data: prices_data
                };
                jQuery.post(wpcs_ajaxurl, data, function (data) {

                    data = jQuery.parseJSON(data);
                    jQuery.each(data.prices, function (index, html) {
                        jQuery('#' + index).replaceWith(html);
                    });
                    //***
                    jQuery('.currency-switcher').val(data.current_currency);
                    //***
                    if (wpcs_drop_down_view == 'chosen' || wpcs_drop_down_view == 'chosen_dark') {
                        try {
                            if (jQuery("select.currency-switcher").length) {
                                jQuery("select.currency-switcher").chosen({
                                    disable_search_threshold: 10
                                });
                                jQuery('select.currency-switcher').trigger("chosen:updated");
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    //***
                    if (wpcs_drop_down_view == 'ddslick') {
                        try {
                            //console.log(data.current_currency);
                            jQuery('select.currency-switcher').ddslick('select', {index: data.current_currency, disableTrigger: true});
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    //***
                    if (wpcs_drop_down_view == 'wselect' && wpcs_is_mobile != 1) {
                        //https://github.com/websanova/wSelect
                        try {
                            jQuery('select.currency-switcher').val(data.current_currency).change();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    //***

                    /* auto switcher*/
                    var auto_switcher = jQuery('.wpcs_auto_switcher');
                    if (auto_switcher.length > 0) {
                        wpcs_auto_switcher_redraw(data.current_currency, auto_switcher);
                    }
                    wpcs_sumbit_currency_changing = true;
                });

            } else {
                wpcs_sumbit_currency_changing = true;
            }
        }
    }

    wpcs_loading_first_time = false;
});


function wpcs_redirect(currency) {
    if (!wpcs_sumbit_currency_changing) {
        return;
    }

    if (wpcs_special_ajax_mode) {

        var data = {
            action: "wpcs_set_currency_ajax",
            currency: currency
        };

        jQuery.post(wpcs_ajaxurl, data, function (value) {
            location.reload();
        });
        return false;
    }

    //***
    var l = window.location.href;

    //for #id navigation     l = l.replace(/(#.+$)/gi, '');
    l = l.split("#");
    var anch = "";
    if (typeof l[1] != 'undefined') {
        anch = "#" + l[1];
    }
    l = l[0];

    l = l.split('?');
    l = l[0];


    var string_of_get = '?';
    wpcs_array_of_get.currency = currency;
    /*
     l = l.replace(/(\?currency=[a-zA-Z]+)/g, '?');
     l = l.replace(/(&currency=[a-zA-Z]+)/g, '');
     */

    if (Object.keys(wpcs_array_of_get).length > 0) {

        string_of_get += decodeURIComponent(jQuery.param(wpcs_array_of_get));
    }

    window.location = l + string_of_get + anch;
}


/*auto redirect*/
jQuery(function () {
    jQuery('.wpcs_auto_switcher_link').click(function () {

        //   if (Object.keys(wpcs_array_of_get).length == 0) {
        //       window.location = window.location.href + '?currency=' + jQuery(this).data('currency');
        //  } else {
        wpcs_redirect(jQuery(this).data('currency'));
        //  }

        return false;
    });
});

function wpcs_remove_link_param(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function wpcs_auto_switcher_redraw(curr_curr, switcher) {
    var view = switcher.data('view');
    switch (view) {
        case 'classic_blocks':
            switcher.find('a').removeClass('wpcs_curr_curr');
            switcher.find('a[data-currency="' + curr_curr + '"]').addClass('wpcs_curr_curr');
            break;
        case 'roll_blocks':
            switcher.find('a').removeClass('wpcs_curr_curr');
            switcher.find('li').removeClass('wpcs_auto_bg_wpcs_curr_curr');
            var current_link = switcher.find('a[data-currency="' + curr_curr + '"]');
            current_link.addClass('wpcs_curr_curr');
            current_link.parents('li').addClass('wpcs_auto_bg_wpcs_curr_curr');
            break;
        case 'round_select':
            switcher.find('a').removeClass('wpcs_curr_curr');
            var current_link = switcher.find('a[data-currency="' + curr_curr + '"]');
            current_link.addClass('wpcs_curr_curr');
            jQuery('.wpcs_current_text').html(current_link.find('.wpcs_base_text').html());
            break;
        default:
            break;
    }
}