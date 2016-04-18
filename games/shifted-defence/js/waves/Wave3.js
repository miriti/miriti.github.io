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
    var Wave3 = function() {
        Wave.call(this);

        this.add(Walker, 3);
        this.add(Dumper, 2);
        this.add(Swoosher, 5);

    }
    
    extend(Wave3, Wave);
    
    return Wave3;

});