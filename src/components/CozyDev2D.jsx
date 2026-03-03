import React, { useEffect, useState } from 'react';

// Terminal code lines provided by user
const codeLines = [
  "// SYSTEM BOOT: Abdul Nafay Portfolio v1.0",
  "const USER = 'Abdul Nafay';",
  "const ROLE = 'Front End Dev | Hardware Specialist';",
  "const EDUCATION = 'High School Student';",
  "// WORK HISTORY SCAN...",
  "// [APS] Designed 8 core textbooks (June-Aug 2024)",
  "// [Dev] Released Open Source Education Templates",
  "// [Dev] Released Open Source Math Tools",
  "const TOOLS = ['Coral Draw', 'Three.js', 'React.js','Flimora','canva'];",
  "const SOURCE_CODE = 'https://github.com/nafay365/portfelio/';"
];

const fullCode = codeLines.join('\n');
const CozyDev2D = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    const timer = setInterval(() => {
      if (charIndex < fullCode.length) {
        const newText = fullCode.slice(0, charIndex + 1);
        setDisplayedText(newText);
        const lines = newText.split('\n').length;
        setLineCount(lines);

        charIndex++;
      } else {
        clearInterval(timer);
      }
    }, 10);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">

      {/* Grid pattern - dark theme */}
      <div
        className="absolute inset-0 opacity-20 dark:block hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(145, 94, 255, 0.3) 1px, transparent 3px),
            linear-gradient(270deg, rgba(145, 94, 255, 0.3) 3px, transparent 3px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Grid pattern - light theme (blue colors) */}
      <div
        className="absolute inset-0 opacity-30 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 3px),
            linear-gradient(270deg, rgba(59, 130, 246, 0.4) 3px, transparent 3px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Transparent terminal window - starts after 3-4 lines from top */}
      <div
        className="absolute z-0"
        style={{
          top: '50%',
          right: '5%',
          left: '5%',
          width: 'min(90%, 1000px)',
          maxHeight: '100%',
        }}
      >
        {/* Dark theme terminal */}
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-600/30 overflow-hidden shadow-xl dark:block hidden">
          {/* Terminal Header - dark */}
          <div className="bg-gray-800/50 px-4 py-2 flex items-center gap-2 border-b border-gray-600/20">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-gray-100/70 text-sm font-Fira-Code">Abdul Nafay</span>
          </div>

          {/* Terminal Body - dark */}
          <div className="p-4 font-mono text-sm bg-transparent">
            <pre className="text-green-300 whitespace-pre-wrap leading-100">
              {displayedText}
              <span className="animate animate-blink">|</span>
            </pre>

          </div>
        </div>

        {/* Light theme terminal - white theme */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200/50 overflow-hidden shadow-xl dark:hidden block">
          {/* Terminal Header - white theme */}
          <div className="bg-blue-50 px-4 py-2 flex items-center gap-2 border-b border-blue-200/30">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-blue-800 text-sm font-Fira-Code">Abdul Nafay</span>
          </div>

          {/* Terminal Body - white theme */}
          <div className="p-4 font-mono text-sm bg-transparent">
            <pre className="text-blue-700 whitespace-pre-wrap leading-100">
              {displayedText}
              <span className="animate animate-blink">|</span>
            </pre>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CozyDev2D;
