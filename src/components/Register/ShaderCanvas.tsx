import { useEffect, useRef } from "react";

export default function ShaderCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf = 0;
    const syncSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    };
    const ro = new ResizeObserver(syncSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    syncSize();
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;
    const vs = `attribute vec2 a_position; varying vec2 v_texCoord;
    void main(){ v_texCoord = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }`;
    const fs = `precision highp float; varying vec2 v_texCoord;
    uniform float u_time; uniform vec2 u_resolution; uniform vec2 u_mouse;
    void main(){
      vec2 uv = v_texCoord; vec2 mouse = u_mouse / u_resolution;
      float n1 = sin(uv.x*2.5+u_time*0.4)*cos(uv.y*1.5-u_time*0.2);
      float n2 = sin(uv.y*3.5+u_time*0.3)*cos(uv.x*2.5+u_time*0.5);
      float dist = distance(uv, vec2(mouse.x, 1.0-mouse.y));
      float glow = smoothstep(0.5, 0.0, dist)*0.4;
      vec3 c1 = vec3(0.388,0.4,0.945); vec3 c2 = vec3(0.961,0.949,0.996); vec3 c3 = vec3(0.859,0.847,0.894);
      vec3 base = mix(c2, c3, uv.y + n1*0.1);
      vec3 accent = mix(base, c1, clamp(n1+n2+glow,0.0,1.0)*0.25);
      gl_FragColor = vec4(accent, 1.0);
    }`;
    const cs = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create WebGL shader");
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes  = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    let mouse = { x: canvas.width/2, y: canvas.height/2 };
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = (e.clientX-r.left)/r.width*canvas.width; mouse.y = (1-(e.clientY-r.top)/r.height)*canvas.height; };
    window.addEventListener("mousemove", onMove);
    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t*0.001); gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render(0);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} style={{ display: "block", width: "100%", height: "100%", opacity: 0.75 }} />;
}