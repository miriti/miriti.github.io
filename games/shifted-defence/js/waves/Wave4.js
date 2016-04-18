define([
    "jig/Container",
    "./Wave",
    "../enemies/Walker",
    "../enemies/Dumper",
    "../enemies/Swoosher"
], function (
    Container,
    Wave,
    Walker,
    Dumper,
    Swoosher
) {
    var Wave3 = function() {
        Wave.call(this);

        this.add(Walker, 4);
        this.add(Dumper, 4);
        this.add(Swoosher, 3);

    }
    
    extend(Wave3, Wave);
    
    return Wave3;

});
