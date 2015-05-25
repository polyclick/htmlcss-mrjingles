$(function() {

  // set current year in copyright
  var date = new Date();
  $('[year]').each(function(){
    $(this).html(date.getFullYear());
  });

  // next section buttons
  var page = $("html, body");
  $('[next-section] .next-button').click(function(event){
    event.preventDefault();

    // stop scroll animation when user is scrolling manually listener
    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
      page.stop();
    });

    // start scroll animation and remove manual scroll listener on complete
    var sectionElement = $('section.' + $(this).closest('[next-section]').attr('next-section'));
    var diff = $(window).height() - $(sectionElement).outerHeight();
    var offset = diff > 0 ? $(sectionElement).offset().top - (diff / 2) : $(sectionElement).offset().top;

    page.animate({scrollTop: offset }, 750, function(){
      page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    });

    return false;
  });
});