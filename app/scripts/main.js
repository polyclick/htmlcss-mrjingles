'use strict';

$(function() {

  // variables
  var page = $('html, body');

  // utility function: open popup in center of the screen
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

  // utility function: navigate to a specific section
  function navigateToSection(sectionElement) {

    // stop scroll animation when user is scrolling manually listener
    page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(){
      page.stop();
    });

    // start scroll animation and remove manual scroll listener on complete
    var diff = $(window).height() - $(sectionElement).outerHeight();
    var offset = diff > 0 ? $(sectionElement).offset().top - (diff / 2) : $(sectionElement).offset().top;

    page.animate({scrollTop: offset }, 750, function(){
      page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    });
  }

  // set current year in copyright
  var date = new Date();
  $('[year]').each(function(){
    $(this).html(date.getFullYear());
  });

  // menu buttons
  $('.nav li').click(function(event){
    event.preventDefault();
    var section = $('section.' + $(this).attr('section'));

    // wait for menu to close first
    setTimeout(function(){
      navigateToSection(section);
    }, 0);

    return false;
  });

  // next section buttons
  $('[next-section] .next-button').click(function(event){
    event.preventDefault();
    var section = $('section.' + $(this).closest('[next-section]').attr('next-section'));
    navigateToSection(section);
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

  // mobile menu
  $('.main, header ul li').click(function(event){
    event.preventDefault();
    $('header').toggleClass('menu-opened');
    return false;
  });

  // names overview & detail
  $('.names .name').click(function(event){
    event.preventDefault();
    var $content = $('.love .section-content');
    $content.addClass('detail-opened');

    /*

    $detail.css('display', 'block');
    $detail.find('.name, .text')
      .css('display', 'none')
      .css('opacity', 0);
    */

    var index = $(this).attr('data-index');
    var $detail = $content.find('.detail');
    $detail.find('.name-' + index).addClass('shown');
    $detail.find('.text-' + index).addClass('shown');

    return false;
  });

  // resize logic
  $(window).resize(function(){
    $('.more-info-panel').height(0);
  });
});