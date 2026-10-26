import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WORDS_DATA } from './data/wordsData';
import { SceneState, WordEntry } from './types/morphology';
import { MuseumHeader } from './components/MuseumHeader';
import { IntroScene } from './components/IntroScene';
import { TreeScene } from './components/TreeScene';
import { RootDiscoveryScene } from './components/RootDiscoveryScene';
import { ReferencesDrawer } from './components/ReferencesDrawer';

export const App: React.FC = () => {
  const [scene, setScene] = useState<SceneState>('intro');
  const [selectedWord, setSelectedWord] = useState<WordEntry>(WORDS_DATA[0]);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(() => new Set());
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);

  const transitionTimerRef = useRef<number | null>(null);

  const clearPendingTransition = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPendingTransition();
  }, [clearPendingTransition]);

  const markWordDiscovered = useCallback((wordId: string) => {
    setDiscoveredIds((prev) => {
      if (prev.has(wordId)) return prev;
      const next = new Set(prev);
      next.add(wordId);
      return next;
    });
  }, []);

  const handleEnterTree = useCallback(() => {
    clearPendingTransition();
    setScene('tree');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearPendingTransition]);

  const handleNavigateToIntro = useCallback(() => {
    clearPendingTransition();
    setScene('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearPendingTransition]);

  const handleSelectWordFromTree = useCallback(
    (entry: WordEntry) => {
      clearPendingTransition();
      setSelectedWord(entry);
      markWordDiscovered(entry.id);

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion || scene === 'root') {
        setScene('root');
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      setScene('transitioning');
      transitionTimerRef.current = window.setTimeout(() => {
        setScene('root');
        transitionTimerRef.current = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 460);
    },
    [clearPendingTransition, markWordDiscovered, scene]
  );

  const handleQuickSelectFromIntro = useCallback(
    (wordId: string) => {
      const target = WORDS_DATA.find((w) => w.id === wordId) || WORDS_DATA[0];
      clearPendingTransition();
      setSelectedWord(target);
      markWordDiscovered(target.id);
      setScene('root');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [clearPendingTransition, markWordDiscovered]
  );

  const handleSwitchWordInRoot = useCallback(
    (entry: WordEntry) => {
      clearPendingTransition();
      setSelectedWord(entry);
      markWordDiscovered(entry.id);
      setScene('root');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [clearPendingTransition, markWordDiscovered]
  );

  const handleReturnToTree = useCallback(() => {
    clearPendingTransition();
    setScene('tree');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearPendingTransition]);

  return (
    <div className="museum-app" dir="rtl" lang="ar">
      {/* الترويسة المتحفية الثابتة */}
      <MuseumHeader
        currentScene={scene}
        discoveredCount={discoveredIds.size}
        totalCount={WORDS_DATA.length}
        onNavigateToIntro={handleNavigateToIntro}
        onReturnToTree={handleReturnToTree}
        onOpenReferences={() => setIsReferencesOpen(true)}
      />

      {/* المحتوى الرئيسي للمشاهد الثلاثة */}
      <main className="museum-main" id="main-content">
        {scene === 'intro' && (
          <IntroScene
            onEnterTree={handleEnterTree}
            onQuickSelectWord={handleQuickSelectFromIntro}
          />
        )}

        {(scene === 'tree' || scene === 'transitioning') && (
          <TreeScene
            words={WORDS_DATA}
            selectedWordId={scene === 'transitioning' ? selectedWord.id : null}
            isTransitioning={scene === 'transitioning'}
            discoveredIds={discoveredIds}
            onSelectWord={handleSelectWordFromTree}
          />
        )}

        {scene === 'root' && (
          <RootDiscoveryScene
            entry={selectedWord}
            allWords={WORDS_DATA}
            discoveredIds={discoveredIds}
            onReturnToTree={handleReturnToTree}
            onSelectAnotherWord={handleSwitchWordInRoot}
          />
        )}
      </main>

      {/* التذييل المتحفي الرصين */}
      <footer className="museum-footer" role="contentinfo">
        <div className="museum-footer__inner">
          <div className="museum-footer__brand">
            <strong>متحف الضاد — شجرة الجذور</strong>
            <span>معرضٌ تفاعليٌّ لتأصيل المفردات العربية في ضوء علم الصرف والمعاجم التراثية</span>
          </div>

          <div className="museum-footer__links">
            <button
              type="button"
              className="museum-footer__link-btn"
              onClick={() => setIsReferencesOpen(true)}
            >
              ثَبَتُ المعاجم والمراجع العلمية
            </button>
            {scene !== 'tree' && (
              <button
                type="button"
                className="museum-footer__link-btn"
                onClick={handleReturnToTree}
              >
                دوحة الألفاظ العشر
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* نافذة المعاجم والمصطلحات الصرفية */}
      <ReferencesDrawer
        isOpen={isReferencesOpen}
        words={WORDS_DATA}
        onClose={() => setIsReferencesOpen(false)}
        onSelectWordFromDrawer={handleSwitchWordInRoot}
      />
    </div>
  );
};
export default App;

