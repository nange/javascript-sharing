var ShoppingCart = function(opts) {
  this.opts = $.extend({}, ShoppingCart.DEFAULTS, opts || {});
  this.$el = $(this.opts.cartSel);
  this.$itemCount = this.$el.find(this.opts.itemCountSel);
  this.$selectedItemCount = this.$el.find(this.opts.selectedItemCountSel);
  this.$totalPrice = this.$el.find(this.opts.totalPriceSel);
  this.$submitBtn = this.$el.find(this.opts.submitBtnSel);
  this.$checkAll = this.$el.find(this.opts.checkAllSel);
  this.$orderItems = this.$el.find(this.opts.orderItemSel);
};

ShoppingCart.DEFAULTS = {
  cartSel: '#J_Cart',
  itemCountSel: '.J_MakePoint .number',
  selectedItemCountSel: '#J_SelectedItemsCount',
  totalPriceSel: '.J_TotalPrice',
  submitBtnSel: '.submit-btn',
  checkAllSel: '.J_CheckBoxShop',
  orderItemSel: '.J_OrderItem'
};

ShoppingCart.prototype.init = function() {
  var _this = this;
  
  this.$el.on('change', this.opts.checkAllSel, function(e) {
    var $this = $(this);
    if ($this.is(':checked')) {
      _this.checkAll();
    } else {
      _this.uncheckAll();
    }
  });
  
};

ShoppingCart.prototype.checkAll = function() {
  this.$orderItems.each(function(index, el) {
    var item = new ProductItem(el);
    item.check();
  });
  
  this.$checkAll.prop('checked', true);
  this.$selectedItemCount.text(this.getItemCounts());
};

ShoppingCart.prototype.uncheckAll = function() {
  this.$orderItems.each(function(index, el) {
    var item = new ProductItem(el);
    item.uncheck();
  });
  
  this.$checkAll.prop('checked', false);
};

ShoppingCart.prototype.getItemCounts = function() {
  return this.$orderItems.length;
};






