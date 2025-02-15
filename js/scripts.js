$(function () {
    'use strict';

    let stepFormHeight = 0,
        stepFormResults,
        stepFormProgress = 100 / $('.step-form__step').length;

    $('.step-form__step').each(function () {
        let thisHeight = $(this).outerHeight();
        if (thisHeight > stepFormHeight) {
            stepFormHeight = thisHeight;
        }
    });

    //$('.step-form__step').height(stepFormHeight);

    $('.step-form__progress').css('width', stepFormProgress + '%')
    $('.step-form__btn a').on('click', function () {
        if ($('.step-form__step.active .step-form__object-item.active').length || $('.step-form__step.active .step-form__list-item.active').length) {
            if ($('.step-form__step.active').index() != $('.step-form__step').length) {
                $('.step-form__step.active').removeClass('active').next().addClass('active')
                $('.step-form__progress').css('width', stepFormProgress * ($('.step-form__step.active').index() + 1) + '%')

                if ($('.step-form__step.active').index() + 1 == $('.step-form__step').length) {
                    $('.step-form__bottom').hide()
                }


                console.log($('.step-form__step.active .step-form__step-number').text() + $('.step-form__step.active .step-form__object-item.active .step-form__object-item-name').text() + $('.step-form__step.active .step-form__list-item.active .title').text() + ';\n')
                $('.step-form__form .form-field.hidden-form-results textarea').val(stepFormResults);

            }
        }
    })
    $('.step-form__object-item').on('click', function () {
        $(this).closest('.step-form__step').find('.step-form__object-item').removeClass('active')
        $(this).closest('.step-form__step').find('.step-form__object-check').removeClass('active')
        $(this).addClass('active')
        $(this).find('.step-form__object-check').addClass('active')
    })

    $('.step-form__list-item').on('click', function () {
        if ($(this).closest('.step-form__step').hasClass('multiselect')) {
            $(this).toggleClass('active')
            $(this).find('.check').toggleClass('active')
        } else {
            $(this).closest('.step-form__step').find('.step-form__list-item').removeClass('active')
            $(this).closest('.step-form__step').find('.check').removeClass('active')
            $(this).addClass('active')
            $(this).find('.check').addClass('active')
        }

    })

    $('.step-form__form .form-field button').on('click', function (event) {

        event.preventDefault();

        let input1 = '',
            input2 = '',
            input3 = '',
            stepFormResults = '';
        
        $('.step-form__step:not(:last-child)').each(function(){
            stepFormResults = stepFormResults + $(this).find('.step-form__step-number').text() + ': ' + $(this).find('.step-form__object-item.active .step-form__object-name').text() + $(this).find('.step-form__list-item.active .title').text()+'; ' + ';\n';
        })
        $('.step-form__form .form-field.hidden-form-results textarea').val(stepFormResults)

        input1 = $('.step-form__form .form-field').first().find('input').val();
        input2 = $('.step-form__form .form-field:nth-child(2)').find('input').val();
        input3 = $('.step-form__form .form-field.hidden-form-results textarea').val();

        $.ajax({
            url: './js/send.php',
            method: 'post',
            data: {
                input1: input1,
                input2: input2,
                input3: input3,
            },
            beforeSend: function () {
                //$('.send_from').text('loading');
            },
            success: function (data) {
                //location.href = "thankyou.html";
                $('.step-form__step.last-step .step-form__form form').hide()
                $('.step-form__success').show()

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        })
    })

    $('.form-block__form form button').on('click', function (event) {
        event.preventDefault();

        let input1 = '',
            input2 = '';
        
        input1 = $('.form-block__form .form-field').first().find('input').val();
        input2 = $('.form-block__form .form-field:nth-child(2)').find('input').val();

        $.ajax({
            url: './js/send.php',
            method: 'post',
            data: {
                input1: input1,
                input2: input2,
            },
            beforeSend: function () {
                //$('.send_from').text('loading');
            },
            success: function (data) {
                //location.href = "thankyou.html";
                $('.form-block__form form').hide()
                $('.form-block__success').show()

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        })
    })

    resizeController(991, function () {

        $('.map-block').insertAfter('.contacts__title');

    }, function () {

        $('.map-block').appendTo('.contacts > .container > .row');

    });

});
document.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('input.phone-input'), function (input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                newValue = newValue.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
})

function resizeController() { var i = $(window), o = i.width(), n = [], e = [], t = [void 0, void 0]; if (arguments.length) for (var d = 0; d <= arguments.length - 1; d++)$.isArray(arguments[d]) ? n = arguments[d] : $.isNumeric(arguments[d]) ? n.push(arguments[d]) : $.isFunction(arguments[d]) && e.push(arguments[d]); i.resize(function (d) { o = i.width(), n.length > 1 ? o >= n[0] && o <= n[n.length - 1] && void 0 === t[0] ? (e[0](), t[0] = !0, t[1] = void 0) : (o < n[0] || o > n[n.length - 1]) && void 0 === t[1] && (t[0] = void 0, t[1] = !0, $.isFunction(e[1]) && e[1]()) : 1 == n.length && (o <= n[0] && void 0 === t[0] ? (e[0](), t[0] = !0, t[1] = void 0) : o > n[0] && void 0 === t[1] && (t[0] = void 0, t[1] = !0, $.isFunction(e[1]) && e[1]())) }).trigger("resize") };
