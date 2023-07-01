var convertBtn = document.getElementById("convert-btn");
var inputSelect = document.getElementById("input-select");
var outputSelect = document.getElementById("output-select");

var inputTA = document.getElementById("input-ta");
var outputTA = document.getElementById("output-ta");

convertBtn.addEventListener("click", function () {
  var lines = inputTA.value;
  if (!lines) {
    setMessage("Put something in the input");
    return;
  }

  lines = lines.split("\n");

  // an Object
  var defaultLines = getDefaultLines();
  var processedLines = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    processedLines[i] = processLine(line);
  }

  var output = { ...defaultLines };
  for (const line of processedLines) {
    output = { ...output, ...line };
  }

  // now we make the object into a line
  var outputLines = "";
  for (const [k, v] of Object.entries(output)) {
    outputLines += `${k}: ${v}\n`;
  }

  outputTA.value = outputLines;
});

var defaultColors = {
  color0: "#000000",
  color1: "#cd0000",
  color2: "#00cd00",
  color3: "#cdcd00",
  color4: "#0000cd",
  color5: "#cd00cd",
  color6: "#00cdcd",
  color7: "#e5e5e5",
  color8: "#4d4d4d",
  color9: "#ff0000",
  color10: "#00ff00",
  color11: "#ffff00",
  color12: "#0000ff",
  color13: "#ff00ff",
  color14: "#00ffff",
  color15: "#ffffff",
  // special
  foreground: "#aaaaaa",
  background: "#000000",
};

function getInput() {
  return inputTA.value;
}

function setOutput(value) {
  outputTA.value = value;
}

function setMessage(message) {
  outputTA.value = message;
}

function getDefaultLines() {
  var outputType = outputSelect.value;
  var output = {};

  var keys = Object.keys(defaultColors);
  var values = Object.values(defaultColors);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = values[i];
    if (outputType == "foot") {
      var keySplits = key.split("color");
      if (keySplits.length != 2) {
        // not a color line?
        continue;
      }
      var _key = "";
      var num = parseInt(keySplits[1]);
      if (num < 8) {
        _key = "regular" + keySplits[1];
      } else {
        _key = "bright" + (num % 8);
      }
      var _value = value.replace("#/g", "");
      output[_key] = _value;
    } else if (outputType == "alacritty") {
      // TODO:
    }
  }

  return output;
}

function processLine(line) {
  // color0: "#000000"
  var splits = line.split(":");
  splits = splits.map((s) => s.trim());

  var key = splits[0];
  var value = splits[1];

  if (!key || !value) {
    setMessage("Invalid line input");
    return;
  }

  var outputType = outputSelect.value;
  var output = {};
  if (outputType == "foot") {
    var keySplits = key.split("color");
    var _key = "";
    var num = parseInt(keySplits[1]);
    if (num < 8) {
      _key = "regular" + keySplits[1];
    } else if (num >= 8) {
      _key = "bright" + (num % 8);
    } else {
      // special colors
      if (keySplits[0].includes("foreground")) {
        _key = "foreground";
      } else if (keySplits[0].includes("background")) {
        _key = "background";
      }
    }

    if (_key) {
      var _value = value.replace("#/g", "");
      output[_key] = _value;
    }
  } else if (outputType == "alacritty") {
    // TODO:
  }

  return output;
}
