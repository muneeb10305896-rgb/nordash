export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 24,
      padding: 20,
    }}>
      {/* Spinning diamond */}
      <div style={{
        width: 36,
        height: 36,
        background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
        transform: 'rotate(45deg)',
        animation: 'truckSpin 1.2s ease-in-out infinite',
        boxShadow: '0 0 40px rgba(0,229,255,0.3)',
      }} />
      <div className="font-syne" style={{
        fontSize: 13,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(237,242,255,0.35)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        Loading
      </div>
      <style>{`
        @keyframes truckSpin {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(225deg) scale(0.85); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
