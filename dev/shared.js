var iMod = {
    addDungeonLoot: function(loot){
        loot = {id: loot.id, count: loot.count, data: loot.data, extra: loot.extra || null, chance: loot.chance || 100};
        dungeonLoot.push(loot);
    },
    addDungeonRoom: function(room){
        dungeonRooms.push(room);
    }
};

ModAPI.registerAPI("iModAPI", {
    iMod: iMod,
    requireGlobal: function (command) {
        return eval(command);
    }
});
Logger.Log("iModAPI Loaded", "API");