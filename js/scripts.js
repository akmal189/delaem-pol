$(function(){
    'use strict';

    let stepFormHeight = 0,
        stepFormResults,
        stepFormProgress = 100/$('.step-form__step').length;
  
    $('.step-form__step').each(function() {
        let thisHeight = $(this).outerHeight();
        if (thisHeight > stepFormHeight) {
            stepFormHeight = thisHeight;
        }
    });

    //$('.step-form__step').height(stepFormHeight);

    $('.step-form__progress').css('width', stepFormProgress+'%')
    $('.step-form__btn a').on('click', function(){
        if($('.step-form__step.active .step-form__object-item.active').length || $('.step-form__step.active .step-form__list-item.active').length) {
            if($('.step-form__step.active').index() != $('.step-form__step').length) {
                $('.step-form__step.active').removeClass('active').next().addClass('active')
                $('.step-form__progress').css('width', stepFormProgress*($('.step-form__step.active').index()+1)+'%')
                
                if($('.step-form__step.active').index()+1 == $('.step-form__step').length) {
                    $('.step-form__bottom').hide()
                }
                
                
                console.log($('.step-form__step.active .step-form__step-number').text() + $('.step-form__step.active .step-form__object-item.active .step-form__object-item-name').text() + $('.step-form__step.active .step-form__list-item.active .title').text() + ';\n')
                $('.step-form__form .form-field.hidden-form-results textarea').val(stepFormResults);
                
            }
        }
    })
    $('.step-form__object-item').on('click', function(){
        $(this).closest('.step-form__step').find('.step-form__object-item').removeClass('active')
        $(this).closest('.step-form__step').find('.step-form__object-check').removeClass('active')
        $(this).addClass('active')
        $(this).find('.step-form__object-check').addClass('active')
    })

    $('.step-form__list-item').on('click', function(){
        $(this).closest('.step-form__step').find('.step-form__list-item').removeClass('active')
        $(this).closest('.step-form__step').find('.check').removeClass('active')
        $(this).addClass('active')
        $(this).find('.check').addClass('active')
    })

    $('.step-form__form form').on('submit', function(){
        let stepFormResults = '';
        $('.step-form__step:not(:last-child)').each(function(){
            stepFormResults = stepFormResults + $(this).find('.step-form__step-number').text() + ': ' + $(this).find('.step-form__object-item.active .step-form__object-name').text() + $(this).find('.step-form__list-item.active .title').text() + ';\n';
        })
        $('.step-form__form .form-field.hidden-form-results textarea').val(stepFormResults)
    })

});
document.addEventListener('DOMContentLoaded', function(){
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