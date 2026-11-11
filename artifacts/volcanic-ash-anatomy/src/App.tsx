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
    <nav aria-label="Pages" className="relative z-30 border-b border-[#c9dbec] bg-white">
      <ul className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-4 md:px-10">
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
                className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-[3px] px-3 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2563a8] ${active ? 'border-[#2563a8] text-[#16324f]' : 'border-transparent text-[#4f6780] hover:text-[#2563a8]'}`}
              >
                <span className={`step-num !h-6 !w-6 !text-xs ${active ? '' : '!bg-[#c9dbec] !text-[#2f557f]'}`}>{Number(item.number)}</span>
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
    <div className="min-h-[100dvh] bg-[#f3f8fd] text-[#16324f]">
      <PageSwitcher page={page} onNavigate={navigate} />
      {page === 'nanotech' ? <NanotechPage /> : <AshPage />}
    </div>
  );
}

export default App;
