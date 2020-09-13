IDRegistry.genItemID("iMod_clock");
Item.createItem("iMod_clock", "Enchanted Clock", {
	name: "iMod_clock"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock"]);
Item.setGlint(ItemID.iMod_clock, true);

Item.registerUseFunction(ItemID.iMod_clock, function(coords, items, block){
	var _thread = java.lang.Thread.currentThread();
	_thread.sleep(5000);
})

Callback.addCallback("PreLoaded", function () {
    dungeonLoot.push({id: ItemID["iMod_clock"], count: [1, 1], data: 0, extra: null, chance: 10});
})

IDRegistry.genItemID("iMod_clock2");
Item.createItem("iMod_clock2", "Clock", {
	name: "iMod_clock2"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_clock2"]);