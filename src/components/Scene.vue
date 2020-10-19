<template>
    <div class="scene__container" ref="scene_container" @click="zoomIn()">
        <section class="scene" ref="scene"></section>
    </div>
</template>

<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { TweenMax } from 'gsap';
    const OrbitControls = require('three-orbitcontrols');
  
    export default {
        name: 'Scene',
        props: [
            'model_url',
            'index'
        ],
        data() {
            return {
                container: null,
                camera: null,
                controls: null,
                scene: null,
                renderer: null,
                renderer_width: 600,
                renderer_height: 600,
                model: null,
                duration: 0.25
            }
        },
        watch: {
            '$store.state.zoom.status': function(status) {
                if (status == false && this.$store.getters.getZoomIndex === this.index) {
                    this.zoomOut();
                } 
            }
        },
        methods: {
            init() {
                this.container = this.$refs.scene;
                
                this.scene = new THREE.Scene();
                
                this.createCamera();
                this.createControls();
                this.createLights();
                this.createRenderer();
                this.loadObject();
                
                this.renderer.setAnimationLoop(() => {
                    this.update();
                    this.render();
                })

                window.addEventListener( 'resize', this.resizeWindowHandler, false );
            },
            createCamera() {
                this.camera = new THREE.PerspectiveCamera( 45, this.renderer_width / this.renderer_height, 1, 100 );
                this.camera.position.set( 1, 1, 2 );
            },
            createControls() {
                this.controls = new OrbitControls( this.camera, this.container );
                this.controls.enableZoom = false;
                this.controls.enablePan = false;
                this.controls.enableDamping = true;
                this.controls.dampingFactor = 0.12;
                this.controls.enabled = false;
            },
            createLights() {
                let ambLight = new THREE.AmbientLight( 0xffffff, 1 );

                let hemiLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
                hemiLight.color.setHSL( 0.6, 1,1 );
                hemiLight.groundColor.setHSL( 0.095, 1, 0.35 );

                let dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
                dirLight.color.setHSL( 0.1, 1, 0.95 );
                dirLight.position.set( -1, 1.75, 2 );
                dirLight.position.multiplyScalar( 30 );
    
                this.scene.add( ambLight, hemiLight, dirLight );
            },
            createRenderer() {
                this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
                this.renderer.setSize( this.renderer_width, this.renderer_height );
                this.renderer.setPixelRatio( window.devicePixelRatio );
                this.renderer.gammaInput = true;
                this.renderer.physicallyCorrectLights = true;
                this.renderer.gammaOutput = true;
                this.renderer.gammaFactor = 2.0;
                this.renderer.toneMappingExposure = 0.9;

                this.container.appendChild( this.renderer.domElement );
            },
            loadObject() {
                let textureLoader = new THREE.TextureLoader();

                let envMap = textureLoader.load( '/static/env/short_tunnel_1k.png' );
                envMap.encoding = THREE.RGBM16Encoding;
                envMap.format = THREE.RGBAFormat;
                envMap.mapping = THREE.EquirectangularReflectionMapping;
                envMap.magFilter = THREE.LinearFilter;
                envMap.minFilter = THREE.LinearMipmapLinearFilter;

                let encoding = THREE.sRGBEncoding;
     
                const loader = new GLTFLoader();

                loader.load(
                    this.model_url,
                    (gltf) => {
                        gltf.scene.traverse( ( child ) => {
                            if ( child.isMesh ) {
                                child.material.map.encoding = encoding;
                                child.material.envMap = envMap;
                                child.material.map.needsUpdate = true;
                                child.material.needsUpdate = true;
                            }
                        } )
                        gltf.scene.scale.set( 0.75, 0.75, 0.75 );
                        gltf.scene.position.set( 0, 0, 0 );

                        this.model = gltf.scene;

                        this.scene.add( gltf.scene );
                    }
                );
            },
            update() {
                this.controls.update();
            },
            render() {
                this.renderer.render( this.scene, this.camera );
            },
            resizeWindowHandler() {
                this.camera.aspect = this.renderer_width / this.renderer_height;
                this.camera.updateProjectionMatrix();
                this.camera.zoom = 1;

                this.renderer.setSize( this.renderer_width, this.renderer_height );
            },
            zoomIn() {
                this.$store.commit('changeZoom', {
                    status: true,
                    index: this.index
                });

                TweenMax.to(this.$refs.scene_container, this.duration, {
                    width: 600,
                    height: 600,
                    top: 120,
                    left: 0,
                    ease: 'sine.out',
                    onComplete: () => {
                        this.controls.enabled = true;
                    }
                });
                
                TweenMax.to(this.model.scale, this.duration, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'sine.out'
                });
            },
            zoomOut() {
                TweenMax.to(this.$refs.scene_container, this.duration, {
                    width: 400,
                    height: 400,
                    top: 'auto',
                    left: 'auto',
                    ease: 'sine.out',
                    delay: this.duration,
                    onComplete: () => {
                        this.controls.enabled = false;
                    }
                });
                
                TweenMax.to(this.model.scale, this.duration, {
                    x: 0.75,
                    y: 0.75,
                    z: 0.75,
                    ease: 'sine.out',
                    delay: this.duration,
                    onComplete: () => {
                        let currentSpherical = new THREE.Spherical().setFromVector3( new THREE.Vector3( this.camera.position.x, this.camera.position.y, this.camera.position.z ) );
                        let nextSpherical = new THREE.Spherical().setFromVector3( new THREE.Vector3( 1, 1, 2 ) );

                        TweenMax.to(currentSpherical, this.duration, {
                            radius: nextSpherical.radius,
                            phi: nextSpherical.phi,
                            theta: nextSpherical.theta,
                            ease: 'sine.out',
                            onUpdate: () => {
                                this.camera.position.setFromSpherical( currentSpherical );
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss">

.scene__container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    position: absolute;
    overflow: hidden;
    cursor: pointer;
}

.scene {
    width: 600px;
    height: 600px;
}
  

</style>
