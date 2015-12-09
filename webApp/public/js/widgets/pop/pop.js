/**
 * Pop弹框
 *
 */
define([], function() {

    function Pop(opts) {
        this.html = opts.html || '';
        this.title = opts.title || '提示框';
        this.callBack = opts.callBack || function() {};

        this.init();
    };

    Pop.prototype = {

        init: function() {
            this.createDialog();
            this.renderBody();
            this.bindEvent();
        },

        renderBody: function() {
            this.el = $('<div class="pop"><div class="pop-title">' + this.title + '</div><a class="pop-close">X</a><div class="pop-body"></div></div>');
            this.el.find('.pop-body').append(this.html);
            $('body').append(this.el);
            this.setPositon();
            this.callBack && this.callBack();
        },

        setPositon: function() {
            this.el.animate({
                opacity: 1,
                marginTop: '0px'
            }, 400);
        },

        createDialog: function() {
            $('.dialog') && $('.dialog').remove();
            $('body').append('<div class="dialog"></div>');
            $('.dialog').height($(document).height());
        },

        close: function() {
            $('.dialog').remove();
            $('.pop').animate({
                opacity: 0,
                marginTop: '-100px'
            }, 300, function() {
                $('.pop').remove();
            });
        },

        bindEvent: function() {
            var me = this;
            $(document).on('click', '.dialog', function() {
                me.close();
            });

            me.el.on('click', '.pop-close', function() {
                me.close();
            });
        }

    };
    return Pop
});
