define(['pixi/pixi'], function (PIXI) {
    var GameObject = function () {
        PIXI.Container.call(this);
    };

    extend(GameObject, PIXI.Container);

    GameObject.prototype.update = function (delta) {
        for (var i in this.children) {
            if (typeof this.children[i]['update'] === 'function') {
                this.children[i].update(delta);
            }
        }
    };

    GameObject.prototype.resize = function(newScreenWidth, newScreenHeight) {
        for (var i in this.children) {
            if (typeof this.children[i]['resize'] === 'function') {
                this.children[i].resize(newScreenWidth, newScreenHeight);
            }
        }
    }

    return {
        GameObject: GameObject
    }
});
