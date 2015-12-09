 /**
  * url: string or Array
  * type: string or undefined
  * usage:  loadCssOrJs('test.js', 'js');
	        loadCssOrJs('test.css', 'CSS');
	        loadCssOrJs(['test1.css','test2.css'], 'css'); 
	        loadCssOrJs(['test1.css','test2.css', 'test3.css'], 'css');
	        loadCssOrJs(['test1.js','test2.js'], 'js');
	        loadCssOrJs(['test1.js', 'test2.js', 'test3.js'], 'js');
	        loadCssOrJs(['test1.js', 'test2.css', 'test9.js', 'test9.Js', 'test111.CSS']);
  */
 define([], function() {

     function isArray(val) {
         return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Array]'
     };

     function isString(val) {
         return typeof val === 'string'
     };

     function formatUrltoLowerCase(url) {
         return url.toLowerCase();
     };

     function isExist(url, type) {
         var tag = type === 'css' ? 'link' : 'script';
         var arr = document.getElementsByTagName(tag);
         return isExistSomeStyle(url, arr, type);
     };

     function isExistSomeStyle(url, arr, type) {
         var len = arr.length,
             href = '';
         for (var i = 0; i < len; i++) {
             href = (type == 'css') ? arr[i].href : arr[i].src || '';
             if (href == url || href.indexOf(url) > -1) { //已经存在 TODO(优化)
                 return true
             }
         }
         return false //都不存在，可以添加
     };

     function createStatic(url, type) {
         if (type == 'js') {
             createScript(url);
         } else if (type == 'css') {
             createStyle(url);
         }
     };

     function createScript(url) {
         var scrpit = document.createElement('script');
         scrpit.setAttribute('src', url);
         scrpit.setAttribute('type', 'text/javascript');
         document.getElementsByTagName("head")[0].appendChild(scrpit);
     };

     function createStyle(url) {
         var style = document.createElement('link');
         style.setAttribute('type', 'text/css');
         style.setAttribute('rel', 'stylesheet');
         style.setAttribute('href', url);
         document.getElementsByTagName("head")[0].appendChild(style);
     };

     var LoadCssOrJs = function(url, type) {
         if (type) {
             var type = formatUrltoLowerCase(type);
             if (isArray(url)) {
                 var len = url.length;
                 for (var i = 0; i < len; i++) {
                     if (!isExist(url[i], type)) {
                         createStatic(url[i], type);
                     };
                 };
             } else if (isString(url)) {
                 createStatic(url, type);
             }
         } else { // 只有第一个参数时
             var arrUrl = null,
                 type = null;
             if (isArray(url)) {
                 var len = url.length,
                     urlObj = null; // url数组内元素 
                 for (var i = 0; i < len; i++) {
                     urlObj = formatUrltoLowerCase(url[i]);
                     type = urlObj.split('.')[1];
                     if (!isExist(urlObj, type)) {
                         createStatic(urlObj, type);
                     };
                 }
             } else if (isString(url)) {
                 arrUrl = url.split('.');
                 type = formatUrltoLowerCase((arrUrl[arrUrl.length - 1])) === 'css' ? 'css' : 'js';
                 createStatic(url, type);
             }
         }
     };
     return LoadCssOrJs
 })
