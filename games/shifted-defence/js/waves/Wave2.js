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
    var Wave2 = function() {
        Wave.call(this);

        this.add(Walker, 2);
        this.add(Dumper, 1);
        this.add(Swoosher, 3);
    }
    
    extend(Wave2, Wave);
    
    return Wave2;

});
