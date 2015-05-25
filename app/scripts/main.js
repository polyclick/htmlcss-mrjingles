$(function() {

  // set current year in copyright
  var date = new Date();
  $('[year]').each(function(){
    $(this).html(date.getFullYear());
  });

  // next section buttons
  $('[next-section]').click(function(event){
    event.preventDefault();
    var nextSection = $(this).attr('next-section');
    var sectionElement = $('section.' + nextSection);
    console.log($(sectionElement).outerHeight() > $(window).height());
    var diff = $(window).height() - $(sectionElement).outerHeight();
    var offset = diff > 0 ? $(sectionElement).offset().top - (diff / 2) : $(sectionElement).offset().top;
    $('html, body').animate({
        scrollTop:offset
    }, 750);
    return false;
  });
});