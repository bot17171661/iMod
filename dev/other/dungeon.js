var dungeonChance = __config__.getNumber('dungeonChance');

var dungeonSize = 13;
var dungeonHeight = 6

var mainStructure = [];

var dungeonLoot = [{id: BlockID["iMod_radio"], count: [1, 3], data: 0, extra: null, chance: 20}];

for(var x = 0; x < dungeonSize; x++){
    for(var y = 0; y < dungeonHeight; y++){
        for(var z = 0; z < dungeonSize; z++){
            var centre = Math.floor(dungeonSize/2);
            if(((x == 0 || x == dungeonSize - 1 || x == centre) || (y == 0 || y == dungeonHeight - 1) || (z == 0 || z == dungeonSize - 1 || z == centre)) && !(x >= centre - 1 && x <= centre + 1 && z >= centre - 1 && z <= centre + 1 && y > 0 && y < 3))
                mainStructure.push({id: BlockID.iMod_dungeon_block, data: 0, coords: {x: x, y: y, z: z}});
            else
                mainStructure.push({id: 0, data: 0, coords: {x: x, y: y, z: z}});
        }
    }
}

var dungeonRooms = [];

dungeonRooms.push([{
    id: 146, 
    data: 0, 
    coords:{x:0,y:0,z:0}, 
    func: function(coords, random){
        var container = World.getContainer(coords.x, coords.y, coords.z);
        if(!container) return;
        var slots = container.slots ? [].concat(container.slots) : (function(){var __slots = []; for(var i = 0; i < container.getSize(); i++) __slots.push(i); return __slots})();
        //alert(slots);
        for(var i in dungeonLoot){
            if(random.nextInt(100) <= dungeonLoot[i].chance){
                var count = _randomInt(dungeonLoot[i].count[0], dungeonLoot[i].count[1]);
                for(var k = 0; k < count; k++){
                    var slot = slots[slots.length - 1 == 0 ? 0 : random.nextInt(slots.length - 1)];
                    slots.splice(slots.indexOf(slot), 1);
                    container.setSlot(slot, dungeonLoot[i].id, 1, dungeonLoot[i].data, dungeonLoot[i].extra);
                }
            }
        }
    }
}]);

function spawnDungeon(coords, random){
    for(var i in mainStructure){
        World.setBlock(coords.x + mainStructure[i].coords.x, coords.y + mainStructure[i].coords.y, coords.z + mainStructure[i].coords.z, mainStructure[i].id, mainStructure[i].data);   
    }
    for(var i = 0; i <= 1; i++){
        for(var j = 0; j <= 1; j++){
            var room = dungeonRooms[dungeonRooms.length - 1 == 0 ? 0 : random.nextInt(dungeonRooms.length - 1)];
            for(var k in room){
                var coordss = {x: parseInt(coords.x + dungeonSize/2*i + 3 + room[k].coords.x), y: parseInt(coords.y + 1 + room[k].coords.y), z: parseInt(coords.z + dungeonSize/2*j + 3 + room[k].coords.z)};
                World.setBlock(coordss.x, coordss.y, coordss.z, room[k].id, room[k].data);
                if(room[k].func) room[k].func(coordss, random);
            }
        }
    }
}

World.addGenerationCallback("GenerateChunk", function(chunkX, chunkZ, random){
    //var biome = World.getBiome((chunkX + 0.5) * 16, (chunkZ + 0.5) * 16);
    //alert(biome + '\n' + random.nextInt(100) + '\n' + random.nextInt(16));
    if(random.nextInt(100) < dungeonChance) return;
    var coords = {x: chunkX*16 + random.nextInt(16), y: 10 + random.nextInt(10), z: chunkZ*16 + random.nextInt(16)};
    spawnDungeon(coords, random);
	/* if(random.nextInt(100) < RUBBER_TREE_BIOME_DATA[biome]){
		var treeCount = 1 + random.nextInt(6);
		for(var i = 0; i < treeCount; i++){
			var coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
			if(World.getBlockID(coords.x, coords.y, coords.z) == 2){
				RubberTreeGenerationHelper.generateRubberTree(coords.x, coords.y + 1, coords.z, random)
			}
		}
	} */
}, "iMod_dungeon");

IDRegistry.genItemID("iMod_test_item");
Item.createItem("iMod_test_item", "Magic Wand", {
	name: "magic_wand"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_test_item"]);
Item.registerUseFunction('iMod_test_item', function(coords){
    spawnDungeon(coords, java.util.Random());
});