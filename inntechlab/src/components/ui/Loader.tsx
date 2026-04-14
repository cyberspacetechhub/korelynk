const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 6px rgba(59,130,246,0.3));
          }
          50% {
            transform: scale(1.12);
            filter: drop-shadow(0 0 22px rgba(59,130,246,0.7)) drop-shadow(0 0 40px rgba(147,197,253,0.4));
          }
        }
        @keyframes spin-ring {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-ring-reverse {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .breathe-img {
          animation: breathe 2.8s ease-in-out infinite;
        }
        .ring-outer {
          animation: spin-ring 2.2s linear infinite;
        }
        .ring-inner {
          animation: spin-ring-reverse 1.6s linear infinite;
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        {/* Spinning rings + image */}
        <div className="relative flex items-center justify-center w-40 h-40">

          {/* Outer dashed ring */}
          <div className="absolute inset-0 border-4 border-transparent rounded-full ring-outer"
            style={{
              borderTopColor: '#3b82f6',
              borderRightColor: '#93c5fd',
              borderBottomColor: 'transparent',
              borderLeftColor: '#3b82f6',
            }}
          />

          {/* Inner dotted ring */}
          <div className="absolute border-2 border-transparent rounded-full ring-inner inset-3"
            style={{
              borderTopColor: '#60a5fa',
              borderRightColor: 'transparent',
              borderBottomColor: '#bfdbfe',
              borderLeftColor: 'transparent',
            }}
          />

          {/* Logo */}
          <img
            src="/ITL-LOGO1-dark.svg"
            alt="InnTechLab"
            className="z-10 object-contain w-24 h-24 rounded-full breathe-img"
          />
        </div>

        {/* Loading text */}
        <p className="text-sm font-medium tracking-widest text-blue-500 uppercase dark:text-blue-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
