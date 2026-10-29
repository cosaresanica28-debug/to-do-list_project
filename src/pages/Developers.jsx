import { Link } from 'react-router-dom';

const developers = [
  {
    name: 'Angelica Pauline M. Gildo',
    role: 'Lead Developer',
    desc: 'Built the overall layout and wrote the JavaScript logic.',
    portfolio: 'https://portfolio-gildo.vercel.app/', // ← palitan ng actual portfolio
    photo: 'public/angelica.jpg', // ← ilagay dito yung path ng photo
  },
  {
    name: 'Anica C. Cosares',
    role: 'UI/UX Designer',
    desc: 'Designed the cards, buttons, and color scheme.',
    portfolio: 'https://anica-portfolio.vercel.app/',
    photo: 'public/anica.jpg',
  },
  {
    name: 'Jeanzen D. Esqullio',
    role: 'Frontend Developer',
    desc: 'Handled the responsiveness for mobile and tablet devices.',
    portfolio: 'https://esqullio-portfolio.vercel.app/',
    photo: 'public/jeanzen.jpg',
  },
  {
    name: 'Neilyn M. Cenizal',
    role: 'QA / Documentation',
    desc: 'Tested all the buttons and wrote the User Guide.',
    portfolio: 'https://website-inky-nine-82.vercel.app/',
    photo: 'public/neilyn.jpg',
  },
];

export default function Developers() {
  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="mb-6">
        <h1 className="font-serif text-[26px] font-semibold mb-1">Developers</h1>
        <p className="text-[15px] text-[var(--color-muted)]">The team behind this project.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {developers.map((d) => (
          <a
            key={d.name}
            href={d.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center transition-all hover:shadow-md hover:-translate-y-1 hover:border-[var(--color-primary)] cursor-pointer group"
          >
            {/* Photo */}
            <div className="w-[90px] h-[90px] rounded-full overflow-hidden mb-4 border-2 border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors">
              <img
                src={d.photo}
                alt={d.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // fallback kung walang photo pa
                  e.target.src = 'https://via.placeholder.com/90?text=Photo';
                }}
              />
            </div>

            <div className="font-serif text-lg font-semibold group-hover:text-[var(--color-primary)] transition-colors">
              {d.name}
            </div>
            <div className="text-[13px] font-semibold text-[var(--color-primary)] uppercase tracking-wide mt-1">
              {d.role}
            </div>
            <p className="text-sm text-[var(--color-muted)] mt-3 leading-relaxed">{d.desc}</p>

            <span className="mt-4 text-sm font-semibold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              View Portfolio →
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-hover)]"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}