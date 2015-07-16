define([
    'game/map/tiles/tile',
    'game/map/tiles/grass',
    'game/map/tiles/wire',
    'game/map/tiles/switch',
    'game/map/tiles/windgen',
    'game/map/tiles/house'
], function (Tile,
             Grass,
             Wire,
             Switch,
             Windgen,
             House) {
    return {
        Tile: Tile,
        Grass: Grass,
        Wire: Wire,
        Switch: Switch,
        Windgen: Windgen,
        House: House
    }
});
