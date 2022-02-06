$(".checkbox").children('input[type="hidden"]').val(
    $(this).attr("ui-checked") == "true"
        ? ($(this).attr("data-checked") == undefined ? "true" : $(this).attr("data-checked"))
        : ($(this).attr("data-unchecked") == undefined ? "false" : $(this).attr("data-unchecked"))
)

$(".checkbox").click(function () {
    $(this).attr(
        "ui-checked",
        $(this).attr("ui-checked") == "true" ? "false" : "true"
    )
    $(this).children('input[type="hidden"]').val(
        $(this).attr("ui-checked") == "true"
            ? ($(this).attr("data-checked") == undefined ? "true" : $(this).attr("data-checked"))
            : ($(this).attr("data-unchecked") == undefined ? "false" : $(this).attr("data-unchecked"))
    )
})

$(document).bind("click", function (e) {
    if ($(e.target).closest(".drop-select").length == 0) {
        $(".drop-select").attr("ui-dropped", "false")
    }
})

$(".drop-select").click(function () {
    let focused = this;
    $(".drop-select").each(function () {
        if (this != focused) $(this).attr("ui-dropped", "false")
    })
    $(this).attr("ui-dropped", $(this).attr("ui-dropped") == "true" ? "false" : "true")
})

$(".drop-select").each(function () {
    $(this).children(".selected").children("span").attr("data-display",
        $(this).children(".options").children(".option.default").children("span").attr("data-display"))
    $(this).children('input[type="hidden"]').val(
        $(this).children(".options").children(".option.default").attr("data"))
})

$(".drop-select>.options>.option").click(function () {
    $(this).parent().parent().children(".selected").children("span").attr("data-display",
        $(this).children("span").attr("data-display"))
    $(this).parent().parent().children('input[type="hidden"]').val(
        $(this).attr("data"))
})