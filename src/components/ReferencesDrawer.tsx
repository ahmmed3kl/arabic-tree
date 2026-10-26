import React, { useEffect } from 'react';
import { WordEntry } from '../types/morphology';

interface ReferencesDrawerProps {
  isOpen: boolean;
  words: WordEntry[];
  onClose: () => void;
  onSelectWordFromDrawer: (word: WordEntry) => void;
}

const CLASSICAL_SOURCES = [
  {
    title: 'لسان العرب',
    author: 'الإمام جمال الدين ابن منظور الأنصاري (ت ٧١١ هـ)',
    description:
      'أوسع معاجم العربية التراثية، جمع فيه مصنّفه أصول المواد اللغوية وشواهدها وتوجيهاتها الصرفية عن أئمة البصرة والكوفة.',
  },
  {
    title: 'معجم مقاييس اللغة',
    author: 'الإمام أبو الحسين أحمد بن فارس الرازي (ت ٣٩٥ هـ)',
    description:
      'المعجم الرائد في ردّ مفردات كلّ جذرٍ عربيّ إلى أصلٍ دلاليّ واحدٍ أو أصلين يجمعان شتات المشتقات.',
  },
  {
    title: 'تاج اللغة وصحاح العربية (الصحاح)',
    author: 'الإمام أبو نصر إسماعيل بن حمّاد الجوهري (ت ٣٩٣ هـ)',
    description:
      'عمدة المعاجم في ضبط الأبنية الصرفية وبيان ما لحق الكلمات من إعلالٍ بالقلب أو إبدالٍ في الفاء واللام.',
  },
  {
    title: 'شذا العرف في فن الصرف',
    author: 'الشيخ أحمد بن محمد الحملاوي (ت ١٣٥١ هـ)',
    description:
      'مرجعٌ محرّر في قواعد الميزان الصرفي وأحكام الإعلال والإبدال والإدغام وأبنية الأسماء المشتقة.',
  },
  {
    title: 'معجم الدوحة التاريخي للغة العربية',
    author: 'المجلس العلمي لمعجم الدوحة التاريخي',
    description:
      'البوابة المعجمية الرقمية الموثّقة المعتمدة لروابط المواد الجذرية وشواهدها التاريخية في هذا المعرض.',
  },
];

const MORPH_GLOSSARY = [
  {
    term: 'الجذر اللغوي',
    definition:
      'الأحرف الأصول الثلاثة (فاء الكلمة، وعينها، ولامها) التي تتفرّع منها الكلمات المشتقة وتشترك في معنىً كلّيّ جامع.',
  },
  {
    term: 'الإعلال بالقلب',
    definition:
      'تحويل حرف العلّة (الألف أو الواو أو الياء) إلى حرف علّةٍ آخر طلبًا للخفّة وتجانس الحركات؛ كقلب الواو ياءً في «ميزان» وأصلها «مِوْزان».',
  },
  {
    term: 'الإبدال الصرفي',
    definition:
      'جَعْلُ حرفٍ مكانَ حرفٍ آخر في الكلمة لدفع الثقل أو التنافر الصوتي؛ كإبدال الواو تاءً في «تُراث» و«اتِّصال»، وإبدال تاء الافتعال طاءً في «مُصطفى».',
  },
];

export const ReferencesDrawer: React.FC<ReferencesDrawerProps> = ({
  isOpen,
  words,
  onClose,
  onSelectWordFromDrawer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="references-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="references-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="references-modal">
        <div className="references-modal__header">
          <div>
            <span className="references-modal__kicker">توثيق المحتوى العلمي • متحف الضاد</span>
            <h2 id="references-modal-title" className="references-modal__title">
              المعاجم اللغوية والمصطلحات الصرفية
            </h2>
          </div>

          <button
            type="button"
            className="references-modal__close-btn"
            onClick={onClose}
            aria-label="إغلاق نافذة المعاجم والمصادر"
          >
            <span>إغلاق</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="references-modal__body">
          {/* قسم المصطلحات الصرفية المبسطة */}
          <section className="ref-section" aria-labelledby="glossary-heading">
            <h3 id="glossary-heading" className="ref-section__title">
              مفاتيح الفهم الصرفي في القاعة
            </h3>
            <div className="glossary-grid">
              {MORPH_GLOSSARY.map((item) => (
                <div key={item.term} className="glossary-card">
                  <strong className="glossary-card__term">{item.term}</strong>
                  <p className="glossary-card__def">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>

          {/* قسم المعاجم والمصادر المعتمدة */}
          <section className="ref-section" aria-labelledby="dictionaries-heading">
            <h3 id="dictionaries-heading" className="ref-section__title">
              المراجع اللغوية والمعجمية المعتمدة
            </h3>
            <div className="sources-list">
              {CLASSICAL_SOURCES.map((src) => (
                <div key={src.title} className="source-item-card">
                  <div className="source-item-card__head">
                    <strong className="source-item-card__title">{src.title}</strong>
                    <span className="source-item-card__author">{src.author}</span>
                  </div>
                  <p className="source-item-card__desc">{src.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* جدول الفهرس الكامل للكلمات العشر وجذورها */}
          <section className="ref-section" aria-labelledby="index-table-heading">
            <h3 id="index-table-heading" className="ref-section__title">
              ثَبَتُ الكلمات العشر وجذورها المحقّقة
            </h3>
            <div className="words-index-grid">
              {words.map((w) => (
                <div key={w.id} className="words-index-row">
                  <div className="words-index-row__main">
                    <strong className="words-index-row__word">{w.word}</strong>
                    <span className="words-index-row__root" dir="rtl">
                      {w.rootDisplay}
                    </span>
                    <span className="words-index-row__badge">{w.phenomenonBadge}</span>
                  </div>
                  <div className="words-index-row__actions">
                    <button
                      type="button"
                      className="words-index-row__btn"
                      onClick={() => {
                        onSelectWordFromDrawer(w);
                        onClose();
                      }}
                    >
                      استعراض التحليل
                    </button>
                    <a
                      href={w.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="words-index-row__link"
                    >
                      عرض المصدر ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

