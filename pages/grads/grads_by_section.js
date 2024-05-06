
function pageChange(section, grade) {
    localStorage.setItem("section", section);
    localStorage.setItem("grade", grade);
    window.location.href = "grads_section.html";
}