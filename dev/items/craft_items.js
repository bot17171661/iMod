IDRegistry.genItemID("iMod_coil");
Item.createItem("iMod_coil", "Coil", {
	name: "iMod_coil"
}, {
	stack: 64
});
mod_tip(ItemID["iMod_coil"]);

IDRegistry.genItemID("iMod_wire");
Item.createItem("iMod_wire", "Wire", {
	name: "iMod_wire"
}, {
	stack: 64
});
mod_tip(ItemID["iMod_wire"]);

IDRegistry.genItemID("iMod_plate");
Item.createItem("iMod_plate", "Plate", {
	name: "iMod_plate"
}, {
	stack: 64
});
mod_tip(ItemID["iMod_plate"]);

IDRegistry.genItemID("iMod_antenna");
Item.createItem("iMod_antenna", "Antenna", {
	name: "iMod_antenna"
}, {
	stack: 64
});
mod_tip(ItemID["iMod_antenna"]);

IDRegistry.genItemID("iMod_speaker");
Item.createItem("iMod_speaker", "Speaker", {
	name: "iMod_speaker"
}, {
	stack: 64
});
mod_tip(ItemID["iMod_speaker"]);

Callback.addCallback("PreLoaded", function () {
    dungeonLoot.push({id: ItemID["iMod_coil"], count: [1, 3], data: 0, extra: null, chance: 80});
    dungeonLoot.push({id: ItemID["iMod_wire"], count: [1, 3], data: 0, extra: null, chance: 40});
    dungeonLoot.push({id: ItemID["iMod_antenna"], count: [1, 3], data: 0, extra: null, chance: 40});
    dungeonLoot.push({id: ItemID["iMod_speaker"], count: [1, 3], data: 0, extra: null, chance: 40});
})