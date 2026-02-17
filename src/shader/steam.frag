uniform float uTime;
varying vec2 vUv;
uniform sampler2D uPerlinTexture;

void main() {
    vec2 steamUv = vUv;
    steamUv.x *= 0.5;
    steamUv.y *= 0.3;
    steamUv.y -= uTime * 0.08;

    float steam = texture2D(uPerlinTexture, steamUv).r;
    steam = smoothstep(0.4, 1.0, steam);
    steam *= smoothstep(0.0, 0.1, vUv.x);
    steam *= smoothstep(1.0, 0.9, vUv.x);
    steam *= smoothstep(0.0, 0.1, vUv.y);
    steam *= smoothstep(1.0, 0.4, vUv.y);

    gl_FragColor = vec4(0.95, 0.95, 0.98, steam);
}