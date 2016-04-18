define([], function() {
  var AudioEngine = function() {
    this.channels = [];
    this._muted = false;
  };
  
  Object.defineProperties(AudioEngine.prototype, {
    mute: {
      get: function() {
        return this._muted;
      },
      set: function(val) {
        if(val) {
          this.muteAll();
        }else{
          this.unmuteAll();
        }
        
        this._muted = val;
      }
    }
  });
  
  AudioEngine.prototype.play = function(resource, loop) {
    var audio = new Audio(game.resources[resource].url);
    
    if(this._muted) {
      audio.volume = 0;
    }
    
    if(loop) {
      audio.addEventListener('ended', (function() {
        this.play();
      }).bind(audio));
    }
    
    audio.play();
    
    this.channels.push(audio);
  };
  
  AudioEngine.prototype.muteAll = function() {
    if(!this._muted) {
      for(var i in this.channels) {
        this.channels[i].prevVolume = this.channels[i].volume;
        this.channels[i].volume = 0;
      }
    }
  };
  
  AudioEngine.prototype.unmuteAll = function() {
    if(this._muted) {
      for(var i in this.channels) {
        this.channels[i].volume = this.channels[i].prevVolume || 1;
      }
    }
  };
  
  return new AudioEngine();
})
