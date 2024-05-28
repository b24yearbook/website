// Helper function for changing how strings look, used in making html ids or classes
function lowerConnect(str, lower=true, joiner="") {
    if(lower) return str.charAt(0).toLowerCase() + str.replaceAll(/[,.-\s]/g, "").slice(1);
    else return str.replaceAll(/[,.-\s]/g, "");
}

// Function run when a student is clicked. Sets localstorage as backup
function pageChange(stdNo) {
    localStorage.setItem("stdNo", stdNo);
    window.location.href = `../indiv_spread/indiv_spread.html#${stdNo}`;
}

// Function run if the siteId is invalid, checks for what the last valid url was
// Technically the user could edit their localstorage... but like, why would they?
// If ever that happens, see exception statements in function changeStuff
function loadBackup() {
    return [localStorage.getItem("section"), localStorage.getItem("grade")];
}

///////////////////////////
// RUNNING CODE

// Get site ID to show the user what they want
url = window.location.href.split("#")
siteId = url.length > 1 ? url[1] : -1;
if (siteId == -1) { // If the site ID doesn't contain an identifier (#), check backup
    let backup = loadBackup();
    var section = backup[0]; 
    var grade = backup[1];
}
else { // Otherwise continue as normal. Assumes siteId is of form AaBB..., 
       // where A is a number from 7 to 12, BB... is the section
    var section = siteId[0] == "1"? siteId.slice(2) : siteId.slice(1);
    var grade = `Grade ${siteId[0] == "1"? siteId.slice(0, 2) : siteId[0]}`;
}

// debug
var test;

// asynchronous function declaration, uses grads_section.json as info
async function changeStuff(info) { // changes the html contents with student info
    // Initially, check if the grade and section is available in the json
    // Filters out any incorrect links
    try{var students = info[grade][section]; test = info;}
    catch(err){
        console.log(err)
        // If fail, go to backup
        try{
            [section, grade] = loadBackup();
            var students = info[grade][section]; test = info;
        }
        catch(err) { //If still fails, send user back
            var prevPage = window.location.href;
            window.history.back();
            
            //If somehow you can't send the user back, send them to The Graduates
            setTimeout(function(){ 
                if (window.location.href == prevPage) {
                    window.location.href = "grads_by_section.html"; 
                }
            }, 500);
        }
    }
    
    // First, set the inner HTML of the section header. A bit messy but the image is 
    // written in plain html here, right next to the actual section name
    document.getElementById("sectionName").innerHTML = 
        `<img class="sectionIcon" alt="${grade} ${section} Icon" ` +
        `src="../../resources/img/icons/${grade.replace(" ", "%20")}/${section}.png">` + 
        `${grade.split(" ")[1]} - ${section}`;

    // Initialize the section that contains all the students
    let studentsDiv = document.getElementById("students");
    
    // Get the list of ALL students since we need the
    // Thumbnail(one of the four pics) and Name of the students in the section 
    // since we only have their student ids
    let grads = await fetch("grads.json").then(f => f.text()).then(i => JSON.parse(i));

    //debug
    console.log(grads)

    // Start creating all the elements containing students
    let counter = 1;
    students.forEach(s =>{
        // link wrap so you can see where the link goes on desktop
        let aWrap = document.createElement("a");
        aWrap.href = "../indiv_spread/indiv_spread.html#" + s;
        aWrap.setAttribute("onclick", `pageChange("${s}")`);

        let sDiv = document.createElement("div");
        sDiv.className = "student";
        sDiv.id = lowerConnect(s);

        let profile = document.createElement("img");
        profile.className = "studentProfile";
        try {image = grads[s]["Toga Pic"]}
        catch(err) {image = "../../resources/img/PLACEHOLDER.png"} //handle this error properly in the future
        profile.src = image;

        let name = document.createElement("p");
        name.className = "studentName";
        console.log(s);
        // placeholder is for debug
        name.textContent = s != "Placeholder" ? grads[s]["Name"].split(",")[0] : `Student ${counter}`;

        sDiv.appendChild(profile); sDiv.appendChild(name); aWrap.appendChild(sDiv);
        studentsDiv.appendChild(aWrap);
        counter ++;
    })
}

// actual running code of that async function changeStuff()
fetch("grads_section.json").then(f => f.text()).then(i => changeStuff(JSON.parse(i)));