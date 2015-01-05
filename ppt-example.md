title: javascript code
speaker: Lanceli
url: https://github.com/nange/javascript-sharing
transition: cards

[slide]

# Show Code
----
Author: LanceLi


[slide]

# 面向对象的核心 {:&.flexbox.vleft}
 
抽象和接口


[slide]

# 先看一下例子的效果


[slide]

# ProductItem.js {:&.flexbox.vleft}

```javascript`
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
```


[slide]

# 接口定义 {:&.flexbox.vleft}

```javascript
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
```


[slide]

# ShoppingCart.js {:&.flexbox.vleft}

```javascript
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
```


[slide]

# 接口定义 {:&.flexbox.vleft}

```javascript
ShoppingCart.prototype.init = function() {
  // init
};

ShoppingCart.prototype.checkAll = function() {
  // do sth...
};

ShoppingCart.prototype.uncheckAll = function() {
  // do sth...
};

ShoppingCart.prototype.getOrderItems = function() {
  // do sth...
};

ShoppingCart.prototype.getItemCounts = function() {
  // do sth...
};

ShoppingCart.prototype.getSelectedItemCounts = function() {
  // do sth...
};

ShoppingCart.prototype.getTotalPrice = function() {
  // do sth...
};

ShoppingCart.prototype.updateCart = function() {
  // do sth...
};
```


[slide]

# 以init方法为例 {:&.flexbox.vleft}

```javascript
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
    _this.updateCart();
  });
  
  this.$el.on('input', '.J_ItemAmount', function(e) {
    var $this = $(this);
    var $el = $this.closest(_this.opts.orderItemSel);
    var item = new ProductItem($el[0]);
    var qty = item.getQty();
    
    if (qty < 1) item.setQty(1);
    item.updateQtyStatus();
    item.updateSumPrice();
    _this.updateCart();
  });
  
  this.$el.on('click', '.J_Plus, .J_Minus', function(e) {
    var $this = $(this);
    var $el = $this.closest(_this.opts.orderItemSel);
    var item = new ProductItem($el[0]);
    var qty = item.getQty();
    
    if ($this.hasClass('J_Plus')) {
      item.setQty(qty+1);
    } else {
      if (qty == 1) return;
      item.setQty(qty-1);
    }
    item.updateQtyStatus();
    item.updateSumPrice();
    _this.updateCart();
  });
  
  this.$el.on('click', '.J_Del', function(e) {
    var $this = $(this);
    var $el = $this.closest(_this.opts.orderItemSel);
    var item = new ProductItem($el[0]);
    
    item.remove();
    _this.updateCart();
  });
  
  this.$el.on('click', '.J_DeleteSelected', function(e) {
    e.preventDefault();
    _this.getOrderItems().each(function(index, el) {
      var item = new ProductItem(el);
      if (item.isChecked()) item.remove();
    });
    _this.updateCart();
  });
  
};
```


[slide]

# 补充:如何编写异步代码 {:&.flexbox.vleft}

javascript中的IO,默认都是异步的(why?).


[slide]

# 方法1 {:&.flexbox.vleft}
使用回调.多个ajax请求如果有顺序依赖的话, 代码很可能是这样:

```javascript
$.ajax({
  url: 'http://xxxx.com/xxx',
  type: 'post',
  success: function(obj) {
    // do sth...	
	if (obj.success) {
	  $.ajax({
		url: 'http://xxx.com/xxx2',
		type: 'post',
		success: function(obj) {
		  // do sth...
		  console.log(obj.name);
		}
	  });
	}
  }
});
```
这样的代码难以阅读和维护. 心智负担极高.


[slide]

# 方法2 {:&.flexbox.vleft}
使用Promise.改写:

```javascript
$.ajax({
  url: 'http://xxxx.com/xxx',
  type: 'post'
}).done(function(obj) {
  // do sth...
  if (obj.success) {
	var promise = $.ajax({
	  url: 'http://xxx.com/xxx2',
	  type: 'post'
	});
	return promise;
  }
}).done(function(obj) {
  // do sth...
  console.log(obj.name);
}).fail(function() {
  console.log('ajax error...')
});
```


[slide]

# 补充:理解requirejs的执行逻辑 {:&.flexbox.vleft}

理解requirejs的加载和执行流程, 可以极大的减少很多离奇bug.

[slide]

引入js:
```html
<script src="js/lib/require.js" data-main="js/main"></script>
```

main 入口:
```javascript
require(['config'], function() {
require(['jquery', 'ShoppingCart'], function($, ShoppingCart) {
  // 初始化ShoppingCart
  $(function() {
    var cart = new ShoppingCart();  
    cart.init();
  });
  
});
});
```

[slide]

ShoppingCart.js:
```javascript
define(['jquery', 'ProductItem'], function($, ProductItem) {
	// do sth...
	return ShoppingCart;
}
```

ProductItem.js:
```javascript
define(['jquery'], function($) {
	// do sth...
	return ProductItem;
}
```



