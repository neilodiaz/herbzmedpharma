function caluclate_page_numbers(){jQuery.each(jQuery(".page-creator .page"),function(e){num=e+1;jQuery(this).find(".page-number").html("page "+num)})}function makeSortable(){jQuery(".product_categories").sortable({connectWith:".product_categories",placeholder:"placeholder",update:function(e,t){savePositions(e,t)}});jQuery(".product_categories").disableSelection()}function savePositions(e,t){if(typeof t=="undefined"||t.sender!=null){positions="{";jQuery.each(jQuery(".page-creator .page"),function(e){e==0?positions=positions+'"'+e+'":{':positions=positions+',"'+e+'":{';positions+=' "left":{';elementlength=jQuery(this).find(".page_left .product_category").length;elementlength>0&&jQuery.each(jQuery(this).find(".page_left .product_category"),function(e){id=jQuery(this).attr("data-id");e+1==elementlength?positions=positions+'"'+e+'":"'+id+'"':positions=positions+'"'+e+'":"'+id+'",'});positions+="}";positions+=', "right":{';elementlength=jQuery(this).find(".page_right .product_category").length;elementlength>0&&jQuery.each(jQuery(this).find(".page_right .product_category"),function(e){id=jQuery(this).attr("data-id");e+1==elementlength?positions=positions+'"'+e+'":"'+id+'"':positions=positions+'"'+e+'":"'+id+'",'});positions+="}";positions+="}"});positions+="}";jQuery.ajax({url:ajaxurl,type:"post",data:{positions:positions,action:"rf_save_product_build"},success:function(e){}})}}function explode(e,t,n){if(arguments.length<2||typeof e=="undefined"||typeof t=="undefined")return null;if(e===""||e===!1||e===null)return!1;if(typeof e=="function"||typeof e=="object"||typeof t=="function"||typeof t=="object")return{0:""};e===!0&&(e="1");e+="";t+="";var r=t.split(e);if(typeof n=="undefined")return r;n===0&&(n=1);if(n>0)return n>=r.length?r:r.slice(0,n-1).concat([r.slice(n-1).join(e)]);if(-n>=r.length)return[];r.splice(r.length+n);return r}jQuery(document).ready(function(){makeSortable();jQuery(".add-page").live("click",function(){element=jQuery(".page").clone();element.find(".product_categories").html("");jQuery(element).insertBefore(".add-page");caluclate_page_numbers();makeSortable()});jQuery(".delete-page").live("click",function(){boxes=jQuery(".page-creator .page").length;boxes>1&&jQuery(this).parents(".page:first").remove();jQuery(this).parents(".page:first").find(".product_category").prependTo("#product_categories");caluclate_page_numbers();makeSortable();savePositions()});jQuery(".page-creator #pages").hasClass("populate")&&jQuery.each(jQuery("#pages .product_categories"),function(){element=jQuery(this);ids=jQuery(this).attr("data-ids");ids=explode(",",ids);jQuery.each(ids,function(e,t){jQuery(".product_category[data-id="+t+"]").prependTo(element)})})});