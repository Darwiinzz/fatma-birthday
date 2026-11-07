/**
 * ─────────────────────────────────────────────────────────────
 *  All the words and photos of the gift live here.
 *  To add a photo: drop it in /public/photos and add an entry
 *  to `photos` below. The gallery grows automatically.
 * ─────────────────────────────────────────────────────────────
 */

export const NAME = "Fatma";

export const introLines = [
  "الهدية دي ليكي انتي ❤️",
  "كل سنة وانتي طيبة يا فاطمة.",
  "بس الأول...",
];

export const question = {
  title: "مستعدة تشوفي هديتك؟",
  yes: "YES",
  no: "NO",
  /** Shown after each "NO" press, in order. The last one repeats. */
  noReplies: [
    "متأكدة؟ 🥺",
    "طب بصي عليها دقيقة بس 😂",
    "حرام تعبت فيها 😭",
    "آخر مرة أسألك 😂",
    "خلاص… مفيش غير YES 😌",
  ],
};

export type Photo = {
  /** Path inside /public, e.g. "/photos/4.jpg" */
  src: string;
  alt: string;
  /** Each item is one line of the caption. */
  caption: string[];
  /** CSS object-position, to keep the face in frame. */
  focus?: string;
};

export const photos: Photo[] = [
  {
    src: "/photos/1.jpg",
    alt: "Fatma in a green sweater and pink glasses",
    focus: "50% 22%",
    caption: [
      "أحلى عيون شافتني...",
      "هزت السكون في قلبي.",
      "عيون متلألئة...",
      "تسحر كل اللي يبص فيها.",
    ],
  },
  {
    src: "/photos/2.jpg",
    alt: "Fatma smiling at a café",
    focus: "50% 30%",
    caption: ["متألقة من وإنتي صغيرة...", "طول عمرك ساطعة...", "وجميلة."],
  },
  {
    src: "/photos/3.jpg",
    alt: "Fatma at night",
    focus: "50% 25%",
    caption: ["Ughhh 😵‍💫", "حد يبلغ الشرطة...", "الجمال ده غير قانوني."],
  },
];

/** The final letter. Each entry is one line; "" adds a breath between stanzas. */
export const letter: string[] = [
  "بعيدًا عن إننا بقالنا سنين نعرف بعض...",
  "فزي النهارده بالظبط من سنة رجعنا نتكلم تاني.",
  "",
  "وعدى علينا سنة مرينا فيها بحاجات حلوة...",
  "وحاجات وحشة...",
  "وحاجات مؤلمة...",
  "لكن كنت سعيد إني كنت دايمًا جنبك.",
  "",
  "يا أجمل فاطمة في الدنيا.",
  "",
  "والنهارده يوم مميز...",
  "مش بس علشان عيد ميلادك...",
  "لكن علشان عيد ميلاد شخص مميز فعلًا.",
  "",
  "ولو لفينا الدنيا دي كلها...",
  "مش هنلاقي حد زيك.",
  "ولا حتى واحد في المية.",
  "",
  "أكيت...",
  "وأجمل...",
  "وأطيب شخص في الدنيا كلها.",
  "",
  "صاحبة أحن وأكيت صوت...",
  "وأجمل شخصية...",
  "وأجمل شكل.",
  "",
  "كل سنة وانتي بخير يا فاطمة.",
  "",
  "يارب السنة الجديدة تكون مليانة راحة...",
  "وفرحة...",
  "ونجاحات...",
  "وتحققي كل اللي نفسك فيه.",
  "",
  "وعايزك دايمًا تفتكري إنك تستحقي كل حاجة جميلة في الدنيا.",
  "",
  "عيد ميلاد سعيد يا أجمل فاطمة.",
  "",
  "🎂✨",
];

export const song = {
  /** Drop your file at /public/music/song.mp3 */
  src: "/music/song.mp3",
  title: "I Really Want To Stay At Your House",
  artist: "Rosa Walton",
};

export const finale = {
  title: "HAPPY BIRTHDAY",
  subtitle: "Hope this year becomes your happiest one.",
};
