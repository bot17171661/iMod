IDRegistry.genBlockID("iMod_radio");
Block.createBlockWithRotation("iMod_radio", [
	{
		name: "Radio",
		texture: [
            ['i_radio', 0]
        ],
		inCreative: true
	}
]);

var radioBoxes = [
    []
]
for (var izxc = 0; izxc < 4; izxc++) {
    var render = new ICRender.Model();
    var _radioBox = radioBoxes[izxc];
    render.addEntry(new BlockRenderer.Model(_radioBox[0], _radioBox[1], _radioBox[2], _radioBox[3], _radioBox[4], _radioBox[5], BlockID.iMod_radio, izxc))
	BlockRenderer.enableCoordMapping(BlockID.iMod_radio, izxc, render);
}

var maxRadio = 0;
var radios = ['0.ogg'];
TileEntity.registerPrototype(BlockID.iMod_radio, {
    defaultValues:{
        currentRadio: 0
    },
    init: function(){
        this.data.radioPlay = false;
    },
    click: function(){
        if(Entity.getSneaking(Player.get())){
            radios[this.data.currentRadio].stop();
            return false;
        }
        this.setRadio(this.data.currentRadio + 1);
        return true;
    },
    getRadio: function(_id){
        var thisData = tempdata[cts(this)];
        if(!thisData) {
            thisData = tempdata[cts(this)] = [];
            for(var i in radios){
                var sound = new Sound(radios[i]);
                sound.setInBlock(this.x, this.y, this.z, 15);
                thisData.push(sound)
            }
        }
        return thisData[_id] || {stop: function(){}, play: function(){}};
    },
    setRadio: function(_id){
        if(_id >= maxRadio) _id = 0;
        this.getRadio(this.data.currentRadio).stop();
        this.data.currentRadio = _id;
        var radio = this.getRadio(_id);
        radio.play();
    },
    destroy: function(){
        this.getRadio(this.data.currentRadio).stop();
    }
})