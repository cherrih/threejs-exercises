
function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45, //fov
    window.innerWidth/window.innerHeight, //aspect ratio
    1, // near
    1000 //far clipping plane
  ); 
  var renderer = new THREE.WebGLRenderer();
  // set size of renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('webgl').appendChild(renderer.domElement);
  renderer.render(
    scene,
    camera
  );
}
init();