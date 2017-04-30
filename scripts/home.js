$(document).ready(function(){
	$("body").scrollTop(1);
	$("body").scrollTop(0);
	$(".box").each(function(){
		unfadeItemsInBox($(this));
	})
	$(document).scroll(function() {
	    $(".box").each(function() {
	        if (isScrolledIntoView(this)) {
	           if(!$(this).hasClass("active-box")){
	        	   var box = $(this);
	        	   $(this).addClass("active-box")
	        	   var position = $(this).offset().top - $("#header-div").outerHeight();
	        	   console.log($(this).attr("id") + " is visible")
	        	   $("body").animate({ scrollTop: position }, "slow", function(){
	        		   fadeInItemsInBox(box);
	        	   });
	        	   
	           }
	        }else{
	        	if($(this).hasClass("active-box")){
	        		$(this).removeClass("active-box")
	        		console.log($(this).attr("id") + " is invisible")
	        		unfadeItemsInBox($(this))
	        	}
	        	
	        }
	    });
	});
})



function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop() + $("#header-div").outerHeight();
    var docViewBottom =  docViewTop + $(window).height() - $("#header-div").outerHeight();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
//    console.log($(elem).attr("id") + " stats: " + "docViewTop:"+docViewTop+"|docViewBottom:"+docViewBottom+"|elemTop:"+elemTop+"|elemBottom:"+elemBottom)
    return ((elemTop < docViewBottom - 1) && (elemBottom > docViewTop + 1));
}
function fadeInItemsInBox(box){
	$(box).find(".fade-in").each(function(){
		var fadeDirection = $(this).attr("data-fade-direction");
		if(fadeDirection == "left"){
			$(this).animate({left:0, opacity:"show"}, 500, 'swing');
		}else if(fadeDirection == "right"){
			$(this).animate({right:0, opacity:"show"}, 500, 'swing');
		}
	})
	
}
function unfadeItemsInBox(box){
	$(box).find(".fade-in").each(function(){
		var fadeDirection = $(this).attr("data-fade-direction");
		var fadeDistance = $(this).attr("data-fade-distance");
		if(fadeDirection == "left"){
			$(this).css("left",fadeDistance+"px");
			$(this).css("display","none");
		}else if(fadeDirection == "right"){
			$(this).css("right",fadeDistance+"px");
			$(this).css("display","none");
		}
	})
	
}
