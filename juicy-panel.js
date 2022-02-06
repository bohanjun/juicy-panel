function checkmobi() {
    return ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
        .some(agent => navigator.userAgent.indexOf(agent) > 0)
}

$(".panel").addClass(checkmobi() ? "panel-mobi" : "panel-pc")

let focused_main

$(".panel-pc>.nav>.inner>.item").click(function () {
    $(".panel-pc>.content>.inner>.sub>.inner").css("left", `calc(-${$(this).attr("sub-data")} * 28rem)`)
})

$(".panel-pc>.content>.inner>.sub>.inner>.subside>.item>.fake-button").click(function () {
    let last_focused_main = focused_main
    focused_main = $(this).parent().attr("main-data")
    $(`.panel-pc>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("height", "0rem")
    $(`.panel-pc>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("height", "100%")
})

$(".panel-pc>.content>.inner>.sub>.inner>.subside>.item>.right-floating>.more").click(function () {
    let last_focused_main = focused_main
    focused_main = $(this).parent().parent().attr("main-data")
    $(`.panel-pc>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("height", "0rem")
    $(`.panel-pc>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("height", "100%")
})

$(".panel-mobi>.nav>.inner>.item").click(function () {
    $(".panel-mobi>.content>.inner>.sub>.inner").css("left", `calc(-${$(this).attr("sub-data")} * 100vw)`)
    $(".panel-mobi>.content>.inner").css("left", "0vw")
})

$(".panel-mobi>.content>.inner>.sub>.inner>.subside>.item>.fake-button").click(function () {
    let last_focused_main = focused_main
    focused_main = $(this).parent().attr("main-data")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("height", "0")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("height", "100%")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("overflow", "hidden")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("overflow", "auto")
    $(".panel-mobi>.content>.inner").css("left", "-100vw")
})

$(".panel-mobi>.content>.inner>.sub>.inner>.subside>.item>.right-floating>.more").click(function () {
    let last_focused_main = focused_main
    focused_main = $(this).parent().parent().attr("main-data")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("height", "0")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("height", "100%")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${last_focused_main}]`).css("overflow", "hidden")
    $(`.panel-mobi>.content>.inner>.main>.submain[main-data=${focused_main}]`).css("overflow", "auto")
    $(".panel-mobi>.content>.inner").css("left", "-100vw")
})

if (checkmobi()) {
    Array.from(document.getElementsByClassName("slider")).forEach(slider => {
        let thumb = slider.querySelector('.thumb')
        let fake_slider = slider.querySelector('.fake-slider')

        defaultLeft = (parseInt(slider.getAttribute("data-val")) - parseInt(slider.getAttribute("data-min"))) * (slider.offsetWidth - thumb.offsetWidth)
            / (parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))

        thumb.style.left = `${defaultLeft}px`

        thumb.ontouchstart = function (event) {
            thumb.style.backgroundColor = "rgb(93, 122, 250)"
            event.preventDefault()

            const touches = event.changedTouches

            let shiftX = touches[0].pageX - thumb.getBoundingClientRect().left

            document.addEventListener('touchmove', onTouchMove)
            document.addEventListener('touchend', onTouchEnd)

            function onTouchMove(event) {
                const touches = event.changedTouches

                let newLeft = touches[0].pageX - shiftX - slider.getBoundingClientRect().left

                if (newLeft < 0) newLeft = 0

                let rightEdge = slider.offsetWidth - thumb.offsetWidth

                if (newLeft > rightEdge) newLeft = rightEdge

                thumb.style.left = `${newLeft}px`

                val = Math.round((parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))
                    / rightEdge * newLeft + parseInt(slider.getAttribute("data-min"))).toString()

                slider.setAttribute("data-val", val)

                slider.getElementsByTagName("input")[0].setAttribute("value", val)
            }

            function onTouchEnd() {
                thumb.style.backgroundColor = "rgb(202, 200, 204)"
                document.removeEventListener('touchmove', onTouchMove)
                document.removeEventListener('touchend', onTouchEnd)
            }
        }

        thumb.ondragstart = function () { return false }

        fake_slider.onmousedown = function (event) {
            let shiftX = event.clientX - slider.getBoundingClientRect().left

            if (shiftX < 13.6) shiftX = 13.6

            let rightEdge = slider.offsetWidth - thumb.offsetWidth

            if (shiftX > rightEdge + 13.82) shiftX = rightEdge + 13.82

            thumb.style.left = `${shiftX - 13.6}px`

            val = Math.round((parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))
                / rightEdge * (shiftX - 13.6) + parseInt(slider.getAttribute("data-min"))).toString()

            slider.setAttribute("data-val", val)

            slider.getElementsByTagName("input")[0].setAttribute("value", val)
        }
    })
} else {
    Array.from(document.getElementsByClassName("slider")).forEach(slider => {
        let thumb = slider.querySelector('.thumb')
        let fake_slider = slider.querySelector('.fake-slider')

        defaultLeft = (parseInt(slider.getAttribute("data-val")) - parseInt(slider.getAttribute("data-min"))) * (slider.offsetWidth - thumb.offsetWidth)
            / (parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))

        thumb.style.left = `${defaultLeft}px`

        thumb.onmousedown = function (event) {
            event.preventDefault()

            let shiftX = event.clientX - thumb.getBoundingClientRect().left

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)

            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left

                if (newLeft < 0) newLeft = 0

                let rightEdge = slider.offsetWidth - thumb.offsetWidth

                if (newLeft > rightEdge) newLeft = rightEdge

                thumb.style.left = `${newLeft}px`

                val = Math.round((parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))
                    / rightEdge * newLeft + parseInt(slider.getAttribute("data-min"))).toString()

                slider.setAttribute("data-val", val)

                slider.getElementsByTagName("input")[0].setAttribute("value", val)
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp)
                document.removeEventListener('mousemove', onMouseMove)
            }
        }

        thumb.ondragstart = function () { return false }

        fake_slider.onmousedown = function (event) {
            let shiftX = event.clientX - slider.getBoundingClientRect().left

            if (shiftX < 5.6) shiftX = 5.6

            let rightEdge = slider.offsetWidth - thumb.offsetWidth

            if (shiftX > rightEdge + 5.92) shiftX = rightEdge + 5.92

            thumb.style.left = `${shiftX - 5.6}px`

            val = Math.round((parseInt(slider.getAttribute("data-max")) - parseInt(slider.getAttribute("data-min")))
                / rightEdge * (shiftX - 5.6) + parseInt(slider.getAttribute("data-min"))).toString()

            slider.setAttribute("data-val", val)

            slider.getElementsByTagName("input")[0].setAttribute("value", val)
        }
    })
}