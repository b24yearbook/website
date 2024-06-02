var pageNo = 0;

function setup() {
    // limit view to 12 at a time

    for (let i = 0; i < 12; i++) {
        let gallery = document.getElementById("gallery");

        let item = document.createElement("div");
        item.className = "item";

        let link = document.createElement("a");
        link.href = "batchg_pic.html";

        let picture = document.createElement("img");
        picture.src = "../../resources/img/PLACEHOLDER.png";
        picture.alt = "Batch Picture";
        //picture.className = "picture";

        let pictureName = document.createElement("p");
        pictureName.className = "pictureName";
        pictureName.innerText = "name";

        item.appendChild(link); link.appendChild(picture); item.appendChild(pictureName); gallery.appendChild(item);
    }
}