$(function() {
  $('.component-demos .icon-all').on('click', function() {
    slideToggleCode('.code-box');
  });

  $('.code-box').each(function(i, item) {
    item = $(item);
    item.find('.highlight').appendTo(item);
  });

  $('.code-boxes').on('click', '.collapse', function() {
    slideToggleCode($(this).parent().parent());
  });

  function slideToggleCode(item) {
    $(item).find('.highlight').slideToggle(150);
  }
});
