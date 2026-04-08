import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 p = uv - 0.5;
  p.x *= iResolution.x / iResolution.y;

  vec2 mouseUv = uMouse / iResolution.xy;
  vec2 mouseOffset = (mouseUv - 0.5) * 0.45 * step(0.5, uMouseInteractive);
  p += mouseOffset;

  p /= max(uScale, 0.01);

  float t = iTime * uSpeed * uDirection;
  float v1 = sin((p.x * 5.2 + t * 1.3) + sin((p.y * 3.4 - t) * 1.2));
  float v2 = cos((p.y * 6.0 - t * 1.1) + cos((p.x * 2.7 + t) * 1.6));
  float v3 = sin(length(p) * 12.0 - t * 1.8);
  float field = (v1 + v2 + v3) / 3.0;
  float intensity = smoothstep(-0.95, 0.95, field);
  float glow = smoothstep(0.2, 1.0, intensity);

  vec3 baseColor = mix(vec3(0.08, 0.12, 0.22), vec3(0.45, 0.75, 1.0), intensity);
  vec3 customColor = mix(baseColor, uCustomColor, step(0.5, uUseCustomColor));
  vec3 finalColor = customColor * (0.35 + glow * 1.1);
  float alpha = (0.35 + glow * 0.65) * uOpacity;

  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  style,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];

    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    containerRef.current.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive) return;
      const rect = containerRef.current!.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = mousePos.current.x;
      mouseUniform[1] = mousePos.current.y;
    };

    if (mouseInteractive) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    const setSize = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(containerRef.current);
    setSize();

    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      let timeValue = (t - t0) * 0.001;
      if (direction === 'pingpong') {
        const pingpongDuration = 10;
        const segmentTime = timeValue % pingpongDuration;
        const isForward = Math.floor(timeValue / pingpongDuration) % 2 === 0;
        const u = segmentTime / pingpongDuration;
        const smooth = u * u * (3 - 2 * u);
        const pingpongTime = isForward ? smooth * pingpongDuration : (1 - smooth) * pingpongDuration;
        (program.uniforms.uDirection as any).value = 1.0;
        (program.uniforms.iTime as any).value = pingpongTime;
      } else {
        (program.uniforms.iTime as any).value = timeValue;
      }
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mouseInteractive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      try {
        containerRef.current?.removeChild(canvas);
      } catch {}
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative overflow-hidden ${className || ''}`}
      style={style}
    />
  );
};

export default Plasma;
