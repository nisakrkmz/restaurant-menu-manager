const PARTICLE_COUNT = 40;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBackground() {
  return (
    <div id="tsparticles">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const top = randomBetween(0, 100);
        const left = randomBetween(0, 100);
        const duration = randomBetween(6, 14);
        const delay = randomBetween(0, 10);
        return (
          <span
            key={i}
            className="particle-dot"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
