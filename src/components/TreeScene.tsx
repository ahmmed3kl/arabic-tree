import React, { useState } from 'react';
import { WordEntry } from '../types/morphology';

interface TreeSceneProps {
  words: WordEntry[];
  selectedWordId: string | null;
  isTransitioning: boolean;
  discoveredIds: Set<string>;
  onSelectWord: (word: WordEntry) => void;
}

const BRANCH_PATHS: Record<string, string> = {
  'branch-right-lower': 'M490,415 C548,382 652,335 780,250',
  'branch-right-mid': 'M490,370 C555,315 645,238 745,165',
  'branch-right-upper': 'M490,340 C535,260 595,180 655,105',
  'branch-center-right': 'M490,320 C505,240 525,155 545,78',
  'branch-center-left': 'M490,320 C475,240 455,155 435,78',
  'branch-left-upper': 'M490,340 C445,260 385,180 325,105',
  'branch-left-mid': 'M490,370 C425,315 335,238 245,165',
  'branch-left-lower': 'M490,415 C432,382 328,335 205,250',
  'branch-left-inner': 'M490,390 C440,345 390,290 335,230',
  'branch-right-inner': 'M490,390 C540,345 590,290 645,230',
};

export const TreeScene: React.FC<TreeSceneProps> = ({
  words,
  selectedWordId,
  isTransitioning,
  discoveredIds,
  onSelectWord,
}) => {
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);

  const activeWordId = selectedWordId || hoveredWordId;
  const activeWord = words.find((w) => w.id === activeWordId) || null;

  const handleLeafKeyDown = (e: React.KeyboardEvent, word: WordEntry) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectWord(word);
    }
  };

  // تجميع الكلمات حسب الأغصان للعرض المنظم على الشاشات الصغيرة
  const branchGroups = [
    {
      title: 'أغصان الميمنة — باب الواو الفائية والاصطفاء',
      subtitle: 'كلماتٌ فاءُ جذرها واوٌ أصابها الإبدال أو الإعلال، أو أُبدلت تاؤها طاءً',
      items: words.filter((w) => w.leafPosition.side === 'right'),
    },
    {
      title: 'أغصان الميسرة — باب الأجوف والناقص واللفيف',
      subtitle: 'كلماتٌ اعتلّت عينُها أو لامُها أو اجتمع فيها حرفا علّة',
      items: words.filter((w) => w.leafPosition.side === 'left'),
    },
  ];

  return (
    <section
      className={`tree-scene ${isTransitioning ? 'tree-scene--transitioning' : ''}`}
      aria-labelledby="tree-scene-heading"
    >
      {/* ترويسة المشهد وإرشاد الزائر */}
      <div className="tree-scene__header">
        <div className="tree-scene__title-group">
          <span className="tree-scene__kicker">القاعة الرئيسية • دوحة الاشتقاق العربي</span>
          <h1 id="tree-scene-heading" className="tree-scene__heading">
            شجرة الجذور اللغوية
          </h1>
        </div>

        <p className="tree-scene__instruction" role="status">
          <span className="tree-scene__instruction-dot" aria-hidden="true" />
          <span>اختر ورقة لتكتشف الجذر الكامن خلف الكلمة.</span>
        </p>
      </div>

      {/* اللوحة الفنية التفاعلية للشجرة وجذورها */}
      <div className="tree-scene__stage-wrapper">
        <div className="tree-scene__canvas-frame">
          <svg
            className="botanical-tree-svg"
            viewBox="0 0 1000 700"
            role="group"
            aria-label="رسم توضيحي لشجرة الجذور العربية وعليها عشر أوراق تفاعلية"
          >
            <defs>
              {/* إضاءة خلفية دافئة للتاج النباتي */}
              <radialGradient id="canopyHalo" cx="49%" cy="32%" r="44%">
                <stop offset="0%" stopColor="#B99A5B" stopOpacity="0.2" />
                <stop offset="55%" stopColor="#214F40" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#173D32" stopOpacity="0" />
              </radialGradient>

              {/* تدرج الجذع الخشبي المنحوت */}
              <linearGradient id="trunkWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#725A34" />
                <stop offset="35%" stopColor="#B99A5B" />
                <stop offset="65%" stopColor="#9C7F4C" />
                <stop offset="100%" stopColor="#5E492B" />
              </linearGradient>

              {/* تدرج التربة السفلية */}
              <linearGradient id="undergroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#133229" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#0E251E" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#091914" stopOpacity="1" />
              </linearGradient>

              {/* تدرج الورقة في الوضع الطبيعي */}
              <linearGradient id="leafSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F7F1E5" />
                <stop offset="100%" stopColor="#E9D9B8" />
              </linearGradient>

              {/* تدرج الورقة عند التحديد */}
              <linearGradient id="leafSelectedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF8" />
                <stop offset="60%" stopColor="#F7F1E5" />
                <stop offset="100%" stopColor="#DFC48C" />
              </linearGradient>

              {/* فلتر ظل ناعم للأوراق */}
              <filter id="leafDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#091A14" floodOpacity="0.48" />
              </filter>
            </defs>

            {/* هالة التاج */}
            <circle cx="490" cy="235" r="340" fill="url(#canopyHalo)" />

            {/* قوس محرابي زخرفي يحيط بالشجرة */}
            <path
              d="M95,505 L95,250 C95,95 275,20 490,14 C705,20 885,95 885,250 L885,505"
              fill="none"
              stroke="#B99A5B"
              strokeOpacity="0.22"
              strokeWidth="1.2"
            />
            <path
              d="M112,505 L112,255 C112,110 285,36 490,30 C695,36 868,110 868,255 L868,505"
              fill="none"
              stroke="#E9D9B8"
              strokeOpacity="0.1"
              strokeWidth="0.9"
              strokeDasharray="3 6"
            />

            {/* طبقات الوارف النباتي في خلفية التاج */}
            <g className="botanical-ambient-foliage" aria-hidden="true">
              <path
                d="M185,280 C165,190 250,105 360,85 C420,45 560,45 620,85 C730,105 815,190 795,280 C760,340 640,365 490,365 C340,365 220,340 185,280 Z"
                fill="#214F40"
                fillOpacity="0.38"
              />
              <ellipse cx="345" cy="220" rx="170" ry="105" fill="#214F40" fillOpacity="0.26" />
              <ellipse cx="635" cy="220" rx="170" ry="105" fill="#214F40" fillOpacity="0.26" />
              <ellipse cx="490" cy="145" rx="185" ry="90" fill="#8B9B76" fillOpacity="0.14" />

              {/* أوراق برعمية زخرفية صغيرة غير تفاعلية على الفروع */}
              <g fill="#8B9B76" fillOpacity="0.34" stroke="#B99A5B" strokeOpacity="0.38" strokeWidth="0.8">
                <path d="M585,310 C598,298 608,304 596,318 C586,324 578,316 585,310 Z" />
                <path d="M395,310 C382,298 372,304 384,318 C394,324 402,316 395,310 Z" />
                <path d="M705,212 C720,200 728,210 715,224 C704,230 696,220 705,212 Z" />
                <path d="M275,212 C260,200 252,210 265,224 C276,230 284,220 275,212 Z" />
                <path d="M490,162 C483,146 490,134 497,146 C501,154 494,163 490,162 Z" />
                <path d="M562,158 C574,146 582,152 572,165 C565,171 556,165 562,158 Z" />
                <path d="M418,158 C406,146 398,152 408,165 C415,171 424,165 418,158 Z" />
                <path d="M620,268 C632,258 640,266 628,278 C620,284 612,275 620,268 Z" />
                <path d="M360,268 C348,258 340,266 352,278 C360,284 368,275 360,268 Z" />
              </g>
            </g>

            {/* طبقة باطن الأرض والجذور الكامنة */}
            <g className="botanical-underground-layer">
              <path
                d="M40,505 Q265,492 490,505 T940,505 L940,685 L40,685 Z"
                fill="url(#undergroundGrad)"
              />

              {/* خطوط طبقات التربة التراثية */}
              <path
                d="M75,548 Q310,538 490,550 T905,545"
                fill="none"
                stroke="#B99A5B"
                strokeOpacity="0.14"
                strokeWidth="1"
              />
              <path
                d="M110,598 Q320,588 490,600 T870,595"
                fill="none"
                stroke="#E9D9B8"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="6 8"
              />

              {/* خط سطح التربة الفاصل */}
              <path
                d="M40,505 Q265,492 490,505 T940,505"
                fill="none"
                stroke="#B99A5B"
                strokeOpacity="0.62"
                strokeWidth="2.2"
              />

              <text
                x="895"
                y="492"
                fill="#E9D9B8"
                fillOpacity="0.72"
                fontSize="12"
                fontFamily="Thmanyah Sans, sans-serif"
                textAnchor="start"
              >
                ظاهرُ اللفظ (الأغصان والأوراق)
              </text>
              <text
                x="895"
                y="532"
                fill="#B99A5B"
                fillOpacity="0.9"
                fontSize="12"
                fontFamily="Thmanyah Sans, sans-serif"
                textAnchor="start"
              >
                باطنُ المعجم (الجذور الثلاثية)
              </text>

              {/* شبكة الجذور التحتية */}
              <g
                className={`underground-roots-network ${
                  activeWord ? 'underground-roots-network--illuminated' : ''
                }`}
              >
                {/* الجذور الفرعية */}
                <path
                  d="M472,505 C440,545 365,575 255,612 M508,505 C540,545 615,575 725,612 M445,555 C395,595 335,635 280,660 M535,555 C585,595 645,635 700,660"
                  fill="none"
                  stroke="#8B9B76"
                  strokeOpacity={activeWord ? '0.45' : '0.24'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* العروق الثلاثة الرئيسية الحاملة لحروف الجذر الثلاثة */}
                <path
                  d="M498,505 C525,548 575,585 625,625"
                  fill="none"
                  stroke={activeWord ? '#B99A5B' : '#8B9B76'}
                  strokeOpacity={activeWord ? '0.95' : '0.42'}
                  strokeWidth={activeWord ? '4.2' : '2.8'}
                  strokeLinecap="round"
                />
                <path
                  d="M490,505 C490,555 490,595 490,642"
                  fill="none"
                  stroke={activeWord ? '#B99A5B' : '#8B9B76'}
                  strokeOpacity={activeWord ? '0.95' : '0.42'}
                  strokeWidth={activeWord ? '4.5' : '3'}
                  strokeLinecap="round"
                />
                <path
                  d="M482,505 C455,548 405,585 355,625"
                  fill="none"
                  stroke={activeWord ? '#B99A5B' : '#8B9B76'}
                  strokeOpacity={activeWord ? '0.95' : '0.42'}
                  strokeWidth={activeWord ? '4.2' : '2.8'}
                  strokeLinecap="round"
                />

                {/* دوائر حروف الجذر الثلاثة في باطن التربة */}
                <g className="root-preview-nodes">
                  <g transform="translate(625, 628)">
                    <circle
                      r="24"
                      fill="#173D32"
                      stroke="#B99A5B"
                      strokeWidth={activeWord ? '2.2' : '1.3'}
                      strokeOpacity={activeWord ? '1' : '0.52'}
                    />
                    <text
                      y="7"
                      textAnchor="middle"
                      fill="#F7F1E5"
                      fontSize="20"
                      fontWeight="700"
                      fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
                    >
                      {activeWord ? activeWord.rootLetters[0] : 'ف'}
                    </text>
                  </g>

                  <g transform="translate(490, 645)">
                    <circle
                      r="26"
                      fill="#173D32"
                      stroke="#B99A5B"
                      strokeWidth={activeWord ? '2.4' : '1.3'}
                      strokeOpacity={activeWord ? '1' : '0.52'}
                    />
                    <text
                      y="8"
                      textAnchor="middle"
                      fill="#F7F1E5"
                      fontSize="21"
                      fontWeight="700"
                      fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
                    >
                      {activeWord ? activeWord.rootLetters[1] : 'ع'}
                    </text>
                  </g>

                  <g transform="translate(355, 628)">
                    <circle
                      r="24"
                      fill="#173D32"
                      stroke="#B99A5B"
                      strokeWidth={activeWord ? '2.2' : '1.3'}
                      strokeOpacity={activeWord ? '1' : '0.52'}
                    />
                    <text
                      y="7"
                      textAnchor="middle"
                      fill="#F7F1E5"
                      fontSize="20"
                      fontWeight="700"
                      fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
                    >
                      {activeWord ? activeWord.rootLetters[2] : 'ل'}
                    </text>
                  </g>
                </g>
              </g>
            </g>

            {/* الأغصان العشرة الحاملة للأوراق (تتفرع عضويًا من الجذع) */}
            <g className="botanical-branches" aria-hidden="true">
              {Object.entries(BRANCH_PATHS).map(([pathId, d]) => {
                const isBranchActive = activeWord?.leafPosition.branchPathId === pathId;
                return (
                  <g key={pathId}>
                    <path
                      d={d}
                      fill="none"
                      stroke="#9E8250"
                      strokeWidth="5.2"
                      strokeLinecap="round"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="#F7F1E5"
                      strokeWidth={isBranchActive ? '3.2' : '0'}
                      strokeOpacity={isBranchActive ? '0.95' : '0'}
                      strokeLinecap="round"
                      className="branch-highlight-path"
                    />
                  </g>
                );
              })}
            </g>

            {/* الجذع الرئيسي المنحوت المتفرع عضويًا في التاج */}
            <g className="botanical-trunk" aria-hidden="true">
              <path
                d="M444,506 C462,465 471,415 473,350 C474,325 466,295 452,265 C468,282 480,298 486,315 C488,288 489,262 490,238 C491,262 492,288 494,315 C500,298 512,282 528,265 C514,295 506,325 507,350 C509,415 518,465 536,506 Z"
                fill="url(#trunkWoodGrad)"
              />
              {/* خطوط لحاء الشجرة الدقيقة */}
              <path
                d="M482,504 C484,445 486,385 485,325 M498,504 C496,445 494,385 495,325 M468,504 C474,465 478,420 478,375 M512,504 C506,465 502,420 502,375"
                fill="none"
                stroke="#292820"
                strokeOpacity="0.38"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              {/* خيط العصارة الذهبي في قلب الجذع عند اختيار كلمة */}
              <path
                d="M490,315 L490,506"
                fill="none"
                stroke="#F7F1E5"
                strokeOpacity={activeWord ? '0.92' : '0'}
                strokeWidth="3.4"
                strokeLinecap="round"
                className="trunk-sap-line"
              />
            </g>

            {/* الأوراق التفاعلية العشر */}
            <g className="botanical-leaves-group">
              {words.map((entry) => {
                const isSelected = selectedWordId === entry.id;
                const isHovered = hoveredWordId === entry.id;
                const isDiscovered = discoveredIds.has(entry.id);
                const { x, y } = entry.leafPosition;

                return (
                  <g
                    key={entry.id}
                    className={`tree-leaf-node ${isSelected ? 'tree-leaf-node--selected' : ''} ${
                      isHovered ? 'tree-leaf-node--hovered' : ''
                    } ${isDiscovered ? 'tree-leaf-node--discovered' : ''}`}
                    transform={`translate(${x}, ${y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`كلمة ${entry.word} — اضغط لاستكشاف جذرها اللغوي (${entry.rootDisplay})`}
                    aria-pressed={isSelected}
                    onClick={() => onSelectWord(entry)}
                    onMouseEnter={() => setHoveredWordId(entry.id)}
                    onMouseLeave={() => setHoveredWordId(null)}
                    onFocus={() => setHoveredWordId(entry.id)}
                    onBlur={() => setHoveredWordId(null)}
                    onKeyDown={(e) => handleLeafKeyDown(e, entry)}
                  >
                    {/* هالة التحديد الذهبية */}
                    {(isSelected || isHovered) && (
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="68"
                        ry="33"
                        fill="none"
                        stroke="#B99A5B"
                        strokeWidth="2"
                        strokeDasharray={isSelected ? 'none' : '4 3'}
                        className="tree-leaf-node__halo"
                      />
                    )}

                    {/* جسم الورقة النباتية المرسومة */}
                    <path
                      d="M-62,0 C-46,-25 -16,-28 16,-26 C44,-24 58,-11 64,0 C58,11 44,24 16,26 C-16,28 -46,25 -62,0 Z"
                      fill={isSelected || isHovered ? 'url(#leafSelectedGrad)' : 'url(#leafSurfaceGrad)'}
                      stroke={isSelected ? '#B99A5B' : isDiscovered ? '#8B9B76' : '#B99A5B'}
                      strokeWidth={isSelected ? '2.6' : '1.5'}
                      filter="url(#leafDropShadow)"
                      className="tree-leaf-node__blade"
                    />

                    {/* عرق الورقة الداخلي */}
                    <path
                      d="M-54,0 Q0,3 54,0"
                      fill="none"
                      stroke="#B99A5B"
                      strokeOpacity="0.26"
                      strokeWidth="1"
                    />

                    {/* نقطة اتصال الورقة بالغصن */}
                    <circle
                      cx={entry.leafPosition.side === 'right' ? -58 : 58}
                      cy="0"
                      r="3.2"
                      fill="#B99A5B"
                    />

                    {/* علامة الكلمة المكتشفة سابقًا */}
                    {isDiscovered && (
                      <circle
                        cx={entry.leafPosition.side === 'right' ? 46 : -46}
                        cy="-14"
                        r="5"
                        fill="#214F40"
                        stroke="#F7F1E5"
                        strokeWidth="1.2"
                      />
                    )}

                    {/* نص الكلمة العربية بخط ثمانية */}
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#292820"
                      fontSize="19"
                      fontWeight="700"
                      fontFamily="Thmanyah Serif Display, Thmanyah Sans, serif"
                      className="tree-leaf-node__label"
                    >
                      {entry.word}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* شريط معاينة حي أسفل الشجرة يربط اللفظ بالجذر قبل الغوص */}
          <div className="tree-scene__live-bar" aria-live="polite">
            {activeWord ? (
              <div className="tree-scene__live-preview">
                <span className="tree-scene__live-tag">الورقة المختارة:</span>
                <strong className="tree-scene__live-word">{activeWord.word}</strong>
                <span className="tree-scene__live-arrow" aria-hidden="true">
                  ⟵
                </span>
                <span className="tree-scene__live-tag">الجذر الكامن:</span>
                <strong className="tree-scene__live-root" dir="rtl">
                  {activeWord.rootDisplay}
                </strong>
                <span className="tree-scene__live-badge">{activeWord.phenomenonBadge}</span>
              </div>
            ) : (
              <div className="tree-scene__live-placeholder">
                <span>مرّر المؤشر على أيّ ورقةٍ لمعاينة عِرقها الممتدّ إلى الجذر، أو انقر عليها للغوص في باطن التربة.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* فهرس الأغصان التفاعلي — مصمم خصيصًا لسهولة اللمس على الجوال والوصول السريع */}
      <div className="tree-mobile-directory" aria-label="فهرس أوراق الشجرة حسب الأغصان">
        <div className="tree-mobile-directory__intro">
          <h2 className="tree-mobile-directory__title">أغصان الدوحة وأوراقها العشر</h2>
          <p className="tree-mobile-directory__subtitle">
            يمكنك اختيار الكلمة من أوراق الشجرة أعلاه أو من تصنيف الأغصان الصرفية أدناه:
          </p>
        </div>

        <div className="tree-mobile-directory__grid">
          {branchGroups.map((group) => (
            <div key={group.title} className="branch-group-card">
              <div className="branch-group-card__header">
                <h3 className="branch-group-card__title">{group.title}</h3>
                <p className="branch-group-card__desc">{group.subtitle}</p>
              </div>
              <div className="branch-group-card__leaves">
                {group.items.map((item) => {
                  const isDiscovered = discoveredIds.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`mobile-leaf-btn ${
                        selectedWordId === item.id ? 'mobile-leaf-btn--active' : ''
                      } ${isDiscovered ? 'mobile-leaf-btn--discovered' : ''}`}
                      onClick={() => onSelectWord(item)}
                    >
                      <span className="mobile-leaf-btn__word">{item.word}</span>
                      <span className="mobile-leaf-btn__phenomenon">{item.phenomenonBadge}</span>
                      <span className="mobile-leaf-btn__action" aria-hidden="true">
                        اكتشف الجذر ←
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
