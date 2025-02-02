attribute vec3 aSquareVertexPosition; // Expects one vertex position
attribute vec2 aTextureCoordinate;
// texture coordinate that will map the entire image to the entire square
varying vec2 vTexCoord;
// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;
void main(void) {
 gl_Position = uViewProjTransform * uModelTransform *
 vec4(aSquareVertexPosition, 1.0);

 // pass the texture coordinate to the fragment shader
 vTexCoord = aTextureCoordinate;
}