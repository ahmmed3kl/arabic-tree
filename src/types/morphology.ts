export interface TransformationStep {
  stage: string;
  form: string;
  explanation: string;
}

export interface LetterAnalysis {
  char: string;
  role: 'root' | 'transformed' | 'affix';
  label: string;
  originNote: string;
}

export interface RelatedWord {
  word: string;
  pattern: string;
  meaning: string;
  rootConnection: string;
}

export interface WordEntry {
  id: string;
  /** الكلمة المعروضة على الورقة وبأعلى اللوحة */
  word: string;
  /** الكلمة بدون تشكيل للبحث والوصول السريع */
  plainWord: string;
  /** الميزان الصرفي للكلمة */
  morphologicalPattern: string;
  /** حروف الجذر الثلاثة بالترتيب الصحيح */
  rootLetters: [string, string, string];
  /** عرض الجذر بفاصل متحفي أنيق: و — ر — ث */
  rootDisplay: string;
  /** الجذر متصلاً للقارئات الصوتية والنسخ */
  rootContinuous: string;
  /** المعنى المحوري للجذر كما في مقاييس اللغة لابن فارس */
  rootCoreMeaning: string;
  /** نوع العلاقة الصرفية */
  relationshipType: string;
  /** وسم الظاهرة الصرفية البارزة */
  phenomenonBadge: string;
  /** كيف تغيّرت الكلمة؟ (الشرح الصرفي الوافي) */
  howItChanged: string;
  /** خطوات التحول الصرفي للمخطط البصري المقارن */
  transformationSteps: TransformationStep[];
  /** تفكيك حروف الكلمة بين الأصلي والمبدل والزائد */
  letterBreakdown: LetterAnalysis[];
  /** ثلاث كلمات مشتقة من الجذر نفسه بالضبط */
  relatedWords: [RelatedWord, RelatedWord, RelatedWord];
  /** اسم المصدر اللغوي المعتمد */
  sourceName: string;
  /** نص التوثيق المعجمي الدقيق */
  sourceCitation: string;
  /** رابط المصدر الموثوق */
  sourceUrl: string;
  /** اسم المرجع المساند */
  secondarySourceName: string;
  /** إحداثيات الورقة على الشجرة التوضيحية وموضع الغصن */
  leafPosition: {
    x: number;
    y: number;
    branchPathId: string;
    side: 'right' | 'left' | 'center';
    angle: number;
    branchGroupTitle: string;
  };
}

export type SceneState = 'intro' | 'tree' | 'transitioning' | 'root';

