IDRegistry.genItemID("iMod_compass");
Item.createItem("iMod_compass", "Compass", {
	name: "iMod_compass"
}, {
	stack: 1
});
mod_tip(ItemID["iMod_compass"]);

Item.registerUseFunction('iMod_compass', function(coords, item, block, player){
    var coords = Player.getPosition();
    var client = Network.getClientForPlayer(player);
    client.send('iMod.tipmessage', {text: parseInt(coords.x) + ' ' + parseInt(coords.y) + ' ' + parseInt(coords.z)});
})