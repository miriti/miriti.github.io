define([
    '../ui/HealthBar',
    '../ui/Hit'
  ],
  function(HealthBar,
           Hit) {
    var Health = function() {
      this._showHealthBar = true;
    };

    Health._properties = {
      health: {
        set: function(value) {
          this._health = Math.min(value, this.maxHealth);

          if (this._healthBar) {
            this._healthBar.value = this._health;
          }
        },
        get: function() {
          return this._health || 0;
        }
      },
      maxHealth: {
        set: function(value) {
          this._maxHealth = value;

          if (this._healthBar) {
            this.removeChild(this._healthBar);
          }

          this._healthBar = new HealthBar(this.width * 1.2, 20, this._maxHealth);
          this._healthBar.visible = this._showHealthBar;
          this._healthBar.y = -this.height / 2 - 20;
          this.addChild(this._healthBar);
        },
        get: function() {
          return this._maxHealth || 0;
        }
      },
      showHealthBar: {
        set: function(value) {
          this._showHealthBar = value;

          if (this._healthBar) {
            this._healthBar.visible = this._showHealthBar;
          }
        },
        get: function() {
          return this._showHealthBar;
        }
      }
    };

    Health.prototype.death = function() {
      this.health = 0;
      this.emit('death');

    };

    Health.prototype.hit = function(hitPoints) {
      if (this.health > 0) {
        this.health = Math.max(0, this.health - hitPoints);
        
        if(this._healthBar) {
          this._healthBar.alpha = 1;
        }
        
        var hit = new Hit("-" + hitPoints);
        hit.x = this.x + (-30 + Math.random() * 60);
        hit.y = this.y + (-30 + Math.random() * 60);
        
        this.parent.addChild(hit);

        if (this.health == 0) {
          this.death();
        }
      }
    };
    
    Health.prototype.update = function(delta) {
      if(this._healthBar) {
        if(this._healthBar.alpha > 0) {
          this._healthBar.alpha = Math.max(0, this._healthBar.alpha - 0.5 * delta);
        }
      }
    };

    return Health;
  });
