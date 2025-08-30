import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="relative w-full" style={{ height: '320px' }}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-white/20 to-white/70" />
      <div className="relative h-full flex items-end justify-center pb-6">
        <div className="pointer-events-none select-none rounded-full bg-white/70 backdrop-blur px-4 py-2 text-sm font-medium text-orange-700 shadow">
          Colorful blocks and shapes
        </div>
      </div>
    </div>
  );
}
