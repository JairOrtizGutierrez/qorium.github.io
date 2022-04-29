$(function() {
    
    var html = document.documentElement,
    body = document.body,
    viewport = document.querySelector(".viewport"),
    container = document.querySelector(".scroll-container"),
    preloader = document.querySelector(".preloader"),
    ancho_1 = window.innerWidth,
    requestId = null;
    
    var scroller = {
        target: document.querySelector(".scroll-container"),
        ease: 0.05, // <= scroll speed
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0,
        animation: true
    };
    
    if (ancho_1 > 575) {
        
        updateScroller();
        window.focus();
        
    } else {
        
        /*Observacion de algun cambio en el preloader*/
        /*Declaracion del tamaño en el body*/
        
        var observer = new MutationObserver(callback);
        var observerOptions = {
            attributes: true
        }
        
        function callback(mutationList) {
            
            mutationList.forEach((mutation) => {
                
                if (mutation.target.style.opacity != 1) {
                    
                    body.style.height = "auto";
                    viewport.style.position = "static";
                    container.style.transform = "none";
                    
                    observer.disconnect();
                    
                }
                
            });
        }
        
        observer.observe(preloader, observerOptions);
        
        /*Fin de la declaracion del tamaño en el body*/
        /*Fin de la observacion de algun cambio en el preloader*/
        
        scroller.animation = false;
        
    }
    
    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    
    function updateScroller() {
        
        var resized = scroller.resizeRequest > 0;
        
        if (scroller.animation) {
            
            /*Observacion de algun cambio en el preloader*/
            /*Declaracion del tamaño en el body*/
            
            var observer = new MutationObserver(callback);
            var observerOptions = {
                attributes: true
            }
            
            function callback(mutationList) {
                
                mutationList.forEach((mutation) => {
                    
                    if (mutation.target.style.opacity != 1) {
                        
                        if (resized) {
                            
                            var height = scroller.target.clientHeight;
                            viewport.style.position = "fixed";
                            body.style.height = height + "px";
                            scroller.resizeRequest = 0;
                            
                            observer.disconnect();
                            
                        }
                        
                    }
                    
                });
                
            }
            
            observer.observe(preloader, observerOptions);
            
            /*Fin de la declaracion del tamaño en el body*/
            /*Fin de la observacion de algun cambio en el preloader*/
            
            scroller.animation = false;
            
        } else {
            
            if (resized) {
                
                /*Declaracion del tamaño en el body cuando ocurra un reajuste de tamaño*/
                
                var height = scroller.target.clientHeight;
                viewport.style.position = "fixed";
                body.style.height = height + "px";
                scroller.resizeRequest = 0;
                
                /*Fin de la declaracion del tamaño en el body cuando ocurra un reajuste de tamaño*/
                
            }
            
        }
        
        var scrollY = window.pageYOffset;
        
        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;
        
        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
            
            scroller.y = scrollY;
            scroller.scrollRequest = 0;
            
     }
        
        TweenLite.set(scroller.target, {y: -scroller.y});
        
        requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
        
    }
    
    function onScroll() {
        
        var ancho_2 = window.innerWidth;
        
        if (ancho_2 > 575) {
            
            scroller.scrollRequest++;
            
            if (!requestId) {
                
                requestId = requestAnimationFrame(updateScroller);
                
            }  
            
        }
        
    }
    
    function onResize() {
        
        var ancho_3 = window.innerWidth;
        
        scroller.resizeRequest++;
        
        if (ancho_3 > 575) {
            
            if (preloader.style.opacity != 1 && preloader.style.opacity != "") {
                
                if (!requestId) {
                    
                    requestId = requestAnimationFrame(updateScroller);
                    
                }
                
            }
            
        } else {
            
            if (preloader.style.opacity != 1 && preloader.style.opacity != "") {
                
                cancelAnimationFrame(requestId);
                requestId = null;
                
                body.style.height = "auto";
                viewport.style.position = "static";
                container.style.transform = "none";
                
            }
            
        }
        
    }
    
});