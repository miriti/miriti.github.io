define([
  'pixi',
  'jig/Container',
  'jig/extras/JigLoadingScreen'
],
function(PIXI,
        Container,
        JigLoadingScreen) {

  var Game = function() {
    this._stateStack = [];
    this._savedStates = {};

    window.onresize = this.resize.bind(this);
    window.onkeydown = this.keyDown.bind(this);
    window.onkeyup = this.keyUp.bind(this);
    window.onkeypress = this.keyPress.bind(this);
    
    this.loader = PIXI.loader;
    
    this._data = {};
  };

  /**
   * Initialize the game
   */
  Game.prototype.init = function() {
    /** width of the game container */
    this.width = this.width || 800;
    
    /** height of the game container */
    this.height = this.height || 600;
    
    /** width of the game space */
    this.virtualWidth = this.virtualWidth || this.width;
    
    /** height of the game space */
    this.virtualHeight = this.virtualHeight || this.height;
    
    /** type of renderer (auto, canvas, or webgl) */
    this.render = this.render || 'auto';

    /** DOM container of the canvas */
    this.container = this.container || document.body;
    
    switch (this.render) {
      case 'canvas':
        this.renderer = new PIXI.CanvasRenderer(this.width, this.height);
        break;
      case 'webgl':
        this.renderer = new PIXI.WebGLRenderer(this.width, this.height);
        break;
      case 'auto':
      default:
        this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);
    }
    
    /** stretch the canvas to the full size of the page */
    this.responsive = this.responsive === undefined ? false : this.responsive;
    
    this.centered = this.centered === undefined ? true : this.centered;
    this.prevTime = new Date().getTime();
    this.currentState = null;
    
    this.loadingScreen = this.loadingScreen || new JigLoadingScreen();
    this.resources = null;
    
    this.gameContainer = new Container();
  }
  
  Game.prototype._genMask = function(w, h) {
    var g = new PIXI.Graphics();
    g.beginFill(0x0);
    g.drawRect((this.width - w)/2, (this.height-h)/2, w, h);
    g.endFill();
    
    return g;
  };

  /**
   * Configure the game
   */
  Game.prototype.config = function(config) {
    for(var p in config) {
      this[p] = config[p];
    }

    return this;
  };
  
  /**
   * Set data that should be loaded before game run
   */
  Game.prototype.data = function(data) {
    this._data = data;
    
    for(var f in data) {
      this.loader.add(f, data[f]);
    }
    
    return this;
  };
  
  /**
   * Key down
   */
  Game.prototype.keyDown = function(event) {
    if(this.currentState && this.currentState['keyDown']) {
      this.currentState.keyDown(event.keyCode);
    }
    
    if(event.keyCode == 9) {
      console.log('prevenDefault');
      event.prevenDefault();
    }
  };
  
  /**
   * Key press
   */
  Game.prototype.keyPress = function(event) {
    if(this.currentState && this.currentState['keyPress']) {
      this.currentState.keyPress(event.keyCode);
    }
  }
  
  /**
   * Key up
   */
  Game.prototype.keyUp = function(event) {
    if(this.currentState && this.currentState['keyUp']) {
      this.currentState.keyUp(event.keyCode);
    }
  };
  
  /**
   * Set current state
   */
  Game.prototype.setState = function(state, name) {
    if(this._savedStates[state]) {
      state = this._savedStates[state];
    }
    
    if(this.currentState) {
      this._stateStack.push(this.currentState);
      this.gameContainer.removeChild(this.currentState);
    }
    
    this.currentState = state;
    this.gameContainer.addChild(this.currentState);
    this.resize();
    
    if(name) {
      this._savedStates[name] = state;
    }
    
    return this;
  };
  
  /**
   * Set state from stack
   */
  Game.prototype.popState = function() {
    var state = this._stateStack.pop();

    if (state) {
      this.setState(state);
    }

    return this;
  };

  /**
   * Push state to stack
   */
  Game.prototype.pushState = function(state) {
    this._stateStack.push(state);
    this.setState(state);

    return this;
  };

  /**
   * Resize happened
   */
  Game.prototype.resize = function() {
    var scale = 1;
    
    if (this.responsive) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if(this.virtualWidth && this.virtualHeight) {
        scale = Math.min(this.height / this.virtualHeight, this.width / this.virtualWidth);
        
        this.gameContainer.scale.set(scale);
        
        if(this.loadingScreen) {
          this.loadingScreen.scale.set(scale);
        }
      }

      this.renderer.resize(this.width, this.height);
    }

    if (this.centered) {
      this.gameContainer.position.set(this.width / 2, this.height / 2);
        
      if(this.loadingScreen) {
        this.loadingScreen.position.set(this.width / 2, this.height / 2);
      }
    }
    
    this.gameContainer.mask = this._genMask(this.virtualWidth*scale, this.virtualHeight*scale);
    
    if(this.loadingScreen) {
      this.loadingScreen.mask = this._genMask(this.virtualWidth*scale, this.virtualHeight*scale);
    }
  };
  
  /**
   * Start the game
   */
  Game.prototype.run = function(callback) {
    this.init();
    
    this.container.appendChild(this.renderer.view);
    
    var go = (function() {
      if(callback)
        callback.call(this);
      requestAnimationFrame(this.loop.bind(this));
    }).bind(this);
    
    if(Object.keys(this._data).length) {
      this.loader.on('progress', (function(loader, resource) {
        if(this.loadingScreen) {
          this.resize();
          this.loadingScreen.progress(loader);
          this.renderer.render(this.loadingScreen);
        }
      }).bind(this));
      
      this.loader.on('complete', (function(loader, resources) {
          this.resources = resources;
          this.resize();
          go();
          
        }).bind(this));
      
      this.loader.load();
    } else {
      go();
    }
    
    return this;
  };

  /**
   * Loop
   */
  Game.prototype.loop = function() {
    var currentTime = new Date().getTime();
    var delta = Math.min(((currentTime - this.prevTime) / 1000), (1 / 30));
    
    this.prevTime = currentTime;

    if(this.currentState) {
      this.gameContainer.update(delta);
      this.renderer.render(this.gameContainer);
    }

    requestAnimationFrame(this.loop.bind(this));
  };

  return Game;
});
