GRADSJSON = "../grads/grads.json"

//////// LOADER
// loads in data from json to load into the spread

const REF = { // Reference for the student Id matching nth digit to sections
  3:["Diamond", "Emerald", "Garnet", "Jade", "Opal", "Ruby", "Sapphire", "Topaz"],
  4:["Adelfa", "Camia", "Champaca", "Dahlia", "Ilang-Ilang", "Jasmin", "Rosal", "Sampaguita"],
  5:["Beryllium", "Cesium", "Lithium", "Magnesium", "Potassium", "Rubidium", "Sodium", "Strontium"],
  6:["Charm", "Electron", "Gluon", "Graviton", "Muon", "Photon", "Tau", "Truth"],
  7:["A", "B", "C", "D", "E", "F", "G", "H"],
  8:["A", "B", "C", "D", "E", "F", "G", "H"],
  9:["A Santos", "Alcala", "Baltazar", "Banzon", "Cruz", "Del Mundo", "Del Rosario", "Fronda", 
     "G Velasquez", "Gomez", "Juliano", "Ramirez", "Trono", "Velasco", "Vergara", "Zara"]
}

// Get student Id to show the user what they want
var url = window.location.href.split("#")

// Check if the url contains an identifier (#) or is 11 digits (AAA BCD EFG HH)
var id = url.length == 1 || url[1].length != 11 ? null : url[1];
if (id == -1) { // If the id fails the first try, check backup
  id = loadBackup();
  if(! validateID(id)) {
    pageLoadFail();
  }
}

// Get data and do stuff with it
fetch(GRADSJSON).then(f => f.text()).then(i => changeStuff(JSON.parse(i)));

// Loads in the data from grads.json 
async function changeStuff(info) {
  // Check if id exists by finding the student connected to id
  var student = info[id];
  if(typeof(student) == "undefined") student = info[loadBackup()];
  if(typeof(student) == "undefined") pageLoadFail();

  // Change pictures
  document.getElementById("slide-1").src = encodeURI(student["Sablay Pic"]);
  document.getElementById("slide-2").src = encodeURI(student["Creative Pic"]);
  document.getElementById("slide-3").src = encodeURI(student["Formal Pic"]);
  document.getElementById("slide-4").src = encodeURI(student["Toga Pic"]);

  // Change Name
  document.getElementById("studentName").innerHTML = student["Name"];

  // Get Stylized Name (if picture) or if not, set to whatever text is there.
  fetch(encodeURI(student["Stylized Name"])).then(i=>{
    console.log(i.status);
    if (i.status != "404") document.getElementById("stylizedName").innerHTML = `<img src="${encodeURI(student["Stylized Name"])}">`;
    else document.getElementById("stylizedName").innerHTML = student["Stylized Name"];
  });

  // Change the quote, ec's, writeups, etc.
  document.getElementById("quote").innerHTML = student["Quote"];
  document.getElementById("extracurriculars").innerHTML = student["Extracurriculars"];
  document.querySelector("div.writeupSection > p.writeup").innerHTML = student["Writeups"][0];
  document.querySelector("div.writeupSection > p.writerName").innerHTML = `- ${student["Writers"][0]}`;
  if(student["Writers"].length > 1){ //change writeup 2 or set this part to none if there's no second
    document.querySelector("div.pageTwo > p.writeup").innerHTML = student["Writeups"][1];
    document.querySelector("div.pageTwo > p.writerName").innerHTML = `- ${student["Writers"][1]}`;
  }
  else {document.querySelector("div.pageTwo").innerHTML = "";}
  
}

function pageLoadFail() { // If page fails to get data
  var prevPage = window.location.href;
  window.history.back();
  
  //If somehow you can't send the user back, send them to The Graduates
  setTimeout(function(){ 
      if (window.location.href == prevPage) {
          window.location.href = "grads_section.html"; 
      }
  }, 500);
}

function loadBackup() { // Loads the backup student id which is the last student
  return localStorage.getItem("stdId");
}

function validateID(id) { // Check if ID is valid
  if(id==null) return false;

  for(let i = 3; i<9; i++) if (id[i] > 7) return false;
  if(parseInt(id.slice(9)) > 15) return false;
  return true;
}

function convID(id) { // converts ID to sections
  let sections = {};
  for(let i=3; i<9; i++) sections[`Grade ${i+4}`] = REF[i][parseInt(id[i])];
  sections["Silid"] = REF[9][parseInt(id.slice(9))];
  return sections;
}




///// SCROLL CHANGE

// Set scroll function to activate
window.onscroll = function() {scrollFunction()};

// Declaration for HIDE ARROWS
HALeft = document.getElementById("arrowLeft");
HARight = document.getElementById("arrowRight");

// Declaration for GO TO TOP BUTTON
GTTButton = document.querySelector(".sendTopButton")
GTTButton.style.display="block";
GTTBStyle = window.getComputedStyle(GTTButton)
console.log(`HEIGHT ${GTTBStyle.height.replace(/[^\d.]/g,'')} BOTTOM ${GTTBStyle.bottom.replace(/[^\d.]/g,'')}`);
GTTBSize = innerHeight + parseFloat(GTTBStyle.height.replace(/[^\d.]/g,'')) + parseFloat(GTTBStyle.bottom.replace(/[^\d.]/g,''));
GTTButton.addEventListener("click", function(){document.documentElement.scrollTop = 0;});

function scrollFunction() {

  // Hide Arrows
  if (document.documentElement.scrollTop > innerHeight/3) {
    HALeft.className = "arrowLeft vanish";
    HARight.className = "arrowRight vanish";
  } else {
    HALeft.className = "arrowLeft show";
    HARight.className= "arrowRight show";
  }

  // Go to Top button
  doHide = document.documentElement.scrollTop > document.documentElement.scrollHeight - GTTBSize ||
           document.documentElement.scrollTop < innerHeight*1.2
  if (doHide) {GTTButton.style.display = "none"}
  else {GTTButton.style.display = ""}
}