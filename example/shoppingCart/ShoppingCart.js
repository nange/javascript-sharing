var ShoppingCart = function(opts) {
  this.opts = $.extend({}, ShoppingCart.DEFAULTS, opts || {});
  this.$el = $(this.opts.cartSel);
  this.$itemCount = this.$el.find(this.opts.itemCountSel);
  this.$selectedItemCount = this.$el.find(this.opts.selectedItemCountSel);
  this.$totalPrice = this.$el.find(this.opts.totalPriceSel);
  this.$submitBtn = this.$el.find(this.opts.submitBtnSel);
  this.$checkAll = this.$el.find(this.opts.checkAllSel);
  this.$orderList = this.$el.find(this.opts.orderListSel);
};

ShoppingCart.DEFAULTS = {
  cartSel: '#J_Cart',
  itemCountSel: '.J_MakePoint .number',
  selectedItemCountSel: '#J_SelectedItemsCount',
  totalPriceSel: '.J_TotalPrice',
  submitBtnSel: '.submit-btn',
  checkAllSel: '.J_CheckBoxShop',
  orderListSel: '#J_OrderList',
  orderItemSel: '.J_OrderItem'
};

ShoppingCart.prototype.init = function() {
  var _this = this;
  
  this.$el.on('change', this.opts.checkAllSel, function(e) {
    if ($(this).is(':checked')) {
      _this.checkAll();
    } else {
      _this.uncheckAll();
    }
  });

  this.$el.on('change', '.J_CheckBoxItem', function(e) {
    var $this = $(this);
    var $el = $this.closest(_this.opts.orderItemSel);
    var selectedCounts = _this.getSelectedItemCounts();

    if ($el.is(':checked')) {
      if (selectedCounts === _this.getItemCounts()) {
        _this.checkAll();
      }

    } else {
      _this.$checkAll.prop('checked', false);
      _this.$totalPrice.text(_this.getTotalPrice());

      if (selectedCounts === 0) {
        _this.$submitBtn.addClass('submit-btn-disabled');
      }
    }

    this.$selectedItemCount.text(selectedCounts);
  });

  
  
};

ShoppingCart.prototype.checkAll = function() {
  this.getOrderItems().each(function(index, el) {
    var item = new ProductItem(el);
    item.check();
  });
  
  var itemCounts = this.getItemCounts();

  this.$checkAll.prop('checked', true);
  this.$selectedItemCount.text(itemCounts);
  this.$totalPrice.text(this.getTotalPrice());

  if (itemCounts > 0) {
    this.$submitBtn.removeClass('submit-btn-disabled');
  }
};

ShoppingCart.prototype.uncheckAll = function() {
  this.getOrderItems().each(function(index, el) {
    var item = new ProductItem(el);
    item.uncheck();
  });
  
  this.$checkAll.prop('checked', false);
  this.$selectedItemCount.text(0);
  this.$totalPrice.text(0.00);

  this.$submitBtn.addClass('submit-btn-disabled');
};

ShoppingCart.prototype.getOrderItems = function() {
  return this.$orderList.children(this.opts.orderItemSel);
};

ShoppingCart.prototype.getItemCounts = function() {
  return this.getOrderItems().length;
};

ShoppingCart.prototype.getSelectedItemCounts = function() {
  var counts = 0;

  this.getOrderItems().each(function(index, el) {
    var item = new ProductItem(el);
    if (item.isChecked()) {
      counts += 1;
    }
  });

  return counts;
};

ShoppingCart.prototype.getTotalPrice = function() {
  var total = 0;

  this.getOrderItems().each(function(index, el) {
    var item = new ProductItem(el);
    if (item.isChecked()) {
      total += parseFloat(item.getSumPrice(), 10);
    }
  });

  return total.toFixed(2);
};


