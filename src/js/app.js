import * as THREE from "three"

function nonNegative(x) {
    return x >= 0 ? x : -x
}


class Playground {
    constructor(obs = new Observer()) {
        const canvas = document.getElementById("root").querySelector("canvas")
        const self = this
        this.scene = new THREE.Scene()
        this.observer = obs
        this.renderer = new THREE.WebGLRenderer({
            // antialias: true,
            canvas,
            // alpha: true
        })

        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.render = () => {
            requestAnimationFrame(self.render)

            if(self.observer.keysMap[0])
                self.observer.camera.position.set(
                    self.observer.camera.position.x - Math.sin(self.observer.camera.rotation.y) / 100,
                    0,
                    self.observer.camera.position.z - Math.cos(self.observer.camera.rotation.y) / 100,
                ) 
            if(self.observer.keysMap[1])
                self.observer.camera.rotation.y += .01
            if(self.observer.keysMap[2])
                self.observer.camera.rotation.y -= .01

            self.renderer.render(self.scene, self.observer.camera)
        }

        window.addEventListener("keydown", (e) => {
            e.preventDefault()
            switch(e.key) {
                case "w":
                    self.observer.keysMap[0] = true
                    break
                case "a":
                    self.observer.keysMap[1] = true
                    break
                case "d":
                    self.observer.keysMap[2] = true
                    break
            }
        })
        window.addEventListener("keyup", (e) => {
            e.preventDefault()
            switch(e.key) {
                case "w":
                    self.observer.keysMap[0] = false
                    break
                case "a":
                    self.observer.keysMap[1] = false
                    break
                case "d":
                    self.observer.keysMap[2] = false
                    break
            }
        })
        

        window.addEventListener("resize", () => {
            self.renderer.setPixelRatio(window.innerWidth / window.innerHeight)
            self.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }
}

class Observer {
    constructor(fov = 75) {
        const self = this
        this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)

        this.keysMap = [false, false, false]

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

const playground = new Playground()

const entity = new Entity(
    new THREE.Vector3(0, -1, 0),
    new THREE.Mesh(
        new THREE.BoxGeometry(32, .5, 32),
        new THREE.MeshBasicMaterial({
            color: 0x6666da
        })
    )
)

playground.scene.add(entity.mesh)


for(let i = 1; i <= 4; i++) {
    playground.scene.add((new Entity(    
        new THREE.Vector3(32 * nonNegative(i - 2), 0, 32 * nonNegative(i - 2)),
        new THREE.Mesh(
            new THREE.BoxGeometry(32, 3, 3),
            new THREE.MeshBasicMaterial({
                color: 0xdeeeee
            })
        ),
        nonNegative(i - 2) * Math.PI / 2
    )).mesh)
}



playground.render()