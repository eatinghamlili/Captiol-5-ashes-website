import { useEffect, useState, type MouseEvent } from 'react';

import { AshPage } from '@/pages/ash';
import { NanotechPage } from '@/pages/nanotech';

type PageId = 'ash' | 'nanotech';

const pages: { id: PageId; number: string; label: string; title: string }[] = [
  { id: 'ash', number: '01', label: 'Volcanic ash', title: 'Volcanic Ash & the Respiratory System' },
  { id: 'nanotech', number: '02', label: 'Nanotech malfunction', title: 'Nanotechnology Malfunction & the Body' },
];

// The page lives in the query string (?page=nanotech) so it works on GitHub Pages
// without a 404 fallback, and leaves #anchors free for in-page links.
function readPage(): PageId {
  return new URLSearchParams(window.location.search).get('page') === 'nanotech' ? 'nanotech' : 'ash';
}

function hrefFor(id: PageId) {
  return id === 'ash' ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}?page=${id}`;
}

function PageSwitcher({ page, onNavigate }: { page: PageId; onNavigate: (id: PageId) => void }) {
  return (
    <nav aria-label="Pages" className="relative z-30 mx-auto max-w-[1320px] px-6 pt-4 md:px-10 md:pt-5">
      <ul className="inline-flex flex-wrap gap-1 rounded-full border border-[#d7cbb9] bg-[#ebe4d8] p-1">
        {pages.map((item) => {
          const active = item.id === page;
          return (
            <li key={item.id}>
              <a
                href={hrefFor(item.id)}
                aria-current={active ? 'page' : undefined}
                onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                  event.preventDefault();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75239] ${active ? 'bg-[#25343a] text-[#f3efe5]' : 'text-[#59656a] hover:text-[#a75239]'}`}
              >
                <span className={`font-semibold ${active ? 'text-[#d5a47e]' : 'text-[#a75239]'}`}>{item.number}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function App() {
  const [page, setPage] = useState<PageId>(readPage);

  useEffect(() => {
    const onPop = () => setPage(readPage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = pages.find((item) => item.id === page)!.title;
  }, [page]);

  const navigate = (id: PageId) => {
    if (id === page) return;
    window.history.pushState(null, '', hrefFor(id));
    setPage(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="bg-[#f3efe5]">
      <PageSwitcher page={page} onNavigate={navigate} />
      {page === 'nanotech' ? <NanotechPage /> : <AshPage />}
    </div>
  );
}

export default App;
