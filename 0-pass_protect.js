const ignore = [".git", ".vscode", ".node-version", "node_modules", 
"readme files", "prototypes", "protected", "config.json", "note for grads.json", 
"package.json", "package-lock.json", "0-pass_protect.js", "groupings"];
const protPath = __dirname+"/protected/";
const hashPass = "2244cd35ce222646e8abb1e15ec0466f87c07ed4d00fa95d07a38a34aa61aae1"
const SALT = "7e7610a1628c19f6d53bfbaee6f92f59"
const PASS = "password"
var fs = require('fs');
var statiCrypt = require('./scripts/staticrypt.js');

const editList = [
    "pages/grads/grads.json",
    "pages/grads/grads_section.json",
    "pages/grads/messages.json",
    "pages/indiv_spread/grads_nn.json"
];

fs.rmSync("./protected", { recursive: true, force: true });
fs.mkdir("./protected", err=> {});
readThrough("");

console.log("\n\n-------------------------------------")
console.log(    "          START PROTECTION           ")
console.log(    "-------------------------------------")
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
                    else if (editList.includes(dir+f)) edit(dir+f);
                    else {
                        //console.log("File at "+protPath+dir+f);
                        //fs.writeFile(protPath+dir+f, data, (err) => {});
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
    fs.readFile("./"+file, (err, cont, _1) => {
    if (file_type == "json")
        statiCrypt.encode(cont, PASS, SALT).then(
            res => fs.writeFile(protPath+file, res, err=>{}),
            res => {});
    else if (file_type == "html") {
        cont = cont.toString();
        prev = cont.match(/^[\s\S]+<body>\s/g);
        dec = cont.match(/(?<=<body>\s)[\s\S]+(?=\s<\/body>)/g);
        after = cont.match(/\s<\/body>[\s\S]+$/g);
        statiCrypt.encode(dec, PASS, SALT).then(
            enc => fs.writeFile(protPath+file, prev+enc+after, err=>{}),
            enc => {});
        }
    });
}