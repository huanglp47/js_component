//main.js
require.config({
	
	baseUrl: 'public/js',

	paths: {
		
		'jquery': 'libs/jquery-1.9.1.min',

		'underscore': 'libs/underscore',

		'mustache': 'libs/mustache',

		'jquery.myPlugins': 'widgets/jQueryPlugin/jqDemoPlugin',

		'jqueryui': 'libs/jquery-ui-1.10.4'

	},

 	shim: {
	   
	    'jquery.myPlugins': ['jquery'],

	    'jqueryui': ['jquery'],

	    'underscore': {
	    	'exports':'_'
	    },

	    'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

	    'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
                //Using a function allows you to call noConflict for
                //libraries that support it, and do other cleanup.
                //However, plugins for those libraries may still want
                //a global. "this" for the function will be the global
                //object. The dependencies will be passed in as
                //function arguments. If this function returns a value,
                //then that value is used as the module export value
                //instead of the object found via the 'exports' string.
                //Note: jQuery registers as an AMD module via define(),
                //so this will not work for jQuery. See notes section
                //below for an approach for jQuery.
                return this.Foo.noConflict();
            }
        }
 　 }
});

require([
	'jquery', 
	'myModules/add/add',
	'jquery.myPlugins',
	'underscore',
	'widgets/alert/alert',
	'widgets/pop/pop',
	'widgets/confirm/confirm',
	'widgets/loadCssOrJs/loadCssOrJs'
], function($, Add, JqDemoPlugin, _, GobalAlert,Pop, Confirm, LoadCssOrJs){

	var $myDiv = $('#myDiv');

	$myDiv.html(Add);
	$myDiv.addClass('aa hhh');

	console.log(_.VERSION); //1.8.2

	$('#testAlert').off('click').on('click', function(){
		GobalAlert.show('ffelshello, felshellofelshello,shello, felshello, felshello, felshello, felshello, felshello, felshello, felshello, felshello, fels');
	});	

	$('#testPop').on('click', function(){
		var opts = {
			'html':'wefrdgf做私房菜第三个',
			'title': '阿双方对分管过哈哈',
			'callBack': function(){
				console.log('done!');
			}
		};
		new Pop(opts);
	});
	
	$('#testPop2').on('click', function(){
		var iframe= $('<iframe frameborder="0" src="http://www.baidu.com">');
		iframe.css({
			width: 800,
			height: 600
		});
		var opts = {
			'html':iframe,
			'title': '阿双方对分管过哈哈',
			'callBack': function(){
				console.log('done!');
			}
		};
		new Pop(opts);
	});

	/*Confirm*/
	$('#testConfirm').on('click', function(){
		var opts = {
			'title': '确定要离开？'	
		};
		new Confirm(opts);
	});

	
	$('#testLoadStat1').on('click', function(){
		new LoadCssOrJs('test.js', 'js');
	});
	$('#testLoadStat2').on('click', function(){
		new LoadCssOrJs('test.css', 'CSS');
	});
	$('#testLoadStat3').on('click', function(){
		new LoadCssOrJs(['test1.js', 'test2.js'], 'js');
	});
	$('#testLoadStat4').on('click', function(){
		new LoadCssOrJs(['test1.js', 'test2.css', 'test9.js', 'test9.Js', 'test111.CSS'], '');
	});
	$('#testLoadStat5').on('click', function(){
		new LoadCssOrJs(['test41.js', 'aa/ss/ddd/test141.CSS']);
	});
});
