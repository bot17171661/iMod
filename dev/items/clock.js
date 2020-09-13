IDRegistry.genItemID("iMod_clock");
Item.createItem("iMod_clock", "Enchanted Clock", {
	name: "iMod_clock"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock"]);
Item.setGlint(ItemID.iMod_clock, true);

var maxModes = 3
var _cooldown = 60;
Item.registerUseFunction(ItemID.iMod_clock, function(coords, item, block){
	if(!item.extra){
		item.extra = new ItemExtraData();
	}
	var timestamp = Math.floor(Date.now() / 1000);
	if(Entity.getSneaking(Player.get())){
		var mode = item.extra.getInt('mode', 1) + 1;
		if(mode > 3) mode = 1;
		item.extra.putInt('mode', mode);
		Game.tipMessage('Time skipping set to: ' + (5*mode) + ' secconds');
	} else if((cooldown = timestamp - item.extra.getInt('cooldown', timestamp - _cooldown)) >= _cooldown) {
		var _thread = java.lang.Thread.currentThread();
		var mode = item.extra.getInt('mode', 1);
		item.extra.putInt('cooldown', timestamp);
		_thread.sleep(5000*mode);
	} else {
		Game.tipMessage('§cCooldown: ' + (_cooldown - cooldown) + ' sec');
	}
	Player.setCarriedItem(item.id, item.count, item.data, item.extra);
})

Callback.addCallback("PreLoaded", function () {
    dungeonLoot.push({id: ItemID["iMod_clock"], count: [1, 1], data: 0, extra: null, chance: 15});
})

IDRegistry.genItemID("iMod_clock2");
Item.createItem("iMod_clock2", "Clock", {
	name: "iMod_clock"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock2"]);