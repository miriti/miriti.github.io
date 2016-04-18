define([
    'jig/Container',
    'jig/shapes/Quad',
    'jig/Text',
    'jig/Button',
    'jig/components/Animated',
    'jig/animation/Move',
    'jig/animation/Alpha', "jig/animation/Rotate", "jig/animation/Scale",
    "jig/Audio"
], function (
    Container,
    Quad,
    Text,
    Button,
    Animated,
    Move,
    Alpha, Rotate, Scale,
    Audio) {
    var Explosion = function (entitiy, size, duration) {
        Container.call(this);

        this.addComponent(Animated);

        this.alpha = 0;

        this.container = entitiy;
        this.size = size;
        this.duration = duration;

        this.animAlpha(0, 1, 1);

        for(var i = 0; i <= 5; i++) {
            this.build({
                item: {
                    is: new Quad('0x'+Math.floor(Math.random()*16777215).toString(16), size, size)
                }
            });

            var toX = entitiy.x + Math.random() * (size * 2) - size;
            var toY = entitiy.y + Math.random() * (size * 2) - size;

            this.item.addComponent(Animated).addAnimation([
                new Scale(0, Math.random() * 1, duration),
                new Alpha(0, Math.random() * 1, duration),
                new Move([entitiy.x, entitiy.y], [toX, toY], duration),
                new Rotate(0, Math.random() * 5 + 1, duration)], function() {

                this.parent.removeChild(this);

            });
        }

        this.on('added', function() {
          Audio.play('snd_explosion');
        });
    };

    extend(Explosion, Container);

    return Explosion;

});
