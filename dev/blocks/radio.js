IDRegistry.genBlockID("iMod_radio");
Block.createBlockWithRotation("iMod_radio", [
	{
		name: "Radio",
		texture: [
            ['i_radio_side', 0],
            ['i_radio_side', 0],
            ['i_radio_side', 0],
            ['i_radio', 0],
            ['i_radio_side', 0],
            ['i_radio_side', 0]
        ],
		inCreative: true
	}
]);
mod_tip(BlockID["iMod_radio"]);

var noteParticles = [Particles.registerParticleType({
	texture: "Note",
	size: [0.7, 1],
    lifetime: [40, 40],
    color: [200, 110, 210, 1],
	render: 2,
	acceleration: [0, 0.001, 0]
}),Particles.registerParticleType({
	texture: "Note",
	size: [0.7, 1],
	lifetime: [40, 40],
    color: [110, 220, 130, 1],
	render: 2,
	acceleration: [0, 0.001, 0]
}),Particles.registerParticleType({
	texture: "Note",
	size: [0.7, 1],
	lifetime: [40, 40],
    color: [110, 220, 210, 1],
	render: 2,
	acceleration: [0, 0.001, 0]
}),Particles.registerParticleType({
	texture: "Note",
	size: [0.7, 1],
	lifetime: [40, 40],
    color: [220, 55, 55, 1],
	render: 2,
	acceleration: [0, 0.001, 0]
})]

var radioBoxes = [
    [0.1,0,0.3,0.9,0.5,0.7],
    [0.1,0,0.3,0.9,0.5,0.7],
    [0.3,0,0.1,0.7,0.5,0.9],
    [0.3,0,0.1,0.7,0.5,0.9]
]
for (var izxc = 0; izxc < 4; izxc++) {
    var render = new ICRender.Model();
    var _radioBox = radioBoxes[izxc];
    render.addEntry(new BlockRenderer.Model(_radioBox[0], _radioBox[1], _radioBox[2], _radioBox[3], _radioBox[4], _radioBox[5], BlockID.iMod_radio, izxc))
    Block.setShape(BlockID.iMod_radio, _radioBox[0], _radioBox[1], _radioBox[2], _radioBox[3], _radioBox[4], _radioBox[5], izxc);
	BlockRenderer.enableCoordMapping(BlockID.iMod_radio, izxc, render);
}

var radios = [];
var soundList = FileTools.GetListOfFiles(__dir__ + 'sounds');
for(var i = 0; i < soundList.length; i++){
    var splited = (soundList[i] + '').split('/');
    radios.push(splited[splited.length - 1]);
}
var maxRadio = radios.length - 1;
TileEntity.registerPrototype(BlockID.iMod_radio, {
	useNetworkItemContainer: true,
    defaultValues:{
        currentRadio: 0,
        radioPlay: false,
        ticks: 0
    },
    init: function(){
        this.data.radioPlay = false;
    },
    click: function(id, count, data, coords, player, extra){
        if(Entity.getSneaking(player)){
            this.stopMusic();
            this.data.radioPlay = false;
            return false;
        }
        this.setRadio(this.data.currentRadio + 1);
        return true;
    },
    /* getRadio: function(_id){
        var thisData = tempdata[cts(this)];
        if(!thisData) {
            thisData = tempdata[cts(this)] = [];
            for(var i in radios){
                var sound = new Sound(radios[i]);
                sound.setInBlock(this.x, this.y, this.z, 30);
                var ths = this;
                sound.setOnCompletion(function(){
                    ths.setRadio(i + 1);
                })
                thisData.push(sound)
            }
        }
        return thisData[_id] || {stop: function(){}, play: function(){}};
    }, */
    setRadio: function(_id){
        if(_id >= maxRadio) _id = 0;
        this.data.currentRadio = _id;
        this.playMusic(radios[_id]);
        this.data.radioPlay = true;
    },
    playMusic: function(name){
        this.sendPacket('playMusic', {name: name})
    },
    stopMusic: function(){
        this.sendPacket('stopMusic', {})
    },
    tick: function(){
        this.data.ticks++;
        if(this.data.radioPlay && this.data.ticks%25 == 0){
			/* var emitter = new Particles.ParticleEmitter(this.x + 0.5 + Math.random()/10, this.y + 0.6, this.z + 0.5 + Math.random()/10);
			emitter.setEmitRelatively(true);
            emitter.emit(noteParticles[_randomInt(0,3)], 0, 0, 0, 0); */
            this.sendPacket('emitParticle', {i: _randomInt(0,3)})
        }
    },
    /* destroy: function(){
        this.stopMusic();
    }, */
    events: {
        nextRadio: function(){
            this.setRadio(this.data.currentRadio + 1);
        },
        requireDownloading: function(packetData, packetExtra, connectedClient) {
            //alert('Donwloading required: ' + packetData.name);
            alert('Other players do not have this music: ' + packetData.name);
            //this.sendResponse("donwload", {data: FileTools.ReadText(__dir__ + 'sounds/' + packetData.name), name: packetData.name});
        },
        stopMusic: function(){
            this.stopMusic();
        },
        playCurrentMusic: function(){
            this.setRadio(this.data.currentRadio);
        }
    },
    client: {
        unload: function(){
            if(this.currentSound){
                this.currentSound.stop();
                this.currentSound = null;
            }
        },
        currentSound: null,
        downloading: false,
        playMusic: function(name){
            //alert('Play music: ' + name);
            if(this.currentSound)this.currentSound.stop();
            if(!FileTools.isExists(__dir__+"sounds/"+name)){
                //alert('Require downloading');
                this.downloading = true;
                this.sendPacket('stopMusic', {});
                this.sendPacket('requireDownloading', {name: name});
                return;
            }
            var sound = new Sound(name);
            sound.setInBlock(this.x, this.y, this.z, 30);
            var ths = this;
            sound.setOnCompletion(function(){
                ths.sendPacket('nextRadio', {});
            });
            sound.play();
            this.currentSound = sound;
        },
        stopMusic: function(packetData, packetExtra){
            if(this.currentSound){
                this.currentSound.stop();
                this.currentSound = null;
            }
        },
        events: {
            playMusic: function(packetData, packetExtra) {
                this.playMusic(packetData.name);
            },
            stopMusic: function(packetData, packetExtra){
                if(this.currentSound){
                    this.currentSound.stop();
                    this.currentSound = null;
                }
            },
            emitParticle: function(packetData, packetExtra){
                var emitter = new Particles.ParticleEmitter(this.x + 0.5 + Math.random()/10, this.y + 0.6, this.z + 0.5 + Math.random()/10);
                emitter.setEmitRelatively(true);
                emitter.emit(noteParticles[packetData.i], 0, 0, 0, 0);
            },
            donwload: function(packetData, packetExtra){
                //alert('Donwloading success! ' + packetData.name);
                if(packetData.data){
                    FileTools.WriteText(__dir__ + 'sounds/' + packetData.name, packetData.data);
                    if(this.downloading){
                        this.sendPacket('playCurrentMusic', {});
                        this.downloading = false;
                    }
                }
            }
        }
    }
});