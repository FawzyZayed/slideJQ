$(document).ready(function(){
    
    
    function slideNext(){
        var currentActive = $(".carouselInner .active");
        var nextActive = currentActive.next();
        
        if(nextActive.length == 0){
            nextActive = $(".carouselInner .item").first();
        }
        currentActive.removeClass("active");
        nextActive.addClass("active");
    }
    
    $(".carouselOuter .next").on("click", function(e){
        
        slideNext();
        e.preventDefault();
    });
    
    
    $(".carouselOuter .prev").on("click", function(e){
        var currentActive = $(".carouselInner .active");
        var prevActive = currentActive.prev();
        
        if(prevActive.length == 0){
            prevActive = $(".carouselInner .item").last();
        }
        currentActive.removeClass("active");
        prevActive.addClass("active");
        
        e.preventDefault();
    });
    
    setInterval(slideNext,5000)
    
}); 