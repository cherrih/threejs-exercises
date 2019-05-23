
function init() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();
  var clock = new THREE.Clock();

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  // var box = getBox(1,1,1);
  var plane = getPlane(40);
  var directionalLight = getDirectionalLight(1);
  var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 1.5);
  var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
  var ambientLight = getAmbientLight(1);

  plane.name = 'plane-1';
  boxGrid.name = 'boxGrid';
  // box.name = 'box-1';

  // radians not angles 
  plane.rotation.x = Math.PI / 2;
  // box.position.y = box.geometry.parameters.height/2;
  directionalLight.position.y = 10;
  directionalLight.position.x = 13;
  directionalLight.position.z = 10;

  directionalLight.intensity = 2;

  // plane.position.y = 1;

  gui.add(directionalLight, 'intensity', 0, 10);
  gui.add(directionalLight.position, 'y', 0, 20);
  gui.add(directionalLight.position, 'z', 0, 20);
  gui.add(directionalLight.position, 'x', 0, 20);
  // gui.add(spotLight, 'penumbra', 0, 1);

  // scene.add(box);
  scene.add(plane);
  directionalLight.add(sphere);
  scene.add(directionalLight);
  scene.add(boxGrid);
  scene.add(helper);
  scene.add(ambientLight);

  var camera = new THREE.PerspectiveCamera(
    45, //fov
    window.innerWidth/window.innerHeight, //aspect ratio
    1, // near
    1000 //far clipping plane
  ); 
  camera.position.z = 20;
  camera.position.x = 20;
  camera.position.y = 10;

  camera.lookAt(new THREE.Vector3(0,0,0))

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  // set size of renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('rgb(120,120,120)');
  document.getElementById('webgl').appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls, clock);
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
function getDirectionalLight(intensity) {
  var light = new THREE.DirectionalLight(0xffffff, intensity);
  light.castShadow = true;
  // increase beyond default values
  light.shadow.camera.left = -10;
  light.shadow.camera.bottom = -10;
  light.shadow.camera.right = 10;
  light.shadow.camera.top = 10;

  return light;
}

function getAmbientLight(intensity) {
  var light = new THREE.AmbientLight('rgb(10, 30, 50)', intensity);
  return light;
}

function update(renderer, scene, camera, controls, clock) {
  renderer.render(
    scene,
    camera
  );

  //activate orbit controls
  controls.update();

  var timeElapsed = clock.getElapsedTime();

  var boxGrid = scene.getObjectByName('boxGrid');
  boxGrid.children.forEach(child => {
    child.scale.y = Math.sin(timeElapsed);
    child.position.y = child.scale.y / 2;
  })  

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
    update(renderer, scene, camera, controls, clock);
  })
}

var scene = init();