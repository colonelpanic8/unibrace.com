$(document).ready(function() {
  
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('#cover').css('min-height', windowHeight);
  };
  
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
  
  $("nav.navbar").sticky({topSpacing:0});
	
	$('.selectpicker').selectpicker();
	
	$(".mobile-nav-btn").click(function(){
	
		$("#nav-dropdown").toggleClass('expand');
		$(this).toggleClass('on');
		
	})	
	
	$('.product').flexslider({
    	animation: "slide",
    	slideshow: false
  });
	
	$('#home .flexslider').flexslider({
    	animation: "slide",
    	slideshow: true,
    	controlNav: false,
    	slideshowSpeed: 6000,
      animationSpeed: 2000,
  });
  
  $('#home .flexslider').waitForImages(function() {
    $('#home .flexslider').animate({ opacity: 1 },1000);
  });
	
	$('#home2').flexslider({
    	animation: "slide",
    	slideshow: true,
    	controlNav: false,
    	slideshowSpeed: 6000,
      animationSpeed: 2000,
  });/*

  
  $('.series-label.xb').click(function(){
    
    $('.series-desc').fadeOut(300);
    $('.series-desc.xb').fadeToggle(300);
    
  });
  
  $('.series-label.ub').click(function(){
    
    $('.series-desc').fadeOut(300);
    $('.series-desc.ub').fadeToggle(300);
    
  });
  
  $('.series-label.rb').click(function(){
    
    $('.series-desc').fadeOut(300);
    $('.series-desc.rb').fadeToggle(300);
    
  });
*/
  
  $('#XBSeries').click(function(){
    if($(this).hasClass('current')){
      $('#xb-series').slideToggle();
      $(this).removeClass('current');
      $('.series').removeClass('open');
    }else{
      if( $('.series-container .open').length ){
        $('.series.open').hide(0);
        $('.series').removeClass('open');
        $('#xb-series').fadeToggle();
      }else{
        $('#xb-series').slideToggle();
        $('.series').removeClass('open');
      }
      $('.label-model').removeClass('current');
      $(this).addClass('current');
      $('#xb-series').addClass('open');
    }
  })
  
  $('#UBSeries').click(function(){
    if($(this).hasClass('current')){
      $('#ub-series').slideToggle();
      $(this).removeClass('current');
      $('.series').removeClass('open');
    }else{
      if( $('.series-container .open').length ){
        $('.series.open').hide(0);
        $('.series').removeClass('open');
        $('#ub-series').fadeToggle();
      }else{ 
        $('#ub-series').slideToggle();
        $('.series').removeClass('open');
      }
      $('.label-model').removeClass('current');
      $(this).addClass('current');
      $('#ub-series').addClass('open');
    }
  })
  
  $('#RBSeries').click(function(){
    if($(this).hasClass('current')){
      $('#rb-series').slideToggle();
      $(this).removeClass('current');
      $('.series').removeClass('open');
    }else{
      if( $('.series-container .open').length ){
        $('.series.open').hide(0);
        $('.series').removeClass('open');
        $('#rb-series').fadeToggle();
      }else{
        $('#rb-series').slideToggle();
        $('.series').removeClass('open');
      }
      $('.label-model').removeClass('current');
      $(this).addClass('current');
      $('#rb-series').addClass('open');
    }
  })
  
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
	
	
	$('#testimonials .comment article').readmore({collapsedHeight: 105});
	
})