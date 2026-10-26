import React from 'react';
import { SceneState } from '../types/morphology';

interface MuseumHeaderProps {
  currentScene: SceneState;
  discoveredCount: number;
  totalCount: number;
  onNavigateToIntro: () => void;
  onReturnToTree: () => void;
  onOpenReferences: () => void;
}

export const MuseumHeader: React.FC<MuseumHeaderProps> = ({
  currentScene,
  discoveredCount,
  totalCount,
  onNavigateToIntro,
  onReturnToTree,
  onOpenReferences,
}) => {
  return (
    <header className="museum-header" role="banner">
      <div className="museum-header__inner">
        {/* الهوية المتحفية */}
        <div className="museum-header__brand">
          <button
            type="button"
            className="museum-header__crest-btn"
            onClick={onNavigateToIntro}
            aria-label="العودة إلى مدخل متحف الضاد — شجرة الجذور"
          >
            <svg
              className="museum-header__star-icon"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <polygon
                points="18,2 22,12 32,8 26,18 32,28 22,24 18,34 14,24 4,28 10,18 4,8 14,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <circle cx="18" cy="18" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="18" cy="18" r="1.5" fill="currentColor" />
            </svg>
            <div className="museum-header__titles">
              <span className="museum-header__subtitle">متحف الضاد</span>
              <span className="museum-header__title">شجرة الجذور</span>
            </div>
          </button>
        </div>

        {/* مسار المعرض */}
        <nav className="museum-header__stages" aria-label="مراحل المعرض التفاعلي">
          <button
            type="button"
            className={`stage-pill ${currentScene === 'intro' ? 'stage-pill--active' : ''}`}
            onClick={onNavigateToIntro}
          >
            <span className="stage-pill__num">١</span>
            <span>فاتحة المعرض</span>
          </button>
          <span className="stage-divider" aria-hidden="true" />
          <button
            type="button"
            className={`stage-pill ${
              currentScene === 'tree' || currentScene === 'transitioning'
                ? 'stage-pill--active'
                : ''
            }`}
            onClick={onReturnToTree}
          >
            <span className="stage-pill__num">٢</span>
            <span>دوحة الألفاظ</span>
          </button>
          <span className="stage-divider" aria-hidden="true" />
          <span
            className={`stage-pill stage-pill--static ${
              currentScene === 'root' ? 'stage-pill--active' : ''
            }`}
          >
            <span className="stage-pill__num">٣</span>
            <span>باطن الجذور</span>
          </span>
        </nav>

        {/* أدوات الزائر */}
        <div className="museum-header__actions">
          <div
            className="discovery-counter"
            title="عدد الجذور التي استكشفتها في هذه الزيارة"
            aria-live="polite"
          >
            <span className="discovery-counter__label">الجذور المكتشفة:</span>
            <span className="discovery-counter__value">
              {discoveredCount} / {totalCount}
            </span>
          </div>

          <button
            type="button"
            className="museum-header__ref-btn"
            onClick={onOpenReferences}
          >
            <span>المعاجم والمصادر</span>
          </button>

          {currentScene === 'root' && (
            <button
              type="button"
              className="museum-header__back-tree-btn"
              onClick={onReturnToTree}
            >
              <span>العودة إلى الشجرة</span>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path
                  d="M10 16V4M10 4L5 9M10 4L15 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

