// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require dataTables/jquery.dataTables
//= require bootstrap-colorpicker
//= require_tree .

/**
 * Created by root on 10/6/17.
 */

$(function () {
    $('textarea').each(function() {
        $(this).height($(this).prop('scrollHeight'));
    });

    $('#auto').click(function () {
        if ($(this).is(':checked')) {
            $.ajax({
                url: '/carts/auto',
                success:function (res) {
                    $(".delivery_options").html(res)
                }
            });
        }
    });

    $('#manual').click(function () {
        if ($(this).is(':checked')) {
            $.ajax({
                url: '/carts/manual',
                success:function (res) {
                    $(".delivery_options").html(res)
                }
            });
        }
    });

    $('#collection').click(function () {
        if ($(this).is(':checked')) {
            $.ajax({
                url: '/carts/collection',
                success:function (res) {
                    $(".delivery_options").html(res)
                }
            });
        }
    });
});

function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('delivery_location').value;
    geocoder.geocode({
        'address': address, componentRestrictions: {
            country: 'KE'
        }
    }, function (results, status) {
        if (status === 'OK') {

            var string = "";
            console.log(results);
            results.forEach(function (entry) {
                string = string + '<p onclick=\'selectlocation("' + String(entry['formatted_address']) + '");\'>' + String(entry['formatted_address']) + '</p>';


            });
            $('#suggesstion-box').show();
            $('#suggesstion-box').html(string);
            console.log(string);
        } else {
            $('#suggesstion-box').html("Not Found, Try different search words");
        }
    });
}



function selectlocation(val) {

    $("#delivery_location").val(val);
    $("#suggesstion-box").hide();
    $.ajax({
        type: 'POST',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + val + '&key=AIzaSyCxt8jyVF7hpNm2gxCjRMvzFt69pgvVYmk',
        success: function (result) {
            results = result['results'];
            console.log(result);

            var latitude = results[0]['geometry']['location']['lat'];
            var longitude = results[0]['geometry']['location']['lng'];

            //sendyit2(longitude, latitude);


            $.ajax({
                url:'/carts/location',
                success:function () {
                    alert('boo');
                },
                method:'post',
                data: {
                    'lng': longitude,
                    'lat': latitude
                }
            });
        },

    });
}

function locate(){
    setTimeout(function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
    }, 1000);
}