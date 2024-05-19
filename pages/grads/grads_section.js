function pageChange(name) {
    localStorage.setItem("name", name);
    window.location.href = "../indiv_spread/indiv_spread.html";
}

function lowerConnect(str, lower=true, joiner="") {
    if(lower) return str.charAt(0).toLowerCase() + str.replaceAll(/[,.-\s]/g, "").slice(1);
    else return str.replaceAll(/[,.-\s]/g, "");
}

let section = localStorage.getItem("section");
let grade = localStorage.getItem("grade");
let test;
async function changeStuff(info) {
    gradeId = grade != "SYP" ? lowerConnect(grade) : "syp";
    document.getElementById("sectionName").innerHTML = `<img src="${gradeId}${lowerConnect(section, false)}.png">${section}`;
    let students = info[grade][section];
    test = students;

    let studentsDiv = document.getElementById("students");
    
    let grads = await fetch("grads.json").then(f => f.text()).then(i => JSON.parse(i)["Students"]);

    console.log(grads)
    students.forEach(s =>{
        let sDiv = document.createElement("div");
        sDiv.className = "student";
        sDiv.id = lowerConnect(s);
        sDiv.setAttribute("onclick", `pageChange("${s}")`);

        let profile = document.createElement("img");
        profile.className = "studentProfile";
        try {image = grads[s]["Picture 1"]}
        catch(err) {image = "error404.png"}
        profile.src = image;

        let name = document.createElement("p");
        name.className = "studentName";
        name.textContent = s;

        sDiv.appendChild(profile); sDiv.appendChild(name);
        studentsDiv.appendChild(sDiv);
    })
}

fetch("grads_section.json").then(f => f.text()).then(i => changeStuff(JSON.parse(i)));