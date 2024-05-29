
$("#turkeymap path").hover(function () {
    $(".names").html("<div> " + $(this).parent().data("cityname") + "</div>");
    $(this).on("mousemove", function (event) {
        $(".names").css("top", (event.pageY - 200));
        $(".names").css("left", event.pageX - 450);
    });
}, function () {
    $(".names").html("");
});


$("#turkeymap path").on("click", function (event) {
    var platecode = $(this).parent().data("platecode");
    window.location = "#" + platecode;
    $(".city-table").find("tr").hide();
    $(".city-table").find("." + platecode).show();
});


$('#upload').submit(function (e) {
    e.preventDefault(); // stop the standard form submission
    $.ajax({
        url: this.action,
        type: this.method,
        data: new FormData(this),
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, error, status) {
            console.log(error, status);
        }
    });
});


$(".left-menu a").on("click", function () {
    $(".left-menu a").removeClass("active");
    $(this).parent(".white-box").find($(".left-tab-content").slideUp());
    $(this).parent(".white-box").find($($(this).attr("href")).slideDown());
    $(this).addClass("active");
});


$(".like-btn").on("click", function () {
    var btn = $(this);
    var liked = {
        CategoryId: $(this).attr("category_id"),
        UserId: $(this).attr("user_id")
    };

    $.ajax({
        url: "/Category/like",
        type: "POST",
        data: liked,
        success: function (data) {
            if (data == "success") {
                btn.find("span").html(parseInt(btn.find("span").text()) + 1);
                btn.find("img").attr("src", "/Content/SiteLayout/images/heart-active.svg");
                btn.addClass("unlike-btn");
                btn.removeClass("like-btn");
            }
        },
        error: function (xhr, error, status) {
            console.log(error, status);
        }
    });

    return false;
});



$(".unlike-btn").on("click", function () {
    btn = $(this);
    var liked = {
        CategoryId: $(this).attr("category_id"),
        UserId: $(this).attr("user_id")
    };

    $.ajax({
        url: "/Category/UnLike",
        type: "POST",
        data: liked,
        success: function (data) {
            btn.removeClass("unlike-btn");
            btn.find("span").html(parseInt(btn.find("span").text()) - 1);
            btn.find("img").attr("src", "/Content/SiteLayout/images/heart.svg");
            btn.addClass("like-btn");
        },
        error: function (xhr, error, status) {
            console.log(error, status);
        }
    });

    return false;
});

