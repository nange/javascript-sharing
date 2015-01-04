// 入口
require(['config'], function() {
require(['jquery', 'ShoppingCart'], function($, ShoppingCart) {
  // 初始化ShoppingCart
  $(function() {
    var cart = new ShoppingCart();  
    cart.init();
  });
  
});
});
