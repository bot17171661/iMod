IDRegistry.genBlockID("iMod_dungeon_block");
Block.createBlock("iMod_dungeon_block", [
	{
		name: "Dungeon Block",
		texture: [
            ['dungeon_block', 0]
        ],
		inCreative: true
	}
], 'opaque');
mod_tip(BlockID["iMod_dungeon_block"]);

IDRegistry.genBlockID("iMod_easter_dungeon_block");
Block.createBlock("iMod_easter_dungeon_block", [
	{
		name: "Dungeon Block",
		texture: [
            ['easter_dungeon_block', 0],
            ['dungeon_block', 0]
        ],
		inCreative: true
	}
], 'opaque');
mod_tip(BlockID["iMod_easter_dungeon_block"]);

Block.registerDropFunction('iMod_easter_dungeon_block', function(){
    return [[BlockID.iMod_dungeon_block, 1, 0]];
})