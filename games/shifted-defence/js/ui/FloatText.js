define([
    'jig/Container',
    'jig/Text',
    'jig/components/Animated',
    'jig/animation/MoveTo',
    'jig/animation/Alpha'
], function(Container,
    Text,
    Animated,
    MoveTo,
    Alpha) {
    var FloatText = function(value, font) {
        Container.call(this);

        this.addComponent(Animated);

        var text = new Text(value, font);
        
        this.addChild(text);

        this.on('added', function() {
            this.addAnimation([new Alpha(1, 0, 1), new MoveTo(this.x, this.y - 200, 1)], function() {
                this.parent.removeChild(this);
            });
        });
    };
    
    extend(FloatText, Container);

    return FloatText;
});
