const cpbtn = document.querySelector("#color-picker");
const clear = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");

const copyColor = elem  => {
    navigator.clipboard.writeText(elem.dataset.color)
    elem.innerText = "copied";
    setTimeout(() => {
        elem.innerText = elem.dataset.color;
        
    }, 1000);
}

const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const showColors = () => {
    if(!pickedColors.length) return;
    colorList.innerHTML = pickedColors.map(color => `
    <li class="color">
    <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#cccccc" : color}"></span>
    <span class="value" data-color="${color}">${color}</span>
    </li>`).join("");
    const color = document.querySelectorAll(".color");
    color.forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    })
    document.querySelector(".picked-colors").classList.remove("hide")
}
showColors();

const activeEyeDropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex)
        
        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
            showColors();
            
        }
        
    } catch (error) {
        console.log(error);
    }
}

const clearAllColor = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

cpbtn.addEventListener("click", activeEyeDropper);
clear.addEventListener("click", clearAllColor);