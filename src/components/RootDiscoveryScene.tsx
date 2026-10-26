import React, { useState } from 'react';
import { WordEntry } from '../types/morphology';

interface RootDiscoverySceneProps {
  entry: WordEntry;
  allWords: WordEntry[];
  discoveredIds: Set<string>;
  onReturnToTree: () => void;
  onSelectAnotherWord: (word: WordEntry) => void;
}

export const RootDiscoveryScene: React.FC<RootDiscoverySceneProps> = ({
  entry,
  allWords,
  discoveredIds,
  onReturnToTree,
  onSelectAnotherWord,
}) => {
  const [copiedRoot, setCopiedRoot] = useState(false);

  const handleCopyRoot = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${entry.word} — الجذر: ${entry.rootContinuous} (${entry.rootDisplay})`);
      setCopiedRoot(true);
      setTimeout(() => setCopiedRoot(false), 2200);
    }
  };

  return (
    <article
      className="root-discovery-scene"
      aria-labelledby="discovered-word-heading"
    >
      {/* المشهد البصري العلوي: جذع الشجرة الغائر في التربة وعروق الجذر الثلاثي */}
      <div className="root-chamber-hero">
        <div className="root-chamber-hero__top-bar">
          <button
            type="button"
            className="btn-return-tree-top"
            onClick={onReturnToTree}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M10 16V4M10 4L5 9M10 4L15 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>العودة إلى الشجرة</span>
          </button>

          <div className="root-chamber-hero__crumb">
            <span>باطن الجذور اللغوية</span>
            <span aria-hidden="true">•</span>
            <span>{entry.leafPosition.branchGroupTitle}</span>
          </div>
        </div>

        {/* لوحة الجذور التحتية الحية */}
        <div className="root-chamber-svg-wrapper">
          <svg
            className="root-chamber-svg"
            viewBox="0 0 960 285"
            role="img"
            aria-label={`رسم الجذور الممتدة تحت التربة للكلمة ${entry.word} وجذرها ${entry.rootDisplay}`}
          >
            <defs>
              <linearGradient id="soilChamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#173D32" />
                <stop offset="30%" stopColor="#112E25" />
                <stop offset="100%" stopColor="#0A1D17" />
              </linearGradient>
              <linearGradient id="veinGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7F1E5" />
                <stop offset="50%" stopColor="#B99A5B" />
                <stop offset="100%" stopColor="#8B9B76" />
              </linearGradient>
            </defs>

            <rect width="960" height="285" fill="url(#soilChamberGrad)" rx="16" />

            {/* خط سطح التربة في أعلى المشهد */}
            <path
              d="M0,44 Q240,30 480,44 T960,44"
              fill="none"
              stroke="#B99A5B"
              strokeOpacity="0.6"
              strokeWidth="2"
            />
            <text
              x="930"
              y="30"
              fill="#E9D9B8"
              fillOpacity="0.72"
              fontSize="12"
              fontFamily="Thmanyah Sans, sans-serif"
              textAnchor="start"
            >
              سطحُ التربة • مَغرسُ الجذع
            </text>

            {/* قاعدة الجذع المخترقة للتربة */}
            <path
              d="M442,0 C452,22 456,34 460,46 L500,46 C504,34 508,22 518,0 Z"
              fill="#9E8250"
            />

            {/* شعيرات جذرية خلفية تعبّر عن تشعّب المشتقات */}
            <path
              d="M480,46 C420,90 310,120 155,165 M480,46 C540,90 650,120 805,165 M360,130 C295,175 230,210 175,245 M600,130 C665,175 730,210 785,245 M480,145 C440,195 405,235 380,262 M480,145 C520,195 555,235 580,262"
              fill="none"
              stroke="#8B9B76"
              strokeOpacity="0.26"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* العروق الثلاثة الكبرى لحروف الجذر بالترتيب اليميني (فاء - عين - لام) */}
            {/* ١. عرق فاء الجذر (اليمين) */}
            <path
              d="M480,44 C535,95 615,135 665,192"
              fill="none"
              stroke="url(#veinGoldGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="root-vein-path root-vein-path--1"
            />
            {/* ٢. عرق عين الجذر (الوسط) */}
            <path
              d="M480,44 C480,100 480,145 480,205"
              fill="none"
              stroke="url(#veinGoldGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              className="root-vein-path root-vein-path--2"
            />
            {/* ٣. عرق لام الجذر (اليسار) */}
            <path
              d="M480,44 C425,95 345,135 295,192"
              fill="none"
              stroke="url(#veinGoldGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="root-vein-path root-vein-path--3"
            />

            {/* عقدة التفرع عند قاعدة الجذع */}
            <circle cx="480" cy="44" r="7" fill="#F7F1E5" stroke="#B99A5B" strokeWidth="2.5" />

            {/* أيقونات الحروف الأصول الثلاثة في باطن الأرض (من اليمين إلى اليسار) */}
            {/* الحرف الأول: فاء الكلمة (يمين) */}
            <g className="root-letter-medallion root-letter-medallion--1" transform="translate(665, 198)">
              <circle r="38" fill="#173D32" stroke="#B99A5B" strokeWidth="2.5" />
              <circle r="32" fill="none" stroke="#E9D9B8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
              <text
                y="10"
                textAnchor="middle"
                fill="#F7F1E5"
                fontSize="30"
                fontWeight="700"
                fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
              >
                {entry.rootLetters[0]}
              </text>
              <text
                y="58"
                textAnchor="middle"
                fill="#E9D9B8"
                fontSize="13"
                fontFamily="Thmanyah Sans, sans-serif"
              >
                فاءُ الجذر
              </text>
            </g>

            {/* الحرف الثاني: عين الكلمة (وسط) */}
            <g className="root-letter-medallion root-letter-medallion--2" transform="translate(480, 210)">
              <circle r="40" fill="#173D32" stroke="#B99A5B" strokeWidth="2.8" />
              <circle r="34" fill="none" stroke="#E9D9B8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
              <text
                y="11"
                textAnchor="middle"
                fill="#F7F1E5"
                fontSize="32"
                fontWeight="700"
                fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
              >
                {entry.rootLetters[1]}
              </text>
              <text
                y="60"
                textAnchor="middle"
                fill="#E9D9B8"
                fontSize="13"
                fontFamily="Thmanyah Sans, sans-serif"
              >
                عينُ الجذر
              </text>
            </g>

            {/* الحرف الثالث: لام الكلمة (يسار) */}
            <g className="root-letter-medallion root-letter-medallion--3" transform="translate(295, 198)">
              <circle r="38" fill="#173D32" stroke="#B99A5B" strokeWidth="2.5" />
              <circle r="32" fill="none" stroke="#E9D9B8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
              <text
                y="10"
                textAnchor="middle"
                fill="#F7F1E5"
                fontSize="30"
                fontWeight="700"
                fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
              >
                {entry.rootLetters[2]}
              </text>
              <text
                y="58"
                textAnchor="middle"
                fill="#E9D9B8"
                fontSize="13"
                fontFamily="Thmanyah Sans, sans-serif"
              >
                لامُ الجذر
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* اللوحة المتحفية التعليمية ذات الأقسام الستة */}
      <div className="exhibition-panel">
        {/* القسمان ١ و ٢: الكلمة المكتشفة والجذر اللغوي */}
        <div className="exhibition-panel__top-grid">
          {/* القسم الأول: الكلمة المكتشفة */}
          <section
            className="panel-card panel-card--word"
            aria-labelledby="discovered-word-heading"
          >
            <div className="panel-card__section-tag">
              <span className="panel-card__section-num">٠١</span>
              <span>الكلمة المكتشفة</span>
            </div>

            <div className="discovered-word-showcase">
              <h1 id="discovered-word-heading" className="discovered-word-showcase__title">
                {entry.word}
              </h1>
              <span className="discovered-word-showcase__badge">
                {entry.phenomenonBadge}
              </span>
            </div>

            <dl className="word-morph-meta">
              <div className="word-morph-meta__item">
                <dt>الميزان الصرفي:</dt>
                <dd>{entry.morphologicalPattern}</dd>
              </div>
              <div className="word-morph-meta__item">
                <dt>نوع العلاقة الصرفية:</dt>
                <dd>{entry.relationshipType}</dd>
              </div>
            </dl>
          </section>

          {/* القسم الثاني: الجذر اللغوي */}
          <section
            className="panel-card panel-card--root"
            aria-labelledby="linguistic-root-heading"
          >
            <div className="panel-card__section-tag">
              <span className="panel-card__section-num">٠٢</span>
              <h2 id="linguistic-root-heading" className="panel-card__section-title-inline">
                الجذر اللغوي
              </h2>
            </div>

            <div className="root-letters-box">
              {/* تمثيل الجذر بفواصل متحفية أنيقة مع إتاحة النص المتصل للقارئات الصوتية */}
              <div
                className="root-letters-box__visual"
                dir="rtl"
                aria-label={`حروف الجذر الثلاثة هي: ${entry.rootLetters.join(' ثم ')} — الجذر المتصل: ${entry.rootContinuous}`}
              >
                <span className="root-radical-chip">{entry.rootLetters[0]}</span>
                <span className="root-radical-sep" aria-hidden="true">
                  —
                </span>
                <span className="root-radical-chip">{entry.rootLetters[1]}</span>
                <span className="root-radical-sep" aria-hidden="true">
                  —
                </span>
                <span className="root-radical-chip">{entry.rootLetters[2]}</span>
              </div>

              <div className="root-letters-box__actions">
                <span className="root-continuous-text">
                  المادة المعجمية: <strong>({entry.rootContinuous})</strong>
                </span>
                <button
                  type="button"
                  className="btn-copy-root"
                  onClick={handleCopyRoot}
                  aria-label={`نسخ الجذر اللغوي ${entry.rootContinuous}`}
                >
                  {copiedRoot ? 'تم النسخ ✓' : 'نسخ الجذر'}
                </button>
              </div>
            </div>

            <div className="root-core-meaning">
              <span className="root-core-meaning__label">الأصل الدلالي للجذر (مقاييس اللغة):</span>
              <p className="root-core-meaning__text">{entry.rootCoreMeaning}</p>
            </div>
          </section>
        </div>

        {/* القسم الثالث: كيف تغيّرت الكلمة؟ */}
        <section
          className="panel-card panel-card--transformation"
          aria-labelledby="how-changed-heading"
        >
          <div className="panel-card__header-row">
            <div className="panel-card__section-tag">
              <span className="panel-card__section-num">٠٣</span>
              <h2 id="how-changed-heading" className="panel-card__section-title-inline">
                كيف تغيّرت الكلمة؟
              </h2>
            </div>
            <span className="panel-card__subtitle-pill">تحليلُ البنية والإعلال والإبدال</span>
          </div>

          <p className="transformation-narrative">{entry.howItChanged}</p>

          {/* مخطط بصري لمراحل التحول من الجذر إلى الكلمة */}
          <div className="transformation-pipeline" role="list" aria-label="مراحل التحول الصرفي للكلمة">
            {entry.transformationSteps.map((step, index) => (
              <div
                key={step.stage}
                className={`pipeline-step ${
                  index === entry.transformationSteps.length - 1 ? 'pipeline-step--final' : ''
                }`}
                role="listitem"
              >
                <span className="pipeline-step__stage">{step.stage}</span>
                <strong className="pipeline-step__form" dir="rtl">
                  {step.form}
                </strong>
                <p className="pipeline-step__desc">{step.explanation}</p>
              </div>
            ))}
          </div>

          {/* تفكيك حروف الكلمة للتمييز بين الأصلي والمبدل والزائد */}
          <div className="letter-anatomy">
            <div className="letter-anatomy__header">
              <h3 className="letter-anatomy__title">تشريح حروف الكلمة ({entry.word})</h3>
              <div className="letter-anatomy__legend" aria-label="مفتاح ألوان الحروف">
                <span className="legend-item legend-item--root">
                  <i aria-hidden="true" /> حرف جذر أصلي
                </span>
                <span className="legend-item legend-item--transformed">
                  <i aria-hidden="true" /> حرف منقلب أو مُبدل
                </span>
                <span className="legend-item legend-item--affix">
                  <i aria-hidden="true" /> حرف زائد للوزن
                </span>
              </div>
            </div>

            <div className="letter-anatomy__grid" role="list">
              {entry.letterBreakdown.map((item, idx) => (
                <div
                  key={`${item.char}-${idx}`}
                  className={`anatomy-card anatomy-card--${item.role}`}
                  role="listitem"
                >
                  <span className="anatomy-card__char">{item.char}</span>
                  <div className="anatomy-card__info">
                    <strong className="anatomy-card__label">{item.label}</strong>
                    <span className="anatomy-card__note">{item.originNote}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* القسم الرابع: كلمات من الجذر نفسه (ثلاث كلمات بالضبط) */}
        <section
          className="panel-card panel-card--related"
          aria-labelledby="related-words-heading"
        >
          <div className="panel-card__header-row">
            <div className="panel-card__section-tag">
              <span className="panel-card__section-num">٠٤</span>
              <h2 id="related-words-heading" className="panel-card__section-title-inline">
                كلمات من الجذر نفسه ({entry.rootDisplay})
              </h2>
            </div>
            <span className="panel-card__subtitle-pill">ثلاثة مشتقات تشترك في النَّسَب اللغوي</span>
          </div>

          <div className="related-words-grid" role="list">
            {entry.relatedWords.map((rel) => (
              <div key={rel.word} className="related-word-card" role="listitem">
                <div className="related-word-card__top">
                  <h3 className="related-word-card__word">{rel.word}</h3>
                  <span className="related-word-card__pattern">الوزن: {rel.pattern}</span>
                </div>
                <p className="related-word-card__meaning">{rel.meaning}</p>
                <div className="related-word-card__root-trace">
                  <span className="related-word-card__trace-label">أثر الجذر:</span>
                  <span>{rel.rootConnection}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* القسم الخامس: المصدر اللغوي */}
        <section
          className="panel-card panel-card--source"
          aria-labelledby="linguistic-source-heading"
        >
          <div className="panel-card__header-row">
            <div className="panel-card__section-tag">
              <span className="panel-card__section-num">٠٥</span>
              <h2 id="linguistic-source-heading" className="panel-card__section-title-inline">
                المصدر اللغوي والتوثيق المعجمي
              </h2>
            </div>
            <span className="panel-card__subtitle-pill">مرجعٌ تراثيٌّ محقّق</span>
          </div>

          <div className="source-citation-block">
            <blockquote className="source-citation-block__quote">
              {entry.sourceCitation}
            </blockquote>

            <div className="source-citation-block__footer">
              <div className="source-citation-block__bib">
                <strong className="source-citation-block__primary">{entry.sourceName}</strong>
                <span className="source-citation-block__secondary">
                  ويُنظر كذلك: {entry.secondarySourceName}
                </span>
              </div>

              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-source-link"
                aria-label={`عرض المصدر اللغوي لمادة (${entry.rootContinuous}) في معجم الدوحة التاريخي للغة العربية (يفتح في نافذة جديدة)`}
              >
                <span>عرض المصدر</span>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path
                    d="M11 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V9M10 10L17 3M17 3H12M17 3V8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* القسم السادس: التنقل والعودة إلى الشجرة */}
        <section
          className="panel-card panel-card--navigation"
          aria-label="التنقل بين الشجرة والجذور الأخرى"
        >
          <div className="navigation-footer__top">
            <div className="navigation-footer__info">
              <span className="panel-card__section-num">٠٦</span>
              <div>
                <h2 className="navigation-footer__title">مواصلة الاستكشاف في الدوحة</h2>
                <p className="navigation-footer__desc">
                  عُد إلى شجرة الجذور لاختيار ورقةٍ جديدة، أو انتقل مباشرةً إلى إحدى الكلمات الشقيقة:
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-museum btn-primary-museum--return"
              onClick={onReturnToTree}
            >
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path
                  d="M10 16V4M10 4L5 9M10 4L15 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>العودة إلى الشجرة</span>
            </button>
          </div>

          {/* شريط التنقل السريع بين الكلمات العشر */}
          <div className="quick-roots-strip" role="navigation" aria-label="انتقال سريع بين كلمات الشجرة">
            {allWords.map((item) => {
              const isCurrent = item.id === entry.id;
              const isVisited = discoveredIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`quick-root-pill ${isCurrent ? 'quick-root-pill--current' : ''} ${
                    isVisited ? 'quick-root-pill--visited' : ''
                  }`}
                  onClick={() => onSelectAnotherWord(item)}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className="quick-root-pill__word">{item.word}</span>
                  <span className="quick-root-pill__root" dir="rtl">
                    {item.rootDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
};

