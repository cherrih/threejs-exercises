
function init() {
  var scene = new THREE.Scene();

  var box = getBox(1,1,1);
  var plane = getPlane(4);
  // radians not angles 
  plane.rotation.x = Math.PI / 2;
  box.position.y = box.geometry.parameters.height/2;

  scene.add(box);
  scene.add(plane);

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
  // set size of renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('webgl').appendChild(renderer.domElement);
  renderer.render(
    scene,
    camera
  );
}
function getBox(w,h,d) {
  var geometry = new THREE.BoxGeometry(w,h,d);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00fff0
  });
  return new THREE.Mesh(
    geometry,
    material
  );
}
function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size,size);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
  });
  return new THREE.Mesh(
    geometry,
    material
  );
}
init();