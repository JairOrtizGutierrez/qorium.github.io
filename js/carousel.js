$(function() {
    
    /*Inicio del evento slider*/
    
    function Slider() {
        
        this.derecho = $('.controles .derecha');
        this.izquierdo = $('.controles .izquierda');
        this.ventana = $(window);
        
        this.imagen_1 = document.querySelector('.imagen_1');
        this.imagen_2 = document.querySelector('.imagen_2');
        this.imagen_3 = document.querySelector('.imagen_3');
        
        this.contador = 1;
        this.propagation = true;
        
        this.derecho.on('click', $.proxy(this.onRight, this));
        this.izquierdo.on('click', $.proxy(this.onLeft, this));
        
        this.intervalo = null;
        
        this.ventana.on('load', $.proxy(this.onLoad, this));
        this.ventana.on('blur', $.proxy(this.onBlur, this));
        this.ventana.on('focus', $.proxy(this.onFocus, this));
        
    }
    
    Slider.prototype.onRight = function() {
        
        /*clearInterval(this.intervalo);*/
        
        if (this.contador == 1 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_1, 0.8, {left: "-100%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_2, 0.8, {left: "0%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_3.style.left = "100%";
                this.contador = 2;
                this.propagation = true;
                
            }, 800);
            
        } else if (this.contador == 2 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_2, 0.8, {left: "-100%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_3, 0.8, {left: "0%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_1.style.left = "100%";
                this.contador = 3;
                this.propagation = true;
                
            }, 800);
            
        } else if (this.contador == 3 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_1, 0.8, {left: "0%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_3, 0.8, {left: "-100%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_2.style.left = "100%";
                this.contador = 1;
                this.propagation = true;
                
            }, 800);
            
        }
        
        /*this.intervalo = setInterval($.proxy(this.onRight, this), 5000);*/
        
    };
    
    Slider.prototype.onLeft = function() {
        
        /*clearInterval(this.intervalo);*/
        
        if (this.contador == 1 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_1, 0.8, {left: "100%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_3, 0.8, {left: "0%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_2.style.left = "-100%";
                this.contador = 3;
                this.propagation = true;
                
            }, 800);
            
        } else if (this.contador == 3 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_2, 0.8, {left: "0%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_3, 0.8, {left: "100%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_1.style.left = "-100%";
                this.contador = 2
                ;
                this.propagation = true;
                
            }, 800);
            
        } else if (this.contador == 2 && this.propagation) {
            
            this.propagation = false;
            
            TweenLite.to(this.imagen_1, 0.8, {left: "0%", ease: Power1.easeInOut});
            TweenLite.to(this.imagen_2, 0.8, {left: "100%", ease: Power1.easeInOut});
            
            setTimeout(() => {
                
                this.imagen_3.style.left = "-100%";
                this.contador = 1;
                this.propagation = true;
                
            }, 800);
            
        }
        
        /*this.intervalo = setInterval($.proxy(this.onRight, this), 5000);*/
        
    };
    
    var slider = new Slider();
    
    /*Fin del evento slider*/
    
    var preloader = document.querySelector(".preloader");
    
    /*Inicio del intervalo en el slider*/
    /*Observacion de algun cambio en el logo preloader*/
    
    var observer = new MutationObserver(callback);
    var observerOptions = {
        attributes: true
    }
    
    observer.observe(preloader, observerOptions);
    
    function callback(mutationList) {
        
        mutationList.forEach((mutation) => {
            
            if (mutation.target.style.opacity != 1) {
                
                /*setTimeout($.proxy(slider.onRight, slider), 5000);*/
                observer.disconnect();
                
            }
            
        });
        
    }
    
    /*Fin de la observacion de algun cambio en el preloader*/
    /*Fin del intervalo en el slider*/
    
});
