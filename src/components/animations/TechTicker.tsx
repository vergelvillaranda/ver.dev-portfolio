'use client';

const SKILLS = [
  'TYPESCRIPT',
  'REACT',
  'JAVASCRIPT',
  'NODE.JS',
  'NEXT.JS',
  'TAILWIND CSS',
  'UI DESIGN',
  'FIGMA',
  'MYSQL',
  'DOCKER',
  'POSTGRESQL',
  'XAMMPP',
  'GIT',
  'GITHUB',
  'ARDUINO',
  'IOT DEVELOPMENT',
  'ADOBE PHOTOSHOP',
  'ADOBE PREMIERE PRO',
];

export default function TechTicker() {
  return (
    <div
      data-no-trail
      className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 py-4"
    >
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {[0, 1].map((dupIndex) => (
          <div key={dupIndex} className="flex items-center">
            {SKILLS.map((skill) => (
              <span key={skill} className="flex items-center">
                <span className="label-text px-6 text-white/40">{skill}</span>
                <span className="text-white/20">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}