import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from "three"
import * as TWEEN  from "@tweenjs/tween.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function App() {

  useEffect(() => {
    const scene = new THREE.Scene();
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);


      const tween = new TWEEN.Tween(cubeMesh.position)
      .to({ x: 5, y: 0, z: 0 }, 2000)
      .easing(TWEEN.Easing.Out)
      .delay(2000)
      .repeat(Infinity)
      .start()


      const tween2 = new TWEEN.Tween(cubeMesh.rotation)
      .to({ x: Math.PI, y: Math.PI, z: Math.PI }, 2000) 
      .easing(TWEEN.Easing.Quadratic.Out) 
      .delay(2000)
      .repeat(Infinity)
      .yoyo(true)
      .start()
    
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper)

    
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 30);
    camera.position.z = 5;
    camera.aspect = window.innerWidth / window.innerHeight;

    const canvas = document.querySelector(".threejs")

    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)

    const maxPixelRatio = Math.min(window.devicePixelRatio, 2); 
    renderer.setPixelRatio(maxPixelRatio); 

    const control = new OrbitControls(camera, canvas)
    control.enableDamping = true;
    // control.autoRotate = true;

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    })



    const renderLoop = () => {
      tween.update();
      tween2.update();
      control.update()
      renderer.render(scene, camera)
      requestAnimationFrame(renderLoop)
    }
    renderLoop();


  }, [])

  return (
    <div><canvas className='threejs'></canvas></div>
  )
}

export default App
