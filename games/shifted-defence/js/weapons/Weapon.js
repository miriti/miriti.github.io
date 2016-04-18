define(["jig/Container", "jig/Vector"], function (Container, Vector) {
    var Weapon = function(projectileContainer) {
        Container.call(this);
        
        this.hitTypes = [];

        this.projectile = null;
        this.cooldownTimer = this.cooldown = 1;
        this.ROF = 1;
        this.spreadRate = 1;
        this.readyToShoot = false;
        this.projectileContainer = projectileContainer;

        this.projectiles = [];
        
        this.shooter = null;
        
        this.on('added', function() {
          this.shooter = this.parent;
        });
    }
    extend(Weapon, Container);

    Weapon.prototype.setRandomSpread = function(delta) {
        this.spreadRate = delta;

    }

    Weapon.prototype.setProjectile = function(type) {
        this.projectile = type;
    }

    Weapon.prototype.setCooldown = function(cooldown){
        this.cooldown = cooldown;
    }

    Weapon.prototype.setRateOfFire = function(rateOfFire){
        this.ROF = rateOfFire;
    }

    Weapon.prototype.shoot = function(dest) {
        this.readyToShoot = false;
        this.cooldownTimer = this.cooldown;

        if(this.ROF >= 1) {

            for(var i = 0; i < this.ROF; i ++ ) {
                var dest = new Vector(dest.x, dest.y);

                if(this.spreadRate > 1) {
                    dest.x = dest.x * Math.random() * this.spreadRate + 1;
                    dest.y = dest.y * Math.random() * this.spreadRate + 1;
                }

                this.createProjectile(dest);

            }

        }
    }

    Weapon.prototype.createProjectile = function(dest) {
        var position = new Vector(this.parent.x, this.parent.y);
        var Projectile = new this.projectile(this);

        Projectile.shoot(dest);

        this.projectiles.push(Projectile);

    }

    Weapon.prototype.destroyProjectile = function(projectile) {
        var index = this.projectiles.indexOf(projectile);

        container = this.projectileContainer;
        container.removeChild(projectile);

        this.projectiles.slice(index, 1);

    }

    Weapon.prototype.update = function(delta) {
        if(this.cooldownTimer <= 0 && !this.readyToShoot) {
            this.readyToShoot = true;
        } else {
            this.cooldownTimer -= delta;
        }
    }

    return Weapon;

})
