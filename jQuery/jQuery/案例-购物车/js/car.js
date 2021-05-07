$(function () {
    // 1.全选功能
    $(".checkall").change(function () {
        console.log(111);
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        // 选中商品高亮
        if ($(this).prop("checked")) {
            // 让所有商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    });

    // 2. 如果小复选框被选中的个数等于所有小复选框个数 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    });

    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        // 先获取当前文本框数字，在这个基础上进行运算
        var num = parseInt($(this).siblings(".itxt").val());
        num += 1;
        // console.log("当前数量 " + num);
        $(this).siblings(".itxt").val(num);

        // 计算小计
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log("当前价格 " + p);
        var price = (p * num).toFixed(2) // 四舍五入2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);

        getSum();

    });

    $(".decrement").click(function () {
        // 不能为负数
        var num = parseInt($(this).siblings(".itxt").val());
        if (num <= 1) {
            return false
        }
        num -= 1;
        $(this).siblings(".itxt").val(num);
        // 计算小计
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * num).toFixed(2) // 四舍五入2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);

        // TODO 计算总价
        getSum();

    });

    // 4.手动输入数量模块
    $(".itxt").change(function (event) {
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var num = parseInt($(this).val());
        console.log("当前数量 " + num);
        var price = (p * num).toFixed(2) // 四舍五入2位小数

        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);

        getSum();
    })

    // 计算总计和总价模块
    function getSum() {
        var count = 0;
        var money = 0;

        $(".j-checkbox:checked").each(function (i, n) {

            count += parseInt($(n).parents(".cart-item").find(".itxt").val());
            money += parseFloat($(n).parents(".cart-item").find(".p-sum").text().substr(1));
        })

        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    // (1) 商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // (2) 删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })

    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })
    getSum();
});