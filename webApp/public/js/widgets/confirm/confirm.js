/**
 * Confirm确认框
 *
 */
define(['widgets/pop/pop'], function(Pop) {
    function Confirm(opts) {
        this.title = opts.title;
        this.callBack = opts.callBack || function(){};
        
        var html = '<div class="confirm"><p>' + this.title + '</p><div><button type="button" class="btn">确定</button><button type="button" class="btn">取消</button></div></div>';
        new Pop({
            html: html,
            title: '温馨提示',
            callBack: function() {
                var me = this;
                me.el.find('button:first').click(function() {
                    if (me.callBack && typeof me.callBack === 'function') {
                        me.close();
                        me.callBack();
                    };
                });
                me.el.find('button:last').click(function() {
                    me.close();
                });
            }
        });
    };
    return Confirm
});
