const cpbtn = document.querySelector("#color-picker");
const clear = document.querySelector(".clear-all");
const value = document.querySelectorAll(".value");
const rect = document.querySelectorAll(".rect");
const pickedColor = [];

const activeEyeDropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex)
        pickedColor.push(sRGBHex);
        for (let i = 0; i < value.length; i++){
            value[i].innerText = pickedColor[i];
            rect[i].style.background = pickedColor[i];
            if (value.length < pickedColor.length) {
                pickedColor.reduce;
                i = 0;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

cpbtn.addEventListener("click", activeEyeDropper);
clear.addEventListener("click", () => {
    for (let i = 0; i < value.length; i++){
        value[i].innerText = '';
        rect[i].style.background = '#fff';
    }
});