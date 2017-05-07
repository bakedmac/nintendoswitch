$(document).ready(function(){
	
})

$(window).on("load", function() {
   $("#loading-screen").fadeOut('slow', function(){
	   $("#body-div").scrollTop(1);
		$("#body-div").scrollTop(0);
		$(".box").each(function(){
			unfadeItemsInBox($(this));
		})
		bindWindowScroll();
   });
});


function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop() + $("#header-div").outerHeight();
    var docViewBottom =  docViewTop + $(window).height() - $("#header-div").outerHeight();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemTop < docViewBottom - 1 ) && (elemBottom > docViewTop + 1));
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
function bindWindowScroll(){
	enableScroll();
	$("#body-div").scroll(function() {
	    $(".box").not(".active-box").each(function() {
	        if (isScrolledIntoView(this)) {
	        	   var box = $(this);
	        	   var previousBox = $(".active-box");
	        	   $(".active-box").removeClass("active-box");
	        	   $(this).addClass("active-box")
	        	   var position = $(this).offset().top - $("#contents-div").offset().top;
	        	   console.log($(this).attr("id") + " is visible")
	        	   unbindWindowScroll();
	        	   $("#body-div").animate({ scrollTop: position }, "slow", function(){
	        		   fadeInItemsInBox(box);
	        		   unfadeItemsInBox(previousBox);
	        		   bindWindowScroll();
	        	   });
	        	   
	        }
	    });
	});
}
function unbindWindowScroll(){
	$("#body-div").unbind('scroll');
	disableScroll();
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
