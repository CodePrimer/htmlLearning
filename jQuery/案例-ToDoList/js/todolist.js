$(function () {
    // input表单绑定回车事件
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {

            if ($(this).val() === "") {
                alert("请输入内容")
            } else {
                // 先读取本地存储原来数据 getData()
                var local = getData();
                // 将local数组更新 
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // local数组更新到到本地存储
                saveData(local);
                load();
                $(this).val('');
            }

        }
    })

    // 读取本地存储数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数组
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载页面
    function load() {

        // 遍历前清空ol里边的内容
        $("ol, ul").empty();

        var data = getData();

        var todocount = 0;
        var donecount = 0;

        // 遍历本地存储数据 添加ol中的li元素
        $.each(data, function (i, n) {
            console.log(n);
            if (n.done === false) {
                $("ol").prepend("<li><input type='checkbox' ><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todocount++;
            } else {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                donecount++;
            }
        })
        // 更新数量
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);

    }

    // 删除操作 不是删除li 而是删除本地存储
    $("ol, ul").on("click", "a", function () {
        // 先获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        // 保存到本地
        saveData(data);
        // 重新渲染页面
        load()
    })

    // 完成操作
    $("ol, ul").on("change", "input", function () {
        // 先获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        // 保存到本地
        saveData(data);
        // 重新渲染页面
        load()
    })

    load();
})