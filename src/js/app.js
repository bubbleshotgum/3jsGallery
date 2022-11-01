import * as THREE from "three"
import * as description from "../description.json"
// function loadPictures() {
//     const pictures = []
//     const picturesAmount = 4
//     for (let i = 0; i < picturesAmount; i++)
//         pictures.push(new THREE.TextureLoader().load(`../media/photo${i}.jpg`))
//     return pictures
// }


const descElement = document.querySelector(".Description")
function showDescription(number) {
    descElement.textContent = description[number]
    descElement.style.opacity = 1
    descElement.style.left = "5%"
}
function hideDescription() {
    descElement.style.opacity = 0
    descElement.style.left = "-45%"
    setTimeout(() => { descElement.textContent = "" }, 1500)
}

class Playground {
    constructor(obs = new Observer()) {
        const canvas = document.getElementById("root").querySelector("canvas")
        const descriptionOpenerButton = document.querySelector(".DescriptionOpenerButton")
        const self = this
        
        const mouseCoords = {
            x: 0,
            y: 0
        }
        // this.media = loadPictures()
        // console.log(this.media)
        this.scene = new THREE.Scene()
        
        this.observer = obs
        this.renderer = new THREE.WebGLRenderer({
            // antialias: true,
            canvas,
            // alpha: true
        })

        this.raycaster = new THREE.Raycaster()

        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.render = () => {
            requestAnimationFrame(self.render)

            self.raycaster.setFromCamera({x: 0, y: 0}, this.observer.camera)
            const objs = self.raycaster.intersectObjects(self.scene.children)
            let isWallAlong = false
            for(let obj of objs) {
                if(obj.distance <= .35 && obj.object.name === "Wall") {
                    // console.log("Wall detected")
                    isWallAlong = true
                    break
                } else
                    isWallAlong = false
            }

            if(self.observer.keysMap[0] && !isWallAlong)
                self.observer.camera.position.set(
                    self.observer.camera.position.x - Math.sin(self.observer.camera.rotation.y) * self.observer.speed * (self.observer.keysMap[3] ? self.observer.accelerationSpeed : 1),
                    0,
                    self.observer.camera.position.z - Math.cos(self.observer.camera.rotation.y) * self.observer.speed * (self.observer.keysMap[3] ? self.observer.accelerationSpeed : 1),
                ) 
            if(self.observer.keysMap[1])
                self.observer.camera.rotation.y += self.observer.rotationSpeed
            if(self.observer.keysMap[2])
                self.observer.camera.rotation.y -= self.observer.rotationSpeed

            
            // self.raycaster.setFromCamera(mouseCoords, self.observer.camera)
            let anyPicsFound = false
            for(let pic of picturesMeshes) {
                const intersection = self.raycaster.intersectObject(pic)
                if(intersection.length && intersection[0].distance <= 5) {
                    // console.log(intersection)
                    descriptionOpenerButton.style.opacity = 1
                    descriptionOpenerButton.style.left = `${
                        mouseCoords.x - descriptionOpenerButton.offsetWidth / 2
                    }px`
                    descriptionOpenerButton.style.top = `${
                        mouseCoords.y - descriptionOpenerButton.offsetHeight / 2
                    }px`
                    descriptionOpenerButton.onclick = () => { showDescription(picturesMeshes.indexOf(pic)) }
                    anyPicsFound = true
                    break
                }
            } 
            if(!anyPicsFound)
                setTimeout(() => {
                    descriptionOpenerButton.style.opacity = 0
                    descriptionOpenerButton.onclick = () => {}
                    hideDescription()
                }, 1000)
            
            
            self.renderer.render(self.scene, self.observer.camera)
        }

        const
            forwardButton = document.querySelector(".Forward"),
            leftButton = document.querySelector(".TurnLeft"),
            rightButton = document.querySelector(".TurnRight")

        function fillButtonSvg(button, color) {
            button.querySelector("svg path").setAttribute("fill", color)
        }

        forwardButton.addEventListener("mousedown", () => {
            fillButtonSvg(forwardButton, "red")
            self.observer.keysMap[0] = true
        })
        leftButton.addEventListener("mousedown", () => {
            fillButtonSvg(leftButton, "red")
            self.observer.keysMap[1] = true
        })
        rightButton.addEventListener("mousedown", () => {
            fillButtonSvg(rightButton, "red")
            self.observer.keysMap[2] = true
        })

        forwardButton.addEventListener("mouseup", () => {
            fillButtonSvg(forwardButton, "black")
            self.observer.keysMap[0] = false
        })
        leftButton.addEventListener("mouseup", () => {
            fillButtonSvg(leftButton, "black")
            self.observer.keysMap[1] = false
        })
        rightButton.addEventListener("mouseup", () => {
            fillButtonSvg(rightButton, "black")
            self.observer.keysMap[2] = false
        })

        window.addEventListener("mousemove", (e) => {
            mouseCoords.x = e.clientX
            mouseCoords.y = e.clientY
        })

        window.addEventListener("keydown", (e) => {
            // console.log(e.keyCode)
            switch(e.keyCode) {
                case 17:
                    e.preventDefault()
                    break
                case 87:
                    self.observer.keysMap[0] = true
                    break
                case 65:
                    self.observer.keysMap[1] = true
                    break
                case 68:
                    self.observer.keysMap[2] = true
                    break
                case 16:
                    self.observer.keysMap[3] = true
                    break
            }
        })
        window.addEventListener("keyup", (e) => {
            switch(e.keyCode) {
                case 87:
                    self.observer.keysMap[0] = false
                    // console.log(this.observer.camera.position)
                    // console.log(self.raycaster.intersectObjects(this.scene.children))
                    break
                case 65:
                    self.observer.keysMap[1] = false
                    break
                case 68:
                    self.observer.keysMap[2] = false
                    break
                case 16:
                    self.observer.keysMap[3] = false
                    break
            }
        })
        

        window.addEventListener("resize", () => {
            self.renderer.setPixelRatio(window.innerWidth / window.innerHeight)
            self.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        window.addEventListener("contextmenu", (event) => { event.preventDefault() })
    }
}

class Observer {
    constructor(fov = 75) {
        const self = this

        this.rotationSpeed = 0.01
        this.speed = 0.01
        this.accelerationSpeed = 3
        this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.002, 1000)

        this.keysMap = [false, false, false, false]

        window.addEventListener("resize", () => {
            self.camera.aspect = window.innerWidth / window.innerHeight
            self.camera.updateProjectionMatrix()
        })
    }
}

class Entity {
    constructor(position, mesh, rotationY = 0) {
        this.position = position
        this.mesh = mesh

        this.mesh.position.set(this.position.x, this.position.y, this.position.z)
        this.mesh.rotation.y = rotationY
    }
}

const
    walls = [],
    pictures = [],
    picturesMeshes = []

// class Picture {
//     constructor(position, width, height, pictureNumber, wallNum) {
//         this.position = position
//         this.parent = walls[wallNum]
//         this.mesh = new THREE.Mesh(
//             new THREE.PlaneGeometry(width, height),
//             new THREE.MeshBasicMaterial({
//                 map: new THREE.TextureLoader().load(`/src/media/photo${pictureNumber}.jpg`)
//             })
//         )
//         this.parent.mesh.add(this.mesh)
//         this.mesh.position.set(
//             this.parent.mesh.position.x + this.parent.mesh.geometry.parameters.depth + position.x,
//             this.parent.mesh.position.y + this.parent.mesh.geometry.parameters.height / 2 + position.y,
//             // this.parent.mesh.position.z + this.parent.mesh.geometry.parameters.width + position.z
//             this.parent.mesh.position.z + position.z
//         )
//         console.log(this.mesh.position)
//     }
// }

const playground = new Playground()

const entity = new Entity(
    new THREE.Vector3(0, -1, 0),
    new THREE.Mesh(
        new THREE.PlaneGeometry(32, 32),
        new THREE.MeshBasicMaterial({
            color: 0x6666da
        })
    )
)
entity.mesh.rotation.x = - Math.PI / 2
entity.mesh.name = "Plane"
playground.scene.add(entity.mesh)


const wall = new Entity(
    new THREE.Vector3(0, .5, -7.45),
    new THREE.Mesh(
        new THREE.BoxGeometry(32, 3, 3),
        new THREE.MeshBasicMaterial({
            color: 0x6336da
        })
    )
)
wall.mesh.name = "Wall"
playground.scene.add(wall.mesh)
walls.push(wall)

for(let i = 0; i < 4; i++) {
    const coords = {x: -6, z: -5.9}
    const width = 3
    const height = 2
    const picture = new Entity(    
        // new THREE.Vector3(8 * nonNegative(i - 2), 0, 8 * nonNegative(i - 2)),
        
        new THREE.Vector3(
            coords.x + i * (width + .5),
            .25,
            // entity.mesh.position.y + height / 2,
            coords.z),
        new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({
                // color: 0xdeeeee
                map: new THREE.TextureLoader().load(`/src/media/photo${i + 1}.jpg`)
            })
        )
        // nonNegative(i - 2) * Math.PI / 2
    )
    picture.mesh.name = "Picture"
    pictures.push(picture)
    picturesMeshes.push(picture.mesh)
    playground.scene.add(picture.mesh)
}

// const pic1 = new Picture(
//     new THREE.Vector3(.1, -.5, 0),
//     3,
//     4,
//     1,
//     0
// )

playground.render()