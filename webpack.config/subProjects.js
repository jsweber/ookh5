var path = require("path");
var fs = require("fs");
var src = path.join(__dirname,"../src");

var subProjects = fs.readdirSync(src); //[subdir1,subdir2,....]

module.exports = subProjects;