// page crash, send the user back or to grads_section.html
function pageLoadFail() {
  var prevPage = window.location.href;
    window.history.back();
    
    //If somehow you can't send the user back, send them to The Graduates
    setTimeout(function(){ 
        if (window.location.href == prevPage) {
            window.location.href = "grads_section.html"; 
        }
    }, 500);
}

// Function run if the stdId is invalid, checks for what the last valid url was
// Technically the user could edit their localstorage... but like, why would they?
// If ever that happens, see exception statements in function changeStuff
function loadBackup() {
  return localStorage.getItem("stdId");
}

// Check if ID is valid
function validateID(id) {
  for(let i = 3; i<9; i++) if (id[i] > 7) return false;
  if(parseInt(id.slice(9)) > 15) return false;
  return true;
}

// converts ID to sections 
function convID(id) {
  let sections = {};
  for(let i=3; i<9; i++) sections[`Grade ${i+4}`] = REF[i][parseInt(id[i])];
  sections["Silid"] = REF[9][parseInt(id.slice(9))];
  return sections;
}

// Reference for the student Id meanings
// Matching nth digit to sections
const REF = {
  3:["Diamond", "Emerald", "Garnet", "Jade", "Opal", "Ruby", "Sapphire", "Topaz"],
  4:["Adelfa", "Camia", "Champaca", "Dahlia", "Ilang-Ilang", "Jasmin", "Rosal", "Sampaguita"],
  5:["Beryllium", "Cesium", "Lithium", "Magnesium", "Potassium", "Rubidium", "Sodium", "Strontium"],
  6:["Charm", "Electron", "Gluon", "Graviton", "Muon", "Photon", "Tau", "Truth"],
  7:["A", "B", "C", "D", "E", "F", "G", "H"],
  8:["A", "B", "C", "D", "E", "F", "G", "H"],
  9:["A Santos", "Alcala", "Baltazar", "Banzon", "Cruz", "Del Mundo", "Del Rosario", "Fronda", 
     "G Velasquez", "Gomez", "Juliano", "Ramirez", "Trono", "Velasco", "Vergara", "Zara"]
}

///////////////////////////
// RUNNING CODE

// Get student Id to show the user what they want
var url = window.location.href.split("#")
// Check if the url contains an identifier (#) or is 11 digits (AAA BCD EFG HH)
var id = url.length == 1 || url[1].length != 11 ? -1 : url[1];
if (id == -1) { // If the id fails the first try, check backup
  id = loadBackup();
  console.log(validateID());
  if(! validateID(id)) {
    pageLoadFail();
  }
}
console.log(id, url)
// Loads in the data from grads.json 
async function changeStuff(info) {
  console.log(info);
  // Check if id exists by finding the student connected to id
  var student;
  try {student = info[id]; }
  catch(err) {//If not, check for backup
    try{student = info[loadBackup()];}
    catch(err) {pageLoadFail();}
  }
  console.log(student);
  console.log(id);
  document.getElementById("slide-1").src = encodeURI(student["Sablay Pic"]);
  document.getElementById("slide-2").src = encodeURI(student["Creative Pic"]);
  document.getElementById("slide-3").src = encodeURI(student["Formal Pic"]);
  document.getElementById("slide-4").src = encodeURI(student["Toga Pic"]);

  document.getElementById("studentName").innerHTML = student["Name"];
  fetch(encodeURI(student["Stylized Name"])).then(i=>{
    console.log(i.status);
    if (i.status != "404") document.getElementById("stylizedName").innerHTML = `<img src="${encodeURI(student["Stylized Name"])}">`;
    else document.getElementById("stylizedName").innerHTML = student["Stylized Name"];
  });

  document.getElementById("quote").innerHTML = student["Quote"];
  document.getElementById("extracurriculars").innerHTML = student["Extracurriculars"];
  document.querySelector("div.writeupSection > p.writeup").innerHTML = student["Writeups"][0];
  document.querySelector("div.writeupSection > p.writerName").innerHTML = `- ${student["Writers"][0]}`;
  if(student["Writers"].length > 1){
    document.querySelector("div.pageTwo > p.writeup").innerHTML = student["Writeups"][1];
    document.querySelector("div.pageTwo > p.writerName").innerHTML = `- ${student["Writers"][1]}`;
  }
  else {document.querySelector("div.pageTwo").innerHTML = "";}
  
}

fetch("../grads/grads.json").then(f => f.text()).then(i => changeStuff(JSON.parse(i)));




window.addEventListener('scroll', reveal);


// What does this do. Please add a comment explaining this function here.
// Girl weren't you the one who added this???
function reveal() { 

  var reveals = document.querySelectorAll('.hidden-content');
  
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;
    
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}