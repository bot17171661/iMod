var dungeonChance = __config__.getNumber('dungeonChance');

var dungeons = [];
var sortedDungeons = {};

Saver.addSavesScope("iModDungeons",
	function read(scope){
		dungeons = scope && scope.dungeons ? scope.dungeons : [];
		sortedDungeons = scope && scope.sortedDungeons ? scope.sortedDungeons : {};
	},

	function save(){
		return {dungeons: dungeons, sortedDungeons: sortedDungeons};
	}
);

var dungeonSize = 13;
var dungeonHeight = 6

var mainStructure = [];

var dungeonLoot = [];

for(var x = 0; x < dungeonSize; x++){
    for(var y = 0; y < dungeonHeight; y++){
        for(var z = 0; z < dungeonSize; z++){
            var centre = Math.floor(dungeonSize/2);
            if(x == centre && z == centre && y == 0)
                mainStructure.push({id: BlockID.iMod_easter_dungeon_block, data: 0, coords: {x: x, y: y, z: z}});
            else if(((x == 0 || x == dungeonSize - 1 || x == centre) || (y == 0 || y == dungeonHeight - 1) || (z == 0 || z == dungeonSize - 1 || z == centre)) && !(x >= centre - 1 && x <= centre + 1 && z >= centre - 1 && z <= centre + 1 && y > 0 && y < 3))
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
                    var slotID =slots.length - 1 == 0 ? 0 : random.nextInt(slots.length - 1);
                    var slot = slots[slotID];
                    var slotItem = container.getSlot(slot);
                    var iterations = 0;
                    while((slotItem = container.getSlot(slot)).id != 0 && slotItem.id != dungeonLoot[i].id && iterations <= slots.length){
                        slot = slots[slotID = (slotID + 1 >= slots.length ? 0 : slotID + 1)];
                        iterations++;
                    }
                    if(iterations >= slots.length) return;
                    //slots.splice(slots.indexOf(slot), 1);
                    container.setSlot(slot, dungeonLoot[i].id, slotItem.count + 1, dungeonLoot[i].data, dungeonLoot[i].extra);
                }
            }
        }
    }
}]);

dungeonRooms.push([{
    id: 0, 
    data: 0, 
    coords:{x:0,y:0,z:0}, 
    func: function(coords, random){
        var _coords = [[1,0], [-1,0], [0,-1], [0,1]];
        for(var i in _coords){
            Entity.spawn(coords.x + _coords[i][0], coords.y, coords.z + _coords[i][1], 32);
        }
    }
}]);

(function tntRoom(){
    var room = [];
    for(var x = -1; x <= 1; x++){
        for(var z = -1; z <= 1; z++){
            room.push({coords:{x: x, y: -2, z: z}, id:BlockID.iMod_dungeon_block, data:0});
            room.push({coords:{x: x, y: -1, z: z}, id:46, data:0});
            room.push({coords:{x: x, y: 0, z: z}, id:72, data:0});
        }
    }
    dungeonRooms.push(room);
})();

function spawnDungeon(coords, random){
    for(var i in mainStructure){
        World.setBlock(coords.x + mainStructure[i].coords.x, coords.y + mainStructure[i].coords.y, coords.z + mainStructure[i].coords.z, mainStructure[i].id, mainStructure[i].data);   
    }
    treasuteRooms = 0;
    for(var i = 0; i <= 1; i++){
        for(var j = 0; j <= 1; j++){
            var room = dungeonRooms[roomId = _randomInt(0, dungeonRooms.length - 1)/* dungeonRooms.length - 1 == 0 ? 0 : random.nextInt(dungeonRooms.length - 1) */];
            if(roomId == 0)treasuteRooms++;
            if(i == 1 && j == 1 && treasuteRooms == 0)room = dungeonRooms[0];
            for(var k in room){
                var coordss = {x: parseInt(coords.x + dungeonSize/2*i + 3 + room[k].coords.x), y: parseInt(coords.y + 1 + room[k].coords.y), z: parseInt(coords.z + dungeonSize/2*j + 3 + room[k].coords.z)};
                World.setBlock(coordss.x, coordss.y, coordss.z, room[k].id, room[k].data);
                if(room[k].func) room[k].func(coordss, random);
            }
        }
    }
    dungeons.push({x: coords.x + dungeonSize/2, y: coords.y, z: coords.z + dungeonSize/2});
}

World.addGenerationCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) > dungeonChance) return;
    var coords = {x: chunkX*16 + random.nextInt(16), y: 10 + random.nextInt(10), z: chunkZ*16 + random.nextInt(16)};
    //alert(cts(coords));
    spawnDungeon(coords, random);
}, "iMod_dungeon");

IDRegistry.genItemID("iMod_test_item");
Item.createItem("iMod_test_item", "Dungeon creator", {
	name: "iMod_test_item"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_test_item"]);
Item.registerUseFunction('iMod_test_item', function(coords){
    spawnDungeon(coords, java.util.Random());
});