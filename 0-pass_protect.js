const ignore = [".git", ".vscode", ".node-version", "node_modules", 
"readme files", "temp_assets", "prototypes", "protected", "config.json",
"package.json", "package-lock.json", "0-pass_protect"];
const protPath = __dirname+"/protected/";
const editList = ["index.html"];
const hashPass = "2244cd35ce222646e8abb1e15ec0466f87c07ed4d00fa95d07a38a34aa61aae1"
var fs = require('fs');
var statiCrypt = require('./scripts/staticrypt.js');

console.log(statiCrypt);

// file is included here:.

fs.rmSync("./protected", { recursive: true, force: true });
fs.mkdir("./protected", err=> {});
readThrough("");

function readThrough(dir) {
    fs.readdir("./"+dir, (err, files) => {
    if (files != null) {
        console.log(dir, files);
        fs.mkdir(protPath+dir, err=> {});
        files.forEach(f => {
            if(ignore.includes(f)) {;}
            else {
                fs.readFile(dir+f, (err, data, _1) => {
                    if (err != null) readThrough(`${dir}${f}/`);
                    else if (editList.includes(f)) edit(dir+f);
                    else {
                        console.log("File at "+protPath+dir+f);
                        fs.writeFile(protPath+dir+f, data, (err) => {});
                    };
                });
            }
        });
    }
    });
}

function edit(file) {
    file_type = file.split(".");
    file_type = file_type[file_type.length - 1];

    console.log("Editing at " +protPath+file);
    fs.readFile("./"+file, (err, dec, _1) => {
    if (file_type == "json")
        fs.writeFile(protPath+file, statiCrypt.encrypt(dec, hashPass), err=>{});
    else if (file_type == "html")
        fetch(statiCrypt.encrypt(dec.toString().match('(?<=<body>)[\s\S]*(?=</body>)'), hashPass))
        //fs.writeFile(
        //    protPath+file,
        //    , 
        //    err=>{});
    });
}