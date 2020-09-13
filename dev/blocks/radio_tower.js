IDRegistry.genBlockID("iMod_radio_tower");
Block.createBlock("iMod_radio_tower", [
	{
		name: "Radio Tower",
		texture: [
            ['iMod_radio_tower', 0]
        ],
		inCreative: true
	}
]);
mod_tip(BlockID["iMod_radio_tower"]);

(function(){
    var render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(0,0,0,1,1,1, BlockID.iMod_radio_tower, 0));
    //Block.setShape(BlockID.iMod_radio, _radioBox[0], _radioBox[1], _radioBox[2], _radioBox[3], _radioBox[4], _radioBox[5], izxc);
	BlockRenderer.enableCoordMapping(BlockID.iMod_radio_tower, 0, render);
})();

var structures = [];

Saver.addSavesScope("iModRadioTower",
	function read(scope){
		structures = scope && scope.structures ? scope.structures : [];
	},

	function save(){
		return {structures: structures};
	}
);

function getStructure(coords){
    for(var i in structures){
        for(var k in structures[i]){
            var _coords = structures[i][k];
            if(_coords.x == coords.x && _coords.y == coords.y && _coords.z == coords.z) return i;
        }
    }
}

Block.registerPlaceFunction('iMod_radio_tower', function(coords, item, block){
	coords = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
	var relBlock = World.getBlock(coords.x, coords.y, coords.z);
	if (relBlock.id != 0 && relBlock.id != 9 && relBlock.id != 11) return;
    World.setBlock(coords.x, coords.y, coords.z, BlockID.iMod_radio_tower, 0);
	Player.decreaseCarriedItem(1);
    var centreBlock = coords;
    var structure = true;
    if(World.getBlock(coords.x, coords.y + 1, coords.z).id != BlockID.iMod_radio_tower){
        if(World.getBlock(coords.x, coords.y - 2, coords.z).id == BlockID.iMod_radio_tower){
            if(getStructure({x: coords.x, y: coords.y - 2, z: coords.z}) >= 0) return;
            centreBlock = {x: coords.x, y: coords.y - 1, z: coords.z};
        } else {
            structure = false;
        }
    } else {
        if(getStructure({x: coords.x, y: coords.y + 1, z: coords.z}) >= 0) return;
    }
    if(World.getBlock(coords.x, coords.y - 1, coords.z).id != BlockID.iMod_radio_tower){
        if(World.getBlock(coords.x, coords.y + 2, coords.z).id == BlockID.iMod_radio_tower){
            if(getStructure({x: coords.x, y: coords.y + 2, z: coords.z}) >= 0) return;
            centreBlock = {x: coords.x, y: coords.y + 1, z: coords.z};
        } else {
            structure = false;
        }
    } else {
        if(getStructure({x: coords.x, y: coords.y - 1, z: coords.z}) >= 0) return;
    }
    if(structure){
        structures.push([{x: centreBlock.x, y: centreBlock.y - 1, z: centreBlock.z}, {x: centreBlock.x, y: centreBlock.y, z: centreBlock.z}, {x: centreBlock.x, y: centreBlock.y + 1, z: centreBlock.z}]);
        
        var render = new ICRender.Model();
        var model = BlockRenderer.createModel();
        model.addBox(0.3,0,0.3,0.7,0.6,0.7, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0]]);
        model.addBox(0.4,0.6,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0]]/* 'iMod_radio_tower_centre' */);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y - 1, centreBlock.z, render);

        render = new ICRender.Model();
        model = BlockRenderer.createModel();
        model.addBox(0.4,0,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0]]/* 'iMod_radio_tower_centre' */);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y, centreBlock.z, render);

        render = new ICRender.Model();
        model = BlockRenderer.createModel();
        model.addBox(0.4,0,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0]]);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y + 1, centreBlock.z, render);
    }
});

Block.registerDropFunction('iMod_radio_tower', function(coords){
    if((structureId = getStructure(coords)) >= 0) {
        var centreBlock = structures[structureId][1];
        BlockRenderer.unmapAtCoords(centreBlock.x, centreBlock.y - 1, centreBlock.z);
        BlockRenderer.unmapAtCoords(centreBlock.x, centreBlock.y, centreBlock.z);
        BlockRenderer.unmapAtCoords(centreBlock.x, centreBlock.y + 1, centreBlock.z);
        structures.splice(structureId, 1);
    }
    return [[BlockID.iMod_radio_tower, 1, 0]]
})

Callback.addCallback('ItemUse', function (coords, item, block) {
    if(item.id != BlockID.iMod_radio_tower && block.id == BlockID.iMod_radio_tower && (structureId = getStructure(coords)) >= 0){
        Game.prevent();
        var centreCoords = structures[structureId][1];
        var ctsCentreCoords = cts(centreCoords);
        if(!sortedDungeons[ctsCentreCoords] || !sortedDungeons[ctsCentreCoords][0])sortedDungeons[ctsCentreCoords] = dungeons.sort(function(a,b){
            return Entity.getDistanceBetweenCoords(centreCoords, a) - Entity.getDistanceBetweenCoords(centreCoords, b);
        })
        var __coords = sortedDungeons[ctsCentreCoords][0];
        if(__coords)Game.message('Nearest dungeon located at: ' + __coords.x + ', ' + __coords.y + ', ' + __coords.z);
        else Game.message('Dungeon not found');
    }
})

Callback.addCallback('LevelDisplayed', function(){
    for(var i in structures){
        var centreBlock = structures[i][1];
        
        var render = new ICRender.Model();
        var model = BlockRenderer.createModel();
        model.addBox(0.3,0,0.3,0.7,0.6,0.7, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0], ['iMod_radio_tower_down', 0]]);
        model.addBox(0.4,0.6,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0]]/* 'iMod_radio_tower_centre' */);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y - 1, centreBlock.z, render);

        render = new ICRender.Model();
        model = BlockRenderer.createModel();
        model.addBox(0.4,0,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0], ['iMod_radio_tower_centre', 0]]/* 'iMod_radio_tower_centre' */);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y, centreBlock.z, render);

        render = new ICRender.Model();
        model = BlockRenderer.createModel();
        model.addBox(0.4,0,0.4,0.6,1,0.6, [['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up2', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0], ['iMod_radio_tower_up', 0]]);
        render.addEntry(model);
        BlockRenderer.mapAtCoords(centreBlock.x, centreBlock.y + 1, centreBlock.z, render);
    }
})

IDRegistry.genItemID("iMod_test_item2");
Item.createItem("iMod_test_item2", "Radio tower tester", {
	name: "iMod_test_item2"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_test_item2"]);
Item.registerUseFunction('iMod_test_item2', function(coords){
    alert(getStructure(coords));
});