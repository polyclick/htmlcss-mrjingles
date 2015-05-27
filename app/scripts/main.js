'use strict';

$(function() {

  // set current year in copyright
  var date = new Date();
  $('[year]').each(function(){
    $(this).html(date.getFullYear());
  });

  // next section buttons
  var page = $('html, body');
  $('[next-section] .next-button').click(function(event){
    event.preventDefault();

    // stop scroll animation when user is scrolling manually listener
    page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(){
      page.stop();
    });

    // start scroll animation and remove manual scroll listener on complete
    var sectionElement = $('section.' + $(this).closest('[next-section]').attr('next-section'));
    var diff = $(window).height() - $(sectionElement).outerHeight();
    var offset = diff > 0 ? $(sectionElement).offset().top - (diff / 2) : $(sectionElement).offset().top;

    page.animate({scrollTop: offset }, 750, function(){
      page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    });

    return false;
  });

  // more info button
  $('.more-info').click(function(event){
    event.preventDefault();
    var height = $('.more-info-panel').height() > 0 ? 0 : $('.more-info-panel-content').outerHeight(true);
    $('.more-info-panel').height(height);
    return false;
  });

  // legal popup
  $('.legal-link').click(function(event){
    event.preventDefault();
    openCenteredPopup('legal.html', 'Voorwaarden en bepalingen', 550, 600);
    return false;
  });

  // resize logic
  $(window).resize(function(){
    $('.more-info-panel').height(0);
  });
});

function openCenteredPopup(url, title, w, h) {
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
      newWindow.focus();
  }
}