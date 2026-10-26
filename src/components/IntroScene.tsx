import React from 'react';

interface IntroSceneProps {
  onEnterTree: () => void;
  onQuickSelectWord: (wordId: string) => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  onEnterTree,
  onQuickSelectWord,
}) => {
  return (
    <section
      className="intro-scene"
      aria-labelledby="intro-main-heading"
    >
      {/* خلفية الشجرة التراثية المرسومة بخطوط المخطوطات النباتية */}
      <div className="intro-scene__backdrop" aria-hidden="true">
        <svg
          className="intro-scene__botanical-silhouette"
          viewBox="0 0 900 840"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="introGlow" cx="50%" cy="46%" r="50%">
              <stop offset="0%" stopColor="#B99A5B" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#214F40" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#173D32" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E9D9B8" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#B99A5B" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#8B9B76" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <circle cx="450" cy="400" r="360" fill="url(#introGlow)" />

          {/* القوس المعماري التراثي */}
          <path
            d="M170,790 L170,340 C170,165 310,60 450,35 C590,60 730,165 730,340 L730,790"
            fill="none"
            stroke="#B99A5B"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <path
            d="M188,790 L188,346 C188,180 320,82 450,56 C580,82 712,180 712,346 L712,790"
            fill="none"
            stroke="#E9D9B8"
            strokeOpacity="0.11"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />

          {/* خط التربة الفاصل بين الظاهر والباطن */}
          <path
            d="M120,485 Q290,473 450,485 T780,485"
            fill="none"
            stroke="#B99A5B"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />

          {/* الجذع والأغصان العلوية */}
          <path
            d="M450,485 C448,415 448,350 450,260"
            fill="none"
            stroke="url(#goldStemGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M450,375 C390,345 310,295 255,220 M450,340 C515,305 595,255 645,190 M450,305 C395,255 340,185 315,125 M450,295 C500,245 555,180 585,120 M450,260 C450,200 450,150 450,105"
            fill="none"
            stroke="url(#goldStemGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* الأوراق الزخرفية الهادئة */}
          <g fill="#E9D9B8" fillOpacity="0.15" stroke="#B99A5B" strokeOpacity="0.4" strokeWidth="1">
            <path d="M255,220 C235,205 230,180 250,170 C270,180 272,205 255,220 Z" />
            <path d="M645,190 C665,175 670,150 650,140 C630,150 628,175 645,190 Z" />
            <path d="M315,125 C298,108 302,84 322,78 C338,90 335,112 315,125 Z" />
            <path d="M585,120 C602,102 598,78 578,72 C562,85 565,108 585,120 Z" />
            <path d="M450,105 C436,84 440,58 450,48 C460,58 464,84 450,105 Z" />
          </g>

          {/* الجذور الغائرة في باطن الأرض */}
          <path
            d="M450,485 C445,545 415,610 345,685 M450,485 C456,550 490,615 560,685 M450,485 C450,565 448,645 450,730 M422,555 C375,585 310,610 255,635 M478,555 C525,585 590,610 645,635"
            fill="none"
            stroke="#B99A5B"
            strokeOpacity="0.32"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* ثلاث عقد جذرية ترمز إلى الحروف الأصول الثلاثة */}
          <circle cx="345" cy="685" r="7" fill="#173D32" stroke="#B99A5B" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="450" cy="730" r="8" fill="#173D32" stroke="#B99A5B" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="560" cy="685" r="7" fill="#173D32" stroke="#B99A5B" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      </div>

      <div className="intro-scene__container">
        {/* عمود النص التقديمي الرصين */}
        <div className="intro-scene__content">
          <div className="intro-scene__identity-badge">
            <span className="intro-scene__ornament-dot" aria-hidden="true" />
            <span className="intro-scene__museum-label">متحف الضاد</span>
            <span className="intro-scene__ornament-sep" aria-hidden="true">|</span>
            <span className="intro-scene__hall-label">قاعة فقه اللغة والاشتقاق</span>
          </div>

          <h1 id="intro-main-heading" className="intro-scene__heading">
            شجرة الجذور
          </h1>

          <p className="intro-scene__lead">
            في العربيةِ لا تولدُ الألفاظُ معزولةً عن أنسابها؛ بل تتفرّعُ غصونُها من
            جذورٍ ثلاثيةٍ راسخةٍ في باطن المعجم، تكشفُ كيف تتغيّرُ بنيةُ الكلمةِ
            بالإعلالِ والإبدالِ مع بقاءِ أصلِها الدّلاليِّ حيًّا في نظائرها.
          </p>

          <div className="intro-scene__cta-row">
            <button
              type="button"
              className="btn-primary-museum"
              onClick={onEnterTree}
            >
              <span>اكتشف الجذور</span>
              <svg
                className="btn-primary-museum__icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M5 12L11 6M5 12L11 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="intro-scene__meta-note">
              <span>١٠ شواهد صرفية محقّقة</span>
              <span aria-hidden="true">•</span>
              <span>لسان العرب ومقاييس اللغة والصحاح</span>
            </div>
          </div>
        </div>

        {/* لوحة استشهادية مصغرة تحاكي بطاقات العرض المتحفي */}
        <aside className="intro-scene__specimen-card" aria-label="نموذج من المعرض">
          <div className="specimen-card__corner specimen-card__corner--tr" aria-hidden="true" />
          <div className="specimen-card__corner specimen-card__corner--tl" aria-hidden="true" />
          <div className="specimen-card__corner specimen-card__corner--br" aria-hidden="true" />
          <div className="specimen-card__corner specimen-card__corner--bl" aria-hidden="true" />

          <div className="specimen-card__header">
            <span className="specimen-card__kicker">شاهدٌ من الدوحة الصرفية</span>
            <span className="specimen-card__badge">إبدالٌ واستقرار</span>
          </div>

          <div className="specimen-card__visual">
            <div className="specimen-card__leaf-node">
              <span className="specimen-card__node-caption">اللفظ على الغصن</span>
              <strong className="specimen-card__word">تُرَاث</strong>
            </div>

            <div className="specimen-card__stem-connector" aria-hidden="true">
              <span className="specimen-card__stem-line" />
              <span className="specimen-card__stem-note">أصلها: وُرَاث</span>
              <span className="specimen-card__stem-line" />
            </div>

            <div className="specimen-card__root-node">
              <span className="specimen-card__node-caption">الجذر الكامن في التربة</span>
              <strong className="specimen-card__root" dir="rtl">
                و — ر — ث
              </strong>
            </div>
          </div>

          <p className="specimen-card__excerpt">
            «التُّراثُ: ما يُخلِّفُه الرَّجلُ لِوَرَثَتِه، والتّاءُ فيه بَدَلٌ مِن الواو.»
            <span className="specimen-card__cite">— لسان العرب لابن منظور</span>
          </p>

          <button
            type="button"
            className="specimen-card__try-btn"
            onClick={() => onQuickSelectWord('turath')}
          >
            <span>تتبّع جَذْر «تُرَاث» مباشرةً</span>
            <span aria-hidden="true">←</span>
          </button>
        </aside>
      </div>
    </section>
  );
};

