IDRegistry.genItemID("iMod_clock");
Item.createItem("iMod_clock", "Enchanted Clock", {
	name: "iMod_clock"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock"]);
Item.setGlint(ItemID.iMod_clock, true);

var maxModes = 3
Item.registerUseFunction(ItemID.iMod_clock, function(coords, item, block){
	if(!item.extra){
		item.extra = new ItemExtraData();
		Player.setCarriedItem(item.id, item.count, item.data, item.extra);
	}
	if(Entity.getSneaking(Player.get())){
		var mode = item.extra.getInt('mode', 1);
		mode = mode >= 3 ? 1 : mode + 1;
		item.extra.putInt('mode', mode);
		Game.tipMessage('Time skipping set to: ' + (5*mode) + ' secconds');
	} else {
		var _thread = java.lang.Thread.currentThread();
		_thread.sleep(5000*item.extra.getInt('mode', 1));
	}
})

Callback.addCallback("PreLoaded", function () {
    dungeonLoot.push({id: ItemID["iMod_clock"], count: [1, 1], data: 0, extra: null, chance: 10});
})

IDRegistry.genItemID("iMod_clock2");
Item.createItem("iMod_clock2", "Clock", {
	name: "iMod_clock"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock2"]);