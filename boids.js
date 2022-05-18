var canvas = document.getElementById('boids-canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener("mousemove", function(event) {
  attract = [event.clientX, event.clientY]
});

window.addEventListener("click", function(event) {
  boids.push([event.clientX, event.clientY])
  document.getElementById("boidCount").innerText = "Flock size: " + boids.length
});

function help() {
  Swal.fire(
    'Boids',
    'Click to generate more followers, and move your mouse around to lead.',
    'info'
  )
}

var boids = []
var attract = [canvas.width/2, canvas.height/2]
const boidsRadius = 10
let lastUpdate
function animate() {
  requestAnimationFrame(animate)
  var now = Date.now();
  var dt = (now - lastUpdate)/30;
  lastUpdate = now;
  ctx.fillStyle = `white`
  ctx.fillRect(0, 0, canvas.width, canvas.height)


  ctx.fillStyle = "blue"
  ctx.beginPath()
  ctx.arc(attract[0], attract[1], boidsRadius, 0, 2*Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  boids.forEach((boid, index) => {
    ctx.lineWidth = '10'
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(boid[0], boid[1], boidsRadius, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    iter = 0
    while (true) {
      degree = Math.atan2(attract[1] - boid[1], attract[0] - boid[0]) + (Math.random() < 0.5 ? -1 : 1) * Math.random() * (Math.sqrt((boid[0] - attract[0])**2 + (boid[1] - attract[1])**2) < boidsRadius*3 ? 5 : 1)
      broken = false
      for (i=0; i<index; i++) {
        if (Math.sqrt(((boid[0] + Math.cos(degree))*5 - boids[i][0])**2 + ((boid[1] + Math.sin(degree))*5 - boids[i][1])**2) > boidsRadius*2) {
          broken = true
          break
        }
      }
      if (!broken || iter > 100) {
        boid[0] += (Math.cos(degree)*(Math.sqrt((boid[0] - attract[0])**2 + (boid[1] - attract[1])**2) < boidsRadius*3 ? 3 : 5))*dt
        boid[1] += Math.sin(degree)*(Math.sqrt((boid[0] - attract[0])**2 + (boid[1] - attract[1])**2) < boidsRadius*3 ? 3 : 5)*dt
        break
      }
      iter += 1
    } 
  })
}

animate()
