IDRegistry.genItemID("iMod_compass");
Item.createItem("iMod_compass", "Compass", {
	name: "iMod_compass"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_compass"]);

Item.registerUseFunction('iMod_compass', function(){
    var coords = Player.getPosition();
    Game.tipMessage(coords.x + ' ' + coords.y + ' ' + coords.z);
})