'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl bg-primary/20 animate-float" 
        style={{
          top: '10%',
          left: '5%',
        }}
      />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl bg-accent/20 animate-float-delayed" 
        style={{
          bottom: '10%',
          right: '10%',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 25s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}