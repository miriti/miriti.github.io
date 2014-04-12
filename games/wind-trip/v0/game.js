(function() {
    engine.init({
        canvas: 'main',
        resources: [
            'res/baloon.png',
            'res/clouds.jpg',
            'res/flow.png',
            'res/level1.json',
            'res/level2.json',
            'res/level3.json',
            'res/menu/logo.png',
            'res/menu/start_game.png',
            'res/saw.png',
            'res/star.png',
            'res/win.png'
        ],
        ready: function() {
            engine.debug = false;

            var levels = ['level1', 'level2', 'level3'];
            var level_index = -1;
            var currentGame = null;

            function restartLevel() {
                engine.tween(currentGame, 2000, {
                    alpha: 0
                }).finished(function() {
                    engine.removeChild(currentGame);
                    delete currentGame;
                    currentGame = new Game(levels[level_index]);
                    engine.addChild(currentGame);
                    currentGame.start();
                });
            }

            function nextLevel() {
                level_index++;

                if (level_index < levels.length) {
                    function rungame() {
                        currentGame = new Game(levels[level_index]);
                        engine.addChild(currentGame);
                        currentGame.start();
                    }

                    if (currentGame != null) {
                        engine.tween(currentGame, 1000, {
                            alpha: 0
                        }).finished(function() {
                            engine.removeChild(currentGame);
                            delete currentGame;
                            rungame();
                        });
                    } else {
                        rungame();
                    }
                } else {
                    var win = engine.sprite('win').setAlpha(0);
                    engine.addChild(win);
                    engine.tween(win, 1000, {
                        alpha: 1
                    });

                    engine.tween(currentGame, 1000, {
                        alpha: 0
                    }).finished(function() {
                        engine.removeChild(currentGame);
                        delete currentGame;
                    });
                }
            }

            function Game(level_name) {
                game = this;

                this.done = false;

                var back_0 = engine.sprite('clouds')
                    .setRepeat(3, 2)
                    .setCenter(0, 0)
                    .setPosition(-engine.screenWidth / 2, -engine.screenHeight / 2)
                    .update(function() {
                        var ox = -engine.screenWidth / 2;
                        var oy = -engine.screenHeight / 2;

                        if (this.y > oy) {
                            this.y = oy - (this.height - (this.y - oy));
                        }

                        if ((this.y + this.height * this.repeatY) < (oy + engine.screenHeight)) {
                            this.y = oy - ((oy + engine.screenHeight) - (this.y + this.height * this.repeatY));
                        }

                        if (this.x > ox) {
                            this.x = ox - (this.width - (this.x - ox));
                        }
                    });

                this.addChild(back_0);

                var world = engine.sprite();

                function Baloon() {
                    this.force = engine.vec2d(0, 0);
                    this.speed = engine.vec2d(0, 0);
                    this.swingPhase = 0;
                    this.swingAmp = 0;
                    this.life = 100;
                }
                Baloon.prototype = engine.sprite('baloon')
                    .init(function() {
                        this.cy = 25;
                    })
                    .update(function(deltaTime) {
                        if (game.done) return;
                        this.move(this.speed.dx, this.speed.dy);

                        this.rotation = Math.sin(this.swingPhase) * this.swingAmp;

                        if (this.force.length() > 0) {
                            this.speed.dx += this.force.dx;
                            this.speed.dy += this.force.dy;

                            if (this.speed.length() > 8) {
                                this.speed.normalize(8);
                            }
                        } else {
                            this.speed.mult_scalar(0.99);
                        }

                        if (this.life > 0) {
                            back_0.move(-this.speed.dx * 0.5, -this.speed.dy * 0.5);

                            world.x = -this.x;
                            world.y = -this.y;

                            if (engine.mouse.left) {
                                var flowPosition = engine.vec2d(engine.mouse.x, engine.mouse.y).normalize(500);
                                var mousePer = engine.vec2d(-flowPosition.dy, flowPosition.dx).normalize(200);

                                var flow = engine.sprite('flow')
                                    .setPosition((flowPosition.dx - mousePer.dx) + (Math.random() * (mousePer.dx * 2)), (flowPosition.dy - mousePer.dy) + (Math.random() * (mousePer.dy * 2)))
                                    .setRotation(Math.atan2(engine.mouse.y, engine.mouse.x))
                                    .update(function(deltaTime) {
                                        this.x -= Math.cos(this.rotation) * 10;
                                        this.y -= Math.sin(this.rotation) * 10;

                                        this.alpha -= 0.01;

                                        if (this.alpha <= 0) {
                                            this.parent.removeChild(this);
                                        }
                                    });

                                game.addChild(flow);
                                this.force.set(-engine.mouse.x, -engine.mouse.y).normalize(0.05);
                                this.swingPhase = (Math.PI / 2) * (this.speed.dx / 8);
                                this.swingAmp = (this.speed.dx / 8);
                            } else {
                                this.swingPhase += 0.05;
                                this.swingAmp *= 0.99;
                                this.force.set(0, 0);
                            }
                        } else {
                            if (this.collisionShape != null) {
                                this.collisionShape = null;
                                restartLevel();
                            }

                            this.force.dy += 0.01;
                        }
                    })
                    .collision(function(offsetx, offsety, contractor) {
                        if (offsety != 0) {
                            this.speed.dy = -this.speed.dy * 0.5;
                            this.y -= offsety;
                        }

                        if (offsetx != 0) {
                            this.speed.dx = -this.speed.dx * 0.5;
                            this.x -= offsetx;
                        }
                    });

                var baloonSprite = (new Baloon()).initCollisionCircle(25, true);

                world.addChild(baloonSprite);

                var mapJson = engine.resources.get(level_name);

                for (var i = 0; i < mapJson['objects'].length; i++) {
                    var mObject = mapJson['objects'][i];

                    switch (mObject['type']) {
                        case 'wall':
                            var r = engine.sprite()
                                .init(function() {
                                    var rect = engine.placeholders
                                        .rect(mObject.w, mObject.h)
                                        .stroke('#cc0')
                                        .fill('#cc0');
                                    this.addChild(rect);
                                });
                            r.initCollisionRect(mObject.w / 2, mObject.h / 2, false);
                            r.setPosition(mObject.x, mObject.y);
                            world.addChild(r);
                            break;

                        case 'finish':
                            var lenV = engine.vec2d(0, 0);
                            var triggered = false;
                            var finish = engine.sprite('star')
                                .update(function() {
                                    if (baloonSprite.life > 0) {
                                        lenV.set(baloonSprite.x - this.x, baloonSprite.y - this.y);
                                        if (lenV.length() <= 55) {
                                            if (!triggered) {
                                                triggered = true;
                                                game.done = true;
                                                nextLevel();
                                                baloonSprite.speed.set(0, 0);
                                            }
                                        }
                                    }
                                });
                            finish.setPosition(mObject.x, mObject.y);
                            world.addChild(finish);
                            break;

                        case 'saw':
                            var saw_distance = engine.vec2d(0, 0);
                            var triggered = false;
                            var saw = engine.sprite('saw')
                                .setPosition(mObject.x, mObject.y)
                                .update(function() {
                                    this.rotation += Math.PI / 5;
                                    if (!triggered) {
                                        saw_distance.set(baloonSprite.x - this.x, baloonSprite.y - this.y);

                                        if (saw_distance.length() < 75) {
                                            baloonSprite.life = 0;
                                            triggered = true;
                                        }
                                    }
                                });
                            world.addChild(saw);
                            break;
                    }
                };

                world.collisionsEnabled = true;

                this.addChild(world);

                this.alpha = 0;
            }

            Game.prototype = engine.sprite();

            Game.prototype.start = function() {
                engine.tween(this, 1000, {
                    alpha: 1
                });
            }

            function MainMenu() {
                var clouds = engine.sprite('clouds');
                clouds.alpha = 0.5;
                var cloudsPhaseX = 0;
                clouds.update(function() {
                    this.x = -300 + Math.sin(cloudsPhaseX) * 100;
                    cloudsPhaseX += Math.PI / 1200;
                });
                this.addChild(clouds.setRepeat(2, 1).setPosition(-300, 0));

                var logo = engine.sprite('logo');
                var logoY = -engine.screenHeight / 2 + logo.height / 2 + 20;
                logo.setPosition(0, logoY);

                var logoSwingPhaseX = Math.random() * Math.PI;
                var logoSwingPhaseY = Math.random() * Math.PI;

                logo.update(function() {
                    this.x = Math.sin(logoSwingPhaseX) * 30;
                    this.y = logoY + Math.sin(logoSwingPhaseY) * 20;
                    logoSwingPhaseX += Math.PI / 360;
                    logoSwingPhaseY += Math.PI / 420;
                });
                this.addChild(logo);

                var startGame = engine.sprite('start_game')
                    .mouseEnter(function() {});
                this.addChild(startGame);

                var triggered = false;

                (function(mainMenu) {
                    engine.mouse.down(function() {
                        if (!triggered) {
                            triggered = true;
                            engine.tween(mainMenu, 1000, {
                                alpha: 0
                            }).finished(function() {
                                nextLevel();

                                engine.removeChild(mainMenu);
                                engine.mouse.down(null);
                            });
                        }
                    });
                })(this);
            }

            MainMenu.prototype = engine.sprite();

            engine.addChild(new MainMenu());
        }
    });
})();