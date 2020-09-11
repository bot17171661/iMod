IDRegistry.genBlockID("iMod_radio");
Block.createBlock("iMod_radio", [
	{
		name: "Radio",
		texture: [
            ['cable', 0]
        ],
		inCreative: true
	}
]);

TileEntity.registerPrototype(BlockID.iMod_radio, {
    init: function(){
        alert('Hi');
    }
})