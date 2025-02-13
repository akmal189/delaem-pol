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
})