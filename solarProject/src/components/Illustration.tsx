export default function Illustration() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #A6B28B, #1C352D)' }}>
      <div className="absolute w-80 h-80 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(245, 201, 176, 0.3) 0%, transparent 70%)' }} />

      <div className="absolute top-[15%] left-[20%] w-32 h-20 rounded-lg shadow-lg -rotate-12" style={{ background: 'linear-gradient(to bottom right, #1C352D, rgba(28, 53, 45, 0.8))' }} />
      <div className="absolute top-[20%] right-[25%] w-32 h-20 rounded-lg shadow-lg rotate-12" style={{ background: 'linear-gradient(to bottom right, #1C352D, rgba(28, 53, 45, 0.8))' }} />
      <div className="absolute bottom-[35%] left-[30%] w-32 h-20 rounded-lg shadow-lg" style={{ background: 'linear-gradient(to bottom right, #1C352D, rgba(28, 53, 45, 0.8))' }} />

      <div className="absolute bottom-0 w-full h-52 [clip-path:polygon(0%_100%,5%_70%,10%_60%,15%_75%,20%_50%,25%_65%,30%_45%,35%_70%,40%_55%,45%_80%,50%_40%,55%_65%,60%_50%,65%_75%,70%_60%,75%_80%,80%_55%,85%_70%,90%_45%,95%_65%,100%_100%)]" style={{ background: 'linear-gradient(to top, rgba(28, 53, 45, 0.9), rgba(28, 53, 45, 0.7))' }} />
      <div className="absolute bottom-0 w-full h-24 [clip-path:polygon(0%_0%,5%_30%,10%_40%,15%_25%,20%_50%,25%_35%,30%_55%,35%_30%,40%_45%,45%_20%,50%_60%,55%_35%,60%_50%,65%_25%,70%_40%,75%_20%,80%_45%,85%_30%,90%_55%,95%_35%,100%_0%)]" style={{ background: 'linear-gradient(to bottom, rgba(245, 201, 176, 0.1), transparent)' }} />
    </div>
  );
}