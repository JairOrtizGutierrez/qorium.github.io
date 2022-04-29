$(function(){
    
    $('#menu-toggle').click(function(){
        
        var checked = $('#menu-toggle').prop('checked');
        
        if (checked) {
            
            TweenLite.to('.fondo_blanco', 2, {ease: Power3.easeOut, opacity:1, display:'block'});
            TweenLite.to('.listado_links', 1.20, {ease: Power3.easeOut, opacity:1, y:0, delay: 0.50});
            TweenMax.staggerTo('.listado_links li', 0.40, {opacity:1, delay: 0.50, display:'block'}, 0.10);
            
        } else {
            
            TweenLite.to('.fondo_blanco', 2, {ease: Power3.easeOut, opacity:0, display:'none', delay: 0.15});
            TweenLite.to('.listado_links', 1, {opacity:0, y:20});
            TweenMax.staggerTo('.listado_links li', 0.40, {opacity:0, display:'block'}, 0.10);
            
        }
        
    });
    
});