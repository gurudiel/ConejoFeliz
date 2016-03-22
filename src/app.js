var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    lblPuntaje: null,
    puntaje: 0,
    bomba: [],
    zanahoria : [],
    
    random: function randomizar(min, max) {
    	
        return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    moverConejo: function(location, event){
		
        var  juego = event.getCurrentTarget();
		
        var ubicacion = location.getLocation();
        
        if(ubicacion.x > 673){
            
            ubicacion.x = 672;
        }
        else if(ubicacion.x < 277){
            
            ubicacion.x = 278;
        }
        
		juego.sprConejo.setPosition(ubicacion.x, 95);
	},
    
    crearBomba: function(){
        
		var bomba = new cc.Sprite(res.bomba_png);
        
        var ubiX = this.random(274,689);
        
        var mover = cc.moveTo(this.random(2,5), ubiX, 63);
        
        var rtcBomba = bomba.getBoundingBox();
        
        bomba.setPosition(ubiX, 795);
        
        this.addChild(bomba, 1);
        
		        
		bomba.runAction(mover);
        
		this.bomba.push(bomba);
        
        
	},
    
    crearZanahoria: function(){
        
		var carrot = new cc.Sprite(res.carrot_png);
        
        var ubiX = this.random(274,695);
        
        var mover = cc.moveTo(this.random(2,5), ubiX, 72);
		
        carrot.setPosition(ubiX, 795);
        
        this.addChild(carrot, 1);
		
        carrot.runAction(mover);
		
        this.zanahoria.push(carrot);		
	},
    
    matar: function(){
		
        for(var bomba of this.bomba){
            
            var rtcBomba = bomba.getBoundingBox();
            
            var rtcConejo = this.sprConejo.getBoundingBox();
            
            if(cc.rectIntersectsRect(rtcBomba, rtcConejo)){
                
                bomba.setVisible(false);
                
                bomba.setPosition(0,0);
               
                this.gameOver();
            }
            
            if(bomba.getPositionY() < 65){
               
                bomba.setVisible(false);
                
                bomba.setPosition(0,0);
            }
            
		}
		return true;	
	},
    
    puntos: function(){
        
		for(var carrot of this.zanahoria){
            
            var rtcConejo = this.sprConejo.getBoundingBox();
           
            var rtcZanahoria = carrot.getBoundingBox();
            
            
            if(cc.rectIntersectsRect(rtcZanahoria, rtcConejo)){
               
                carrot.setVisible(false);
               
                carrot.setPosition(0,0);
                
                this.puntaje += 1;
                
                this.lblPuntaje.setString("Puntaje: " +this.puntaje);
            }
            
            if(carrot.getPositionY() < 75){
               
                carrot.setVisible(false);
               
                carrot.setPosition(0,0);
            }
		}
		return true;	
	},
    
    gameOver: function(){
        
        alert("¡Usted perdió!");
       
        this.puntaje = 0;
        
        this.lblPuntaje.setString("Puntaje: " + this.puntaje);
        
        var size = cc.winSize;
        
        this.sprConejo.setPosition(size.width / 2, size.height * 0.15);
        
        for(var bomba of this.bomba){
           
            bomba.setVisible(false);
           
            bomba.setPosition(0,0);
        }
        
        for(var carrot of this.zanahoria){
           
            carrot.setVisible(false);
            
            carrot.setPosition(0,0);
        }
        
        return true;
    },
    
    initiate: function(){
        return true;
    },
    
    ctor:function () {
        
        this._super();
        
        var size = cc.winSize;

        
        this.sprFondo = new cc.Sprite(res.fondo_png);
        
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        
        this.addChild(this.sprFondo, 0);
        
        
        this.sprConejo = new cc.Sprite(res.conejo_png);
        
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        
        this.addChild(this.sprConejo, 1);
                
        this.lblPuntaje = new cc.LabelTTF("Puntaje: " + this.puntaje, "Arial", 31);
        
        this.schedule(this.matar, 0, Infinity);
        
        this.schedule(this.puntos, 0, Infinity);
              
        this.schedule(this.crearBomba, 1);
        
        this.schedule(this.crearZanahoria, 2);
        
        this.lblPuntaje.setPosition(640, 620);
        
        this.lblPuntaje.setColor(255,255,255);
        
        this.addChild(this.lblPuntaje, 2);
               
        cc.eventManager.addListener({
			
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            
            onTouchBegan: this.initiate,
			
            onTouchMoved: this.moverConejo
		}, this);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    
    onEnter:function () {
        
        this._super();
       
        var layer = new HelloWorldLayer();
        
        this.addChild(layer);
    }
});

