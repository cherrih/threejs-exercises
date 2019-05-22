# threejs-exercises

#### Scene object
Container for every other 3D object. Represents the world you will be building.

#### Camera
Eyes we will be seeing the 3D world through. Requires several options.
- FOV
- Aspect ratio
- near and far clipping planes (anything beyond these distances won't be seen)

#### Renderer
Converts 3D data to 2D image. We will use WebGL renderer. Can use others eg canvas or SVG, but end user experience not as great
