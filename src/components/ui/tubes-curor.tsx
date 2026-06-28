import React, { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then(module => {
          const TubesCursorLib = module.default;
          if (canvasRef.current) {
            const app = TubesCursorLib(canvasRef.current, {
              tubes: {
                colors: ["#00FFAA", "#00C8FF", "#FFC857"],
                lights: {
                  intensity: 200,
                  colors: ["#00FFAA", "#00C8FF", "#FFC857", "#9D4EDD"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch(err => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current && appRef.current.tubes) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(newLightColors);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="h-full min-h-[500px] w-full bg-[#050816] font-sans overflow-hidden cursor-pointer relative select-none rounded-2xl border border-emerald-500/20 shadow-[0_0_50px_rgba(0,255,170,0.1)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <div className="relative h-full min-h-[500px] flex flex-col items-center justify-center gap-4 z-10 pointer-events-none p-6 text-center">
        <h1 className="m-0 p-0 text-white text-5xl md:text-7xl font-extrabold uppercase tracking-tighter [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
          Tubes
        </h1>
        <h2 className="m-0 p-0 text-[#00FFAA] text-3xl md:text-5xl font-bold uppercase tracking-widest [text-shadow:0_0_20px_rgba(0,200,255,0.4)]">
          Cursor
        </h2>
        <p className="m-0 p-0 text-slate-300 text-sm md:text-lg font-mono tracking-wider bg-slate-900/90 px-6 py-2.5 rounded-full border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,170,0.15)]">
          ⚡ Click anywhere inside canvas to mutate quantum WebGL neon lights
        </p>
      </div>
    </div>
  );
}
