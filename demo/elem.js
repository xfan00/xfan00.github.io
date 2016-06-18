$.ajax({
    url: 'elem.json',
    success: function (resp) {
        var html = template('onefood', resp);
        $('.J-menu').html(html);
        $(".food").each(function () {
            var menu = new Menu({
                elem:this,
                title:$(this).find('h5').text(),
                price:$(this).find('.price').text()
            });
        });
    }
});

$(document).on("click", ".J-sum", function () {
    var sum = 0;
    $(".oneOrder").each(function () {
        sum = sum + parseInt($(this).find(".price").text());
    })
    $("#total").text(sum);
})

$(document).on("change", ".J-count", function () {
    var sum = 0;
    $(".oneOrder").each(function () {
        sum = sum + parseInt($(this).find(".price").text());
    })
    $("#total").text(sum);
})


// oop对象函数

function Menu(obj) {
    this.$el = $(obj.elem);
    this.title = obj.title;
    this.price = obj.price;
    this.bind();
}

Menu.prototype = {
    // 标题
    title: '',
    // 价格
    price: null,
    // 点单数
    count: 0,
    // dom节点
    $el: null,
    // 购物车里的副本
    $target: null,
    // 绑定
    bind: function () {
        var _this = this;
        this.$el.on("click", ".putincart", function () {
            _this.select();
        })
        this.$el.on("click", ".add", function () {
            _this.add();
        })
        this.$el.on("click", ".reduce", function () {
            _this.reduce();
        })
        this.$el.on("change", "input", function () {

            _this.count = parseInt($(this).val());
            if (_this.count < 0 || isNaN(_this.count)) {
                alert("你到底要多少呀？ps：郑超是笨蛋");
                _this.count = 1;
            };
            _this.add();
            _this.reduce();
        });
    },
    select: function () {
        this.count = 1;
        this.$el.find(".amount").css("display", "table");
        this.$el.find(".amount input").val(1);

        var data = {
            title: this.title,
            price: this.price,
            count: this.count
        };

        var html = template("order", data);
        this.$target = $(html);

        this.$target.on("click", ".add", function () {
            _this.add();
        });
        this.$target.on("click", ".reduce", function () {
            _this.reduce();
        });
        $(".orderList").append(this.$target);
    },
    add: function () {
        this.count++;
        this.$el.find(".amount input").val(this.count);
        this.$target.find(".amount input").val(this.count);
        this.$target.find(".price").text(this.count * this.price);
    },
    reduce: function () {
        if (this.count == 1) {
            this.unselect();
            return;
        }
        this.count--;
        this.$el.find(".amount input").val(this.count);
        this.$target.find(".amount input").val(this.count);
        this.$target.find(".price").text(this.count * this.price);
    },
    unselect: function () {
        this.count = 0;
        this.$el.find(".amount").css("display", "none");
        this.$target.remove();
    }
}





