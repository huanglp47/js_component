/**
 * jquery自定义插件相关
 * By LiPeng 
 * Date 2015-05-04
 */
 
 $.fn.extend({
 	// $('body').addClass('aa hhh')
 	addClass: function(item){
 		if(typeof item == 'string'){
 			for(var i=0,el; el = this[i++];){
 				if(el.nodeType === 1){
 					if(!el.className){
 						el.className = item;
 					}else{
 						var a = (el.className+' '+item).match(/\S+/g);
 						a.sort();
 						for(var j=a.length-1; j>0; j--){
 							if(a[j] === a[j-1]){
 								a.splice(j,1);
 								a.className = a.join(' ');
 							}
 						}
 					}
 				}
 			}
 		}
 		return this;
 	}
 })
 

 