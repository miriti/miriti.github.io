define(['./FloatText'], function(FloatText) {
    var Hit = function(value) {
        FloatText.call(this, value, {
            font: 'bold 30px monospace',
            fill: 0xff0000
        });
    };

    extend(Hit, FloatText);

    return Hit;
});
