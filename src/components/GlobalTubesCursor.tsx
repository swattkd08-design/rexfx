import React, { useEffect, useRef } from 'react';

export default function GlobalTubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    let app: any = null;
    const initTimer = setTimeout(() => {
      // @ts-ignore
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then(module => {
          const TubesCursorLib = module.default;
          if (canvasRef.current) {
            app = TubesCursorLib(canvasRef.current, {
              tubes: {
                colors: ["#00FFAA", "#00C8FF", "#FFC857"],
                lights: {
                  intensity: 220,
                  colors: ["#00FFAA", "#00C8FF", "#FFC857", "#9D4EDD"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch(err => console.error("Failed to load global TubesCursor module:", err));
    }, 50);

    const handleGlobalClick = () => {
      if (appRef.current && appRef.current.tubes && typeof appRef.current.tubes.setColors === 'function') {
        const newTubeColors = randomColors(3);
        const newLightColors = randomColors(4);
        appRef.current.tubes.setColors(newTubeColors);
        if (typeof appRef.current.tubes.setLightsColors === 'function') {
          appRef.current.tubes.setLightsColors(newLightColors);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('click', handleGlobalClick);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-85 pointer-events-none" 
      />
    </div>
  );
}
