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

#### 3D objects
Made up of a geometry that defines the shape of the object, and the material that defines the surface quality/the appearance of the object

#### Materials
Determine how an object reacts to the scene lighting. Default is mesh basic and is not effected by scene lighting at all.

#### LookAt
Method on the camera which determines which point on the scene the camera is looking at

#### Continuous rendering cycle
Allows for animations. Request animation frame.

#### Object3d Add Method
Sets up a parent-child relationship between objects
- Children will share transformation of parent objects

#### Traverse method
Executes a function on all the children of an object

#### Fog property
Allows the scene to fade off to a given color

#### Lights
- PointLight: Emitted from a single point in space in all directions. Like a lightbulb (dimensionless)
- Spotlight: Control softness of edge with 'penumbra' (dimensionless)
- Directional: Emit parallel light rays. Great for simulating far away light sources eg the sun
- Ambient: Lights all objects in the scene equally. Doesn't have any direction and doesn't cast any shadows
- RectAreaLight: Made up of 2D light sources that are more realistic than PointLight sources. 

#### Shadows
To render shadows in your scene you need to configure it on the lights, objects, and camera. Need to have object and light cast shadow and plane receive shadow

#### Group
Non-geometric object used for organizing other objects together

### Animation
#### Clock object
Tracks the time in the Three.js application