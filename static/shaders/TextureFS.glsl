precision mediump float; // precision for floating point computation
// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler;
// Color of pixel
uniform vec4 uPixelColor;
// The "varying" keyword is for signifing that the texture coordinate will be
// interpolated and thus varies.
varying vec2 vTexCoord;

void main(void) {
	// Texel color look up based on interpolated UV value in vTexCoord
	vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));

	// tint the textured area. Leave transparent area as defined by the texture
	vec3 r = vec3(c) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
	vec4 result = vec4(r, c.a);
	gl_FragColor = result;
}