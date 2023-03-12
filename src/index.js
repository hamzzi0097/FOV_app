const remote = require('@electron/remote');

const dialog = remote.getGlobal('dialog');

document.getElementById('upload').onclick = function() {
	console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));
};

if (global.filepath && !file.canceled) {
fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) {
	if (!err) {
		console.log('received data: ' + data);
	} else {
		console.log(err);
	}
});
}