const canvas = document.getElementById("game")
canvas.width = 500;
canvas.height = 500;
const g = canvas.getContext('2d')
const scale = 20;
let mc = {x: 250, y: 270}
let health = 100;
let hunger = 100;
let arah = "kanan";
let pju = mc.x + 20
let peluru = {r: [], l: []}

function draw() {
    g.clearRect(0, 0, canvas.width, canvas.height)
    g.fillStyle = "black"
    g.font = "24px Arial"
    g.textBaseline = "top"
    g.textAlign = "left"
    g.fillText(`❤ ${health}`, 10, 10)
    g.fillText(`🍗${hunger}`, 8, 35)
    g.fillStyle = "green"
    g.fillRect(0, 300, canvas.width, canvas.height)
    g.fillStyle = "rgb(58, 16, 2)"
    g.fillRect(0, 320, canvas.width, canvas.height)
    g.fillStyle = "rgb(71, 71, 71)"
    g.fillRect(mc.x, mc.y, 20, 30)
    g.beginPath();
    g.arc(mc.x + 10, mc.y + 2, 10, 0, 2 * Math.PI);
    g.fill();
    if(mc.x == canvas.width) {
        mc.x = 10
    } else if (mc.x == 0) {
        mc.x = canvas.width - 10
    } 
    if (arah === "kanan") {
        g.beginPath();
        g.fillStyle = "white"
        g.arc(mc.x + 15, mc.y + 5, 2, 0, 2 * Math.PI);
        g.fill();
    } else if (arah === "kiri") {
        g.beginPath();
        g.fillStyle = "white"
        g.arc(mc.x + 5, mc.y + 5, 2, 0, 2 * Math.PI);
        g.fill();
    }
    if (peluru.r.length > 0) {
        for (let i = 0; i < peluru.r.length; i++) {
            g.fillStyle = "yellow"
            g.fillRect(peluru.r[i].x, peluru.r[i].y, 10, 2)
            peluru.r[i].x += 10 
            if (peluru.r[i].x > canvas.width || peluru.r[i].x < 0) {
                peluru.r.splice(i, 1)
                i--
            }
        }
    }
    if (peluru.l.length > 0) {
        for (let i = 0; i < peluru.l.length; i++) {
            g.fillStyle = "yellow"
            g.fillRect(peluru.l[i].x, peluru.l[i].y, 10, 2)
            peluru.l[i].x -= 10 
            if (peluru.l[i].x > canvas.width || peluru.l[i].x < 0) {
                peluru.l.splice(i, 1)
                i--
            }
        }
    }
}

document.addEventListener("keydown", (e) => {
    console.log(e.key)
    switch (e.key) {
        case "ArrowRight":
            mc.x += 10
            arah = "kanan"
        break;
        case "ArrowLeft":
            arah = "kiri"
            mc.x -= 10
        break;
        case " ":
            if(arah === "kanan") {
                peluru.r.push({x: mc.x + 20, y: mc.y + 12})
            } else
            peluru.l.push({x: mc.x - 15, y: mc.y + 12})
        break;
    }
})

function loop() {
    draw()
    requestAnimationFrame(loop)
}

loop()