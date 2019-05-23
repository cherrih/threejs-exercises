
function init() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  // var box = getBox(1,1,1);
  var plane = getPlane(40);
  var spotLight = getSpotLight(1);
  var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 1.5);

  plane.name = 'plane-1';
  // box.name = 'box-1';

  // radians not angles 
  plane.rotation.x = Math.PI / 2;
  // box.position.y = box.geometry.parameters.height/2;
  spotLight.position.y = 4;
  spotLight.intensity = 2;

  // plane.position.y = 1;

  gui.add(spotLight, 'intensity', 0, 10);
  gui.add(spotLight.position, 'y', 0, 20);
  gui.add(spotLight.position, 'z', 0, 20);
  gui.add(spotLight.position, 'x', 0, 20);
  gui.add(spotLight, 'penumbra', 0, 1);

  // scene.add(box);
  scene.add(plane);
  spotLight.add(sphere);
  scene.add(spotLight);
  scene.add(boxGrid);

  var camera = new THREE.PerspectiveCamera(
    45, //fov
    window.innerWidth/window.innerHeight, //aspect ratio
    1, // near
    1000 //far clipping plane
  ); 
  camera.position.z = 5;
  camera.position.x = 1;
  camera.position.y = 2;

  camera.lookAt(new THREE.Vector3(0,0,0))

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  // set size of renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('rgb(120,120,120)');
  document.getElementById('webgl').appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);
  return scene;
}

function getBox(w,h,d) {
  var geometry = new THREE.BoxGeometry(w,h,d);
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(120,120,120)'
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  mesh.castShadow = true;
  return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 1, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size,size);
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(120,120,120)',
    side: THREE.DoubleSide
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  mesh.receiveShadow = true;
  return mesh;
}

function getSphere(radius) {
  var geometry = new THREE.SphereGeometry(radius, 24, 24);
  var material = new THREE.MeshBasicMaterial({
    color: 'rgb(255, 255, 255)'
  });
  return new THREE.Mesh(
    geometry,
    material
  );
}

function getPointLight(intensity) {
  var light = new THREE.PointLight(0xffffff, intensity);
  light.castShadow = true;

  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  return light;
}

function getSpotLight(intensity) {
  var light = new THREE.SpotLight(0xffffff, intensity);
  light.castShadow = true;
  return light;
}

function update(renderer, scene, camera, controls) {
  renderer.render(
    scene,
    camera
  );
  //activate orbit controls
  controls.update();

  // ANIMATIONS
  // var plane = scene.getObjectByName('plane-1');
  // plane.rotation.y += 0.001;
  // plane.rotation.z += 0.001;
  // var box = scene.getObjectByName('box-1');
  // box.rotation.y -= 0.001;
  // box.rotation.z -= 0.001;

  // scene.traverse(child => {
  //   child.scale.x += 0.001;
  // })

  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  })
}

var scene = init();