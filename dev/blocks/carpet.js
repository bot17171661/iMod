IDRegistry.genBlockID("iMod_carpet");
Block.createBlockWithRotation("iMod_carpet", [
	{
		name: "Carpet",
		texture: [
            ['iMod_carpet', 0],
            ['iMod_carpet_side', 0]
        ],
		inCreative: true
	}
]);
mod_tip(BlockID["iMod_carpet"]);

Item.registerIconOverrideFunction(BlockID.iMod_carpet, function(){
    return {name:'iMod_item_carpet', data: 0};
})

for(var ka = 0; ka < 4; ka++){
    var render = new ICRender.Model();
    var _pis = [Math.PI,0,Math.PI/2,Math.PI*1.5];
    var _renderMesh = new RenderMesh('carpet.obj', 'obj');
    _renderMesh.rotate(0, _pis[ka], 0);
    _renderMesh.setBlockTexture('iModcarpet', 0);
    _renderMesh.scale(0.5,1,0.5);
    //_renderMesh.translate(2,0,1.375);
    render.addEntry(new BlockRenderer.Model(_renderMesh))
    Block.setShape(BlockID.iMod_carpet,0,0,0,1,1/16,1, ka);
	BlockRenderer.setStaticICRender(BlockID.iMod_carpet, ka, render);
}

/* Block.registerPlaceFunction('iMod_carpet', function(coords, item, block){
	coords = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
	var relBlock = World.getBlock(coords.x, coords.y, coords.z);
    if (relBlock.id != 0 && relBlock.id != 9 && relBlock.id != 11) return;
    World.setBlock(coords.x, coords.y, coords.z, BlockID.iMod_carpet, 0);
    Player.decreaseCarriedItem(1);
}) */