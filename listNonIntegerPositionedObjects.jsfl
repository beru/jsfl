
/*

this script lists down non-integer positioned elements on a timeline.

reference
http://help.adobe.com/ja_JP/flash/cs/extend/index.html


*/

var timeline = fl.getDocumentDOM().getTimeline();
var layers = timeline.layers;

var elementsList = [];

for (var i=0; i<layers.length; ++i) {
	var layer = layers[i];
	if (layer.frameCount == 0) {
		continue;
	}
	var frames = layer.frames;
	for (var j=0; j<frames.length; ++j) {
		var frame = frames[j];
		if (frame.startFrame != j) {
			continue;
		}
		if (frame.elements.length) {
			elementsList.push({
				"layer" : i,
				"frame" : j,
				"elements" : frame.elements
			});
		}
	}
}

function hasFrac(val)
{
	return (val - Math.floor(val) != 0);
}

for (var i=0; i<elementsList.length; ++i) {
	var obj = elementsList[i];
	var frame = obj.frame;
	var layer = obj.layer;
	for (var j=0; j<obj.elements.length; ++j) {
		var el = obj.elements[j];
		if (
			(el.elementType == "instance" || el.elementType == "text")
			&& (hasFrac(el.x) || hasFrac(el.y) || hasFrac(el.width) || hasFrac(el.height))
		) {
			var str = "";
			str += layers[layer].name + " -> ";
			str += "ƒtƒŒ[ƒ€" + (frame+1) + " -> ";
			switch (el.elementType) {
			case "instance":
				str += el.libraryItem.name;
				break;
			case "text":
				str += el.getTextString();
				break;
			}
			if (el.name) {
				str += ", <" + el.name + ">";
			}
			str += "\tX: " + el.x;
			str += "\tY: " + el.y;
			str += "\tW: " + el.width;
			str += "\tH: " + el.height;
			
			fl.trace(str);
		}
	}
}

