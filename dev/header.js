IMPORT('SoundAPI');

const modId = 638;

var tempdata = {};
Callback.addCallback('LevelLeft', function(){
    tempdata = {};
});

function getUrlContent(_url){
    var isError = {data: undefined};
    try {
        var input;
        var inputOpened = true;
        result = '';
        jSetTimeout(function(){//522;
            if(result.length == 0 && !isError.data){
                alert('Your internet connection is very slow\nIf you do not want to see this message and want make loading faster then change "changelogEnabled" to "false" in iMod config file');
            }
        }, 5000);
        var _URL_ = new JAVA_URL(_url);
        input = new BufferedReader(new InputStreamReader(_URL_.openStream()));
        while (inputOpened) {
            inputLine = input.readLine();
            if (inputLine) {
                result += inputLine + '\n';
            } else {
                input.close();
                return {data: result.substr(0, result.length - 1)};
            }
        }
        return {error:'408 Request Timeout'};
    } catch (e) {
        isError.data = e;
        Logger.Log('Changelog Error: ' + JSON.stringify(e), 'RefinedStoragePE');
        return {error: e};
    }
}

var currentVersion = Number(FileTools.ReadText(__dir__ + 'versionId.txt'));
var lastVersion = Number(getUrlContent('https://icmods.mineprogramming.org/api/version?id=' + modId).data) || currentVersion;
if(currentVersion < lastVersion) alert('Hey, new version is available for downloading please update!');