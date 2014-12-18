var ProductItem = function(el, opts) {
  this.opts = $.extend({}, ProductItem.DEFAULTS, opts || {});
  this.el = el;
  this.$el = $(el);
  this.$price = this.$el.find(this.opts.priceSel);
  this.$itemSum = this.$el.find(this.opts.itemSumSel);
  this.$qty = this.$el.find(this.opts.qtySel);
  this.$check = this.$el.find(this.opts.checkSel);
};

ProductItem.DEFAULTS = {
  priceSel: '.J_Price',
  itemSumSel: '.J_ItemSum',
  qtySel: '.J_ItemAmount',
  checkSel: '.J_CheckBoxItem'
};

ProductItem.prototype.getUnitPrice = function() {
  return parseFloat(this.$price.text(), 10).toFixed(2);
};

ProductItem.prototype.getSumPrice = function() {
  return parseFloat(this.getQty()*this.getUnitPrice(), 10).toFixed(2);
};

ProductItem.prototype.getQty = function() {
  return this.$qty.val();
};

ProductItem.prototype.setQty = function(qty) {
  this.$qty.val(qty);
};

ProductItem.prototype.remove = function() {
  this.$el.remove();
};

ProductItem.prototype.updateSumPrice = function() {
  this.$itemSum.text(this.getUnitPrice()*this.getQty());
};

ProductItem.prototype.isChecked = function() {
  return this.$check.is(':checked');
};

ProductItem.prototype.check = function() {
  return this.$check.prop('checked', true);
};

ProductItem.prototype.uncheck = function() {
  return this.$check.prop('checked', false);
};
