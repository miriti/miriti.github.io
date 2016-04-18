define([
    "jig/Container",
    "./Wave",
    "../Enemies/Walker",
    "../Enemies/Dumper",
    "../Enemies/Swoosher"
], function (
    Container,
    Wave,
    Walker,
    Dumper,
    Swoosher
) {
    var Wave1 = function() {
        Wave.call(this);

        this.add(Walker, 1);
        this.add(Dumper, 1);
        this.add(Swoosher, 1);

    }
    
    extend(Wave1, Wave);
    
    return Wave1;

});