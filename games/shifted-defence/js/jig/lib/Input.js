define([
  'pixi',
  'jig/Container',
  'jig/Text',
  'jig/components/Schedule'
], function(PIXI,
            Container,
            Text,
            Schedule) {
  var Input = function(text, font, width) {
    Container.call(this);
    
    this.addComponent(Schedule);
    
    text = text || "";
    font = font || {font: '24px Courier new', fill: 0x000000, align: 'center'};
    
    this.text = new Text("", font);
    this.text.anchor.set(0, 0.5);
    
    this.hiddenInput = document.createElement('input');
    this.hiddenInput.type = 'text';
    this.hiddenInput.style.opacity = '0';
    this.hiddenInput.position = 'absolute';
    this.hiddenInput.left = -10000;
    this.hiddenInput.oninput = (function() {
      this.value = this.hiddenInput.value;
    }).bind(this);
    
    this.value = text;
    
    width = width || this.text.width;
    
    var padding = 10;
    
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0xffffff);
    this.bg.drawRect(-padding, -this.text.height/2 - padding, width + padding*2, this.text.height + padding*2);
    this.bg.endFill();
    
    this.addChild(this.bg);
    this.addChild(this.text);
    
    this.interactive = true;
    
    this.once('added', this.added);
  };
  
  extend(Input, Container);
  
  Object.defineProperties(Input.prototype, {
    value: {
      get: function() {
        return this._value;
      },
      set: function(text) {
        this._value = text;
        this.text.text = text;
        this.hiddenInput.value = text;
      }
    },
    focus: {
      get: function() {
        return this._focus;
      },
      set: function(value) {
        
        if(value && !this._focus) {
          this._blink_task = this.every(0.3, this.blink);
          this.hiddenInput.focus();
        }
        
        if(!value) {
          if(this._blink_task) {
            this.killTask(this._blink_task);
            this.text.text = this.value;
          }
        }
        
        this._focus = value;
      }
    }
  });

  Input.prototype.added = function() {
    document.body.appendChild(this.hiddenInput);
    
    window['__jig_inputs'] = window['__jig_inputs'] || [];
    window['__jig_inputs'].push(this);
  };
  
  Input.prototype.removed = function() {
    document.body.removeChild(this.hiddenInput);
    var index = window['__jig_inputs'].indexOf(this);
    
    if(index!=-1) {
      window['__jig_inputs'].splice(index, 1);
    }
  };
  
  Input.prototype.blink = function() {
    this._blink = !this._blink;
    
    this.text.text = this.value + (this._blink ? '|' : '');
  }
  
  Input.prototype.mousedown = function() {
    this.focus = true;
    
    for(var i in window['__jig_inputs']) {
      if(window['__jig_inputs'][i] !== this) {
        window['__jig_inputs'][i].focus = false;
      }
    }
  };
  
  Input.prototype.mouseover = function() {
    game.renderer.view.style.cursor = 'text';
  };
  
  Input.prototype.mouseout = function() {
    console.log('mouse out');
    game.renderer.view.style.cursor = 'inherit';
  }
  
  return Input;
});
