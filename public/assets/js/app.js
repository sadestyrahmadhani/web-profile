$(function(){
    navbarActive()
    ballAnimation()
    
    $(window).scroll(function(){
        navbarFixed()
        navbarActive()
    })
    
    $('.navbar a.nav-link').on('click', function(e){
        e.preventDefault()
    
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        })
    })
})

function navbarFixed() {
    if($(this).scrollTop() > 100){
        $('.navbar').addClass('navbar-fixed shadow')
    } else {
        $('.navbar').removeClass('navbar-fixed shadow')
    }
}

function navbarActive() {
    if($(this).scrollTop() > $('#about').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#about"]').parent().addClass('active')
        $('#renderThreeJS').addClass('opacity-0')
    }

    if($(this).scrollTop() > $('#education').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#education"]').parent().addClass('active')
        $('#renderThreeJS').removeClass('opacity-0')
    }
    
    if($(this).scrollTop() > $('#skill').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#skill"]').parent().addClass('active')
    }
    
    if($(this).scrollTop() > $('#project').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#project"]').parent().addClass('active')
        $('#renderThreeJS').addClass('opacity-0')
    }

    if($(this).scrollTop() > $('#contact').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#contact"]').parent().addClass('active')
        $('#renderThreeJS').addClass('opacity-0')
    }

    if($(this).scrollTop() < $('#about').offset().top - 130){
        $('.navbar').find('.active').removeClass('active')
        $('a[href="#home"]').parent().addClass('active')
        $('#renderThreeJS').addClass('opacity-0')
    }
}

var i = 0, idx = 0;
var text = ["Graphich Designer", "Video Editor"];
var speed = 50;
function typingText(){
    if(idx >= text.length) idx = 0;

    document.getElementById("typingText").innerHTML += text[idx].charAt(i);
    i++;
    
    if(i > text.length + 50){
        document.getElementById("typingText").innerHTML = "";
        i = 0;
        idx++;
    }
   
    setTimeout(typingText, 50);
}
 
setTimeout(typingText, 200);

function ballAnimation() {
    var canvas = document.getElementById('ballsAnimation')
    canvas.width = document.getElementById('education').offsetWidth - 5
    canvas.height = document.getElementById('education').offsetHeight
    var ctx = canvas.getContext('2d')

    var balls = [
        new balls(100, 200, 4, .5, 50, 'rgb(250, 200, 60)'),
        new balls(300, 300, 1, 2, 70, 'rgb(50, 200, 160)'),
        new balls(200, 100, 3, 1, 90, 'rgb(80, 100, 200)'),
        new balls(100, 200, -5, 2, 30, 'rgb(110, 200, 210)'),
        new balls(100, 200, 1, -5, 50, 'rgb(50, 200, 160)'),
        new balls(300, 300, 2, 3, 70, 'rgb(250, 90, 60)'),
        new balls(200, 100, 3, 1, 90, 'rgb(80, 100, 200)'),
        new balls(100, 200, -1, -2, 30, 'rgb(215, 110, 50)'),
    ]

    function draw() {
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = .5
    
        for(ball of balls) {
            ball.animasi()
        }
    
        ctx.restore()
    }
    
    setInterval(draw, 10)
    
    function balls(x, y, dx, dy, r, color)
    {
        this.animasi = function() {
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(x, y, r, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.closePath()
    
            x += dx
            y += dy
    
            if(x + r > canvas.width){
                dx--
            }
    
            if(x < r){
                dx++
            }
    
            if(y + r > canvas.height){
                dy--
            }
    
            if(y < r){
                dy++
            }
        }
    }
}

$(window).on('load', function(){
    $('.loader .hide1').addClass('hideDown')
    $('.loader .hide2').addClass('hideUp')
    $('.loader').addClass('hide')
})

function objek3D() {
    const scene = new THREE.Scene()
    const el = document.getElementById('renderThreeJS')
    const camera = new THREE.PerspectiveCamera(75, el.offsetWidth / el.offsetHeight, 0.1, 1000)
    camera.position.z = 5

    const geometryAngkasa = new THREE.SphereGeometry(5, 30, 30)
    const textureAngkasa = new THREE.TextureLoader().load('https://i.ibb.co/B4RGM3d/pexels-kai-pilger-1341279-1.jpg')
    const materialAngkasa = new THREE.MeshBasicMaterial({
        map: textureAngkasa,
        side: THREE.BackSide
    })
    const meshAngkasa = new THREE.Mesh(geometryAngkasa, materialAngkasa)
    scene.add(meshAngkasa)

    const bumpGeometry = new THREE.SphereGeometry(1, 20, 20)
    const textureBump = new THREE.TextureLoader().load('assets/images/marssurface.jpg')
    const bumpMaterial = new THREE.MeshPhongMaterial({
        map: textureBump,
        shininess: 80,
        bumpMap: textureBump,
        bumpScale: 0.010
    })
    const meshBump = new THREE.Mesh(bumpGeometry, bumpMaterial)
    scene.add(meshBump)

    const light = new THREE.PointLight(0xffffff, 1.1)
    light.position.set(-40, 25, 10)
    scene.add(light)
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    el.appendChild(renderer.domElement)

    function draw() {
        meshBump.rotation.x += 0.005
        meshBump.rotation.y += 0.005
        meshAngkasa.rotation.x += 0.0001
        meshAngkasa.rotation.y += 0.0001

        renderer.render(scene, camera)
        requestAnimationFrame(draw)
    }
    
    draw()
}

objek3D()

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);