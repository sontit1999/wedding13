/*
Template Name: Liebe
Author: Ingrid Kuhn
Author URI: themeforest/user/ingridk
Version: 1.0
*/

"use strict";
$(document).ready(function() {

    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			$("#donate-modal").show();
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}
	
	$(document).on('click', '#donate-modal .crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
	});
	
	$(document).on('click', '#donate-modal .cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});

	if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            messages: {
                name: {
                    required: 'Vui lòng nhập tên của bạn.',
                    minlength: 'Tên phải lớn hơn 5 ký tự.',
                },
                content: {
                    required: 'Vui lòng nhập lời chúc.',
                    minlength: 'Lời chúc phải lớn hơn 10 ký tự.',
                },
                email: {
                    email: 'Địa chỉ email không hợp lệ.'
                }
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "content" ) {
                  error.insertAfter("#wish-form .vitualTextarea");
                } else {
                  error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "/wish",
                    data: $(form).serialize(),
                    success: function (res) {
                        $( "#loader").hide();
                        if(!res.error){
                            $('.wish-box').scrollTop(0);
                            $('.wish-box').prepend('<div class="wish-box-item bg"><strong>'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</strong><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
                            $( "#success").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 5000);
                        }else{
                            $( "#error").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }
  //Countdown
	
	if ($("#clock").length) {
	    function timeElapse(date){
	        var current = Date();
	        var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	        var days = Math.floor(seconds / (3600 * 24));
	        if (days < 10) {
	            days = "0" + days;
	        }
	        seconds = seconds % (3600 * 24);
	        var hours = Math.floor(seconds / 3600);
	        if (hours < 10) {
	            hours = "0" + hours;
	        }
	        seconds = seconds % 3600;
	        var minutes = Math.floor(seconds / 60);
	        if (minutes < 10) {
	            minutes = "0" + minutes;
	        }
	        seconds = seconds % 60;
	        if (seconds < 10) {
	            seconds = "0" + seconds;
	        }
            var html = '<div class="box"><div><div class="time">' + days + '</div> <span>'+ $('#clock').data('text-day') +'</span> </div></div><div class="box"><div><div class="time">' + hours + '</div> <span>'+ $('#clock').data('text-hour') +'</span> </div></div><div class="box"><div><div class="time">' + minutes + '</div> <span>'+ $('#clock').data('text-minute') +'</span> </div></div><div class="box"><div><div class="time">' + seconds + '</div> <span>'+ $('#clock').data('text-second') +'</span> </div></div>';
	        $('#clock').html(html);
	    }
	    var time = $('#clock').data('date');
	    $('#clock').countdown(time.replace(/-/g,'/'), function(event) {
	        if(event.type == 'stoped'){
	            var together = new Date($('#clock').data('date'));           
	            together.setHours(0);                           
	            together.setMinutes(0);             
	            together.setSeconds(0);                 
	            together.setMilliseconds(0);
	            setInterval(function() {
	                timeElapse(together);
	            }, 1000);
	        }else{
	          var $this = $(this).html(event.strftime(''
                + '<div class="box"><div><div class="time">%D</div> <span>'+ $('#clock').data('text-day') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%H</div> <span>'+ $('#clock').data('text-hour') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%M</div> <span>'+ $('#clock').data('text-minute') +'</span> </div></div>'
                + '<div class="box"><div><div class="time">%S</div> <span>'+ $('#clock').data('text-second') +'</span> </div></div>'));
	        }
	    });
	}
    //Smooth Scroll 

    $('.page-scroll a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2500, 'easeInOutExpo');
        event.preventDefault();
    });
	
    
//   $('.page-scroll a').on('click', function(e) {
//     e.preventDefault();
//     var aid = $(this).attr("href");
//     $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
// });
	
    //	Back Top Link

    var offset = 200;
    var duration = 500;
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > offset) {
    //         $('.back-to-top').fadeIn(400);
    //     } else {
    //         $('.back-to-top').fadeOut(400);
    //     }
    // });

    //Owl-carousels

    $("#story-carousel").owlCarousel({
        dots: false,
		 margin: 30,
        loop:true,
        autoplay: true,
        nav: true,
		  navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
            480: {
                items: 2,
            },
			850: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        }
    });

 
    $("#owl-attendants1,#owl-attendants2").owlCarousel({
        dots: true,
        loop: true,
        autoplay: false,
        nav: true,
        margin: 20,
        navText: [
                          "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        responsive: {
            1: {
                items: 1,
            },
			600: {
                items: 2,
            },
            991: {
                items: 3,
            },
        }
    });
 
}); // end document ready


// Window scroll function

$(window).scroll(function() {
	
	   // Shrink Navbar on Scroll 	

	  if ($(document).scrollTop() > 50) {
		$('nav').addClass('shrink');
	  } else {
		$('nav').removeClass('shrink');
	  }
	  
});

//On Click  function
	$(document).on('click',function(){
		
		//Navbar toggle
		$('.navbar .collapse').collapse('hide');
		
	})	

// Window load function

$(window).load(function() {

    // Page Preloader 	

    $("#preloader").fadeOut("slow");
	
    // Pretty Photo

    $("a[data-gal^='prettyPhoto']").prettyPhoto({
        hook: 'data-gal'
    });
    ({
        animation_speed: 'normal',
        opacity: 1,
        show_title: true,
        allow_resize: true,
        counter_separator_label: '/',
        theme: 'light_square',
        /* light_rounded / dark_rounded / light_square / dark_square / facebook */
    });

    //Isotope 

    var $container = $('#lightbox');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
            layoutMode: 'masonry'
        }

    });
    $(window).smartresize(function() {
        $container.isotope({
            columnWidth: '.col-sm-3'
        });
    });

	//initialize skrollr
    skrollr.init({
        smoothScrolling: true,
		 smoothScrollingDuration: 1000,
		forceHeight: false			
    });

    // disable skrollr if using handheld device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        skrollr.init().destroy();
    }
			
    //Isotope Nav Filter
	
    $('.category a').on('click', function() {
        $('.category .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
	
	function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid',
                columnWidth: '.grid',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();
    
    if ($(".gallery-fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }
    
    $(document).on('click', '.button-see', function(){
		var isShowFullButton = $(this).parent().hasClass('show-less-content');
		if(isShowFullButton){
			$(this).parent().parent().find('.show-less-content').addClass('d-none');
			$(this).parent().parent().find('.show-full-content').removeClass('d-none');
		}else{
			$(this).parent().parent().find('.show-full-content').addClass('d-none');
			$(this).parent().parent().find('.show-less-content').removeClass('d-none');
		}
	});

    /*------------------------------------------
    = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }

            /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function() {
        $('ul.list-menu-icon').css('opacity','1');
        $('ul.list-menu-icon').css('pointer-events','');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function() {
        $('ul.list-menu-icon').css('opacity','0');
        $('ul.list-menu-icon').css('pointer-events','none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity','1');
    }, 3000); 
    if($('.bii-logo').length > 0){
       $('#menu-access').css('bottom','278px');
       document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
    }
    function shakeTooltip(){
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function(index) {
            setTimeout(() => {
                if(document.querySelector('.btn-menu-close').style.display !== "none"){  
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility','visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility','');
                        $(this).removeClass('shake');
                    }, 3000);
                } else{
                    return false;
                }
            }, index*5000); 
        });   
    }
    if($('#menu-access').length >0){
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function(){
        $('tooltiptext').css('visibility','');
        clearInterval(myInterval);
    });

    // ALBUM GALLERIES
	$(document).on('click', '.btn-see-more-gallery', function(e){
		e.preventDefault();
		let indexNumber = $(this).data('index') || 0;
		$(this).lightGallery({
		thumbnail: true,
		dynamic: true,
		dynamicEl: photoGalleries,
		download: true,
		autoplay: true,
		preload: 2,
		appendSubHtmlTo: '.lg-item',
		index: parseInt(indexNumber)
		});
	});

    $(document).on('click', '.qr-code-image', function(){
        let srcImage = $(this).attr('src');
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl:  [{
                src: srcImage,
            }],
            download: true,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
        });
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}); // end window load
