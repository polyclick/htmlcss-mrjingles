var date = new Date();
$('[year]').each(function(){
  $(this).html(date.getFullYear());
});