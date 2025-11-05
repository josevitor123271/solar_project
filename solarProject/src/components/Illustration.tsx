export default function Illustration() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
      <div className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(255,235,59,0.3)_0%,transparent_70%)] animate-pulse" />

      <div className="absolute top-[15%] left-[20%] w-32 h-20 bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg shadow-lg -rotate-12" />
      <div className="absolute top-[20%] right-[25%] w-32 h-20 bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg shadow-lg rotate-12" />
      <div className="absolute bottom-[35%] left-[30%] w-32 h-20 bg-gradient-to-br from-blue-800 to-blue-600 rounded-lg shadow-lg" />

      <div className="absolute bottom-0 w-full h-52 bg-gradient-to-t from-gray-900/90 to-gray-900/70 [clip-path:polygon(0%_100%,5%_70%,10%_60%,15%_75%,20%_50%,25%_65%,30%_45%,35%_70%,40%_55%,45%_80%,50%_40%,55%_65%,60%_50%,65%_75%,70%_60%,75%_80%,80%_55%,85%_70%,90%_45%,95%_65%,100%_100%)]" />
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-white/10 to-transparent [clip-path:polygon(0%_0%,5%_30%,10%_40%,15%_25%,20%_50%,25%_35%,30%_55%,35%_30%,40%_45%,45%_20%,50%_60%,55%_35%,60%_50%,65%_25%,70%_40%,75%_20%,80%_45%,85%_30%,90%_55%,95%_35%,100%_0%)]" />
    </div>
  );
}