let fox = document.getElementById('fox');
let rect = fox.getBoundingClientRect();

console.log(rect.top,rect.left)

let marginLeftSquare = 0
let marginLeftCircle = 0

setInterval(() => {
    marginLeftSquare += 2;
    fox.style.marginLeft = `${marginLeftSquare}px`

},50);
