LIBRARY({
    name: "vk9",
    version: 1,
    shared: false,
    api: "CoreEngine"
});

// const ACCESS_TOKEN = 'c316874361a5b6f9e0bc4a177a99e86c138bff6edd7d13c9b172c208554479f1a6e79d794c59c0e28422f';
// const GroupID = 179065827;

var JAVA_URL = java.net.URL;
var BufferedReader = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;

function getUrlContent(_url){
    try {
        var input = new BufferedReader(new InputStreamReader(new JAVA_URL(_url).openStream()));
        result = '';
        while (true) {
            inputLine = input.readLine();
            if (inputLine) {
                result += inputLine;
            } else {
                input.close();
                return result;
            }
        }
    } catch (e) {
        alert('Error' + JSON.stringify(e));
        return null;
    }
}

function init(data){
    var ACCESS_TOKEN = data.token;
    var GroupID = data.group;
    var ModName = data.modName;
    var tag = data.tag;
    testUiScreen =  new UI.Window({
        location: { x: 1000, y: 20, width: 40, height: 40 }, elements: {
            "element1": {
                type: "button", x: 0, y: 0, scale: 100/2, bitmap: "close_button",
                onTouchEvent: function (a, event) {
                    if (event.type == 'CLICK') {
                        alert("CLICK");
                        //eval(FileTools.ReadText('/storage/emulated/0/games/horizon/packs/Inner_Core_1/innercore/mods/DevMod/dev/execute.js'));
                    }
                }
            }
        }
    })
    alert('Wow, i get answer: ' + getUrlContent('http://192.168.1.165:8001/hi'));
    this.getWall = function(){

    }
    alert('OK');
}

EXPORT("Changelog", init);