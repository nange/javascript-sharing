var ProductItem = function(el, opts) {
  this.opts = $.extend({}, ProductItem.DEFAULTS, opts || {});
  this.el = el;
  this.$el = $(el);
  this.$price = this.$el.find(this.opts.priceSel);
  this.$itemSum = this.$el.find(this.opts.itemSumSel);
  this.$qty = this.$el.find(this.opts.qtySel);
  this.$check = this.$el.find(this.opts.checkSel);
  this.$minusBtn = this.$el.find(this.opts.minusSel);
  this.$plusBtn = this.$el.find(this.opts.plusSel);
};

ProductItem.DEFAULTS = {
  priceSel: '.J_Price',
  itemSumSel: '.J_ItemSum',
  qtySel: '.J_ItemAmount',
  checkSel: '.J_CheckBoxItem',
  minusSel: '.J_Minus',
  plusSel: '.J_Plus'
};

ProductItem.prototype.getUnitPrice = function() {
  return parseFloat(this.$price.text(), 10).toFixed(2);
};

ProductItem.prototype.getSumPrice = function() {
  return parseFloat(this.getQty()*this.getUnitPrice(), 10).toFixed(2);
};

ProductItem.prototype.getQty = function() {
  return parseInt(this.$qty.val(), 10);
};

ProductItem.prototype.setQty = function(qty) {
  this.$qty.val(qty);
};

ProductItem.prototype.updateQtyStatus = function() {
  if (this.getQty() > 1) {
    this.$minusBtn.removeClass('no-minus');
  } else {
    this.$minusBtn.addClass('no-minus');
  }
};

ProductItem.prototype.remove = function() {
  this.$el.remove();
};

ProductItem.prototype.updateSumPrice = function() {
  var sumPrice = parseFloat(this.getUnitPrice()*this.getQty(), 10).toFixed(2);
  this.$itemSum.text(sumPrice);
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
