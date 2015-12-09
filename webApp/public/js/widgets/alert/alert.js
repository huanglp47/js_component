/*
 * alert 插件
 * 使用 var GlobalAlert = require('alert'); 
 *      GlobalAlert.show('test' [,'3000',css])//[]：可选
 * 
 */

define(['jquery'], function($) {

    var alertHtml = '<div class="crm_prompt_box">'+ 
					    '<span class="crm_prompt_image"></span>'+
					    '<span class="crm_prompt_text ">{text}</span>'+
				    '</div>';

    return {

        'alertObj': null,

        'timer': null,

        'timeout': 2500,

        'show': function(text, delayTime, cssSetting) {

            var textHtml = alertHtml.replace(/{text}/, text),
                delayTime = delayTime || this.timeout,
                self = this;

            this.close();
            this.alertObj = $(textHtml);

            $(document.body).append(this.alertObj);

            this.setPosition(cssSetting);

            this.timer = setTimeout(function() {
                self.close();
            }, delayTime)
        },

        'close': function() {
            clearTimeout(this.timer);

            this.alertObj && this.alertObj.remove();
            this.alertObj = null;
        },

        'setPosition': function(cssSetting) {
            var winWidth = $(window).width(),
                winHeight = $(window).height(),
                selfWidth = $(this.alertObj).width(),
                selfHeight = $(this.alertObj).height(),
                defaultCss = {},
                allCss = {},
                left = 0,
                top = 20;
            left = 0.5 * (winWidth - selfWidth);
            defaultCss = {
                'left': left + 'px',
                'top': top + 'px',
                'textAlign': 'center'
            };

            allCss = $.extend({}, defaultCss, cssSetting);

            this.alertObj.css(allCss);
        }
    }
})
