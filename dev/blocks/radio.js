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

var maxRadio = 0;
var radios = [new Sound("0.ogg")]
TileEntity.registerPrototype(BlockID.iMod_radio, {
    defaulValues:{
        currentRadio: 0,
        radioPlay: false
    },
    init: function(){
        alert('Hi');
        this.data.radioPlay = false;
    },
    click: function(){
        if(Entity.getSneaking(Player.get())){
            radios[this.data.currentRadio].stop();
            return false;
        }
        setRadio(this.data.currentRadio + 1);
        return true;
    },
    setRadio: function(_id){
        if(_id >= maxRadio) _id = 0;
        radios[this.data.currentRadio].stop();
        this.data.currentRadio = _id;
        radios[_id].play();
        this.data.radioPlay = true;
    }
})