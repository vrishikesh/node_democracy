let canvas = document.createElement('canvas')
canvas.width = screen.width
canvas.height = screen.height
canvas.id = 'canvas'

document.body.prepend(canvas)

let ctx = canvas.getContext('2d')
let primus = new Primus('ws://localhost:5000')

primus.on('data', function(data) {
    console.log('received data ', data)
    ctx.beginPath();
    ctx.arc(data.x, data.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
})

canvas.addEventListener('click', function(e) {
    primus.write({x: e.x, y: e.y})
})
