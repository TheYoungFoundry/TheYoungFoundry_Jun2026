import { StoryParagraph } from '@/types';

interface StoryElements {
  hero: { t: string; e: string; em: string };
  friend: { t: string; e: string; em: string };
  fruit: { t: string; e: string; em: string };
  color: { t: string; e: string; em: string };
  name: string;
}

type StoryTemplate = (el: StoryElements) => StoryParagraph[];

export const STORY_TEMPLATES: Record<string, StoryTemplate[]> = {
  jungle: [
    (el) => [
      {
        scene: '🌳🐒🌿',
        text: `ఒకప్పుడు [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] అనే [[అందమైన|Beautiful|✨]] జంతువు [[అడవి|Forest|🌳]]లో నివసించేది. ఆ అడవి [[పచ్చని|Green|🟢]] చెట్లతో నిండి ఉండేది. [[${el.name}|our hero|⭐]] ప్రతిరోజూ [[సంతోషంగా|Happily|😊]] ఆడుకునేది.`,
        q: {
          t: `${el.hero.t} ఎక్కడ నివసించేది?`,
          opts: ['అడవిలో', 'సముద్రంలో', 'పాఠశాలలో', 'ఊరిలో'],
          ans: 0,
        },
      },
      {
        scene: '🍎🌈💦',
        text: `ఒకరోజు, [[వర్షం|Rain|🌧️]] పడ్డాక, అడవిలో [[${el.fruit.t}|${el.fruit.e}|${el.fruit.em}]] పండ్లు [[తాజాగా|Freshly|🌿]] కనిపించాయి. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] చాలా [[ఆనందంగా|Joyfully|🎉]] వాటిని చూసింది. ఆ పండ్లు [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగులో ఉన్నాయి.`,
        q: null,
      },
      {
        scene: '👫🍃🤝',
        text: `అక్కడ [[${el.friend.t}|${el.friend.e}|${el.friend.em}]] కూడా ఉంది. అది [[ఆకలితో|Hungry|😔]] ఉంది. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] తన [[స్నేహితుడికి|Friend|💝]] పండ్లు [[పంచింది|Shared|🤝]]. ఇద్దరూ కలిసి [[రుచిగా|Deliciously|😋]] తిన్నారు.`,
        q: {
          t: 'హీరో ఏమి చేసింది?',
          opts: ['పండ్లు పంచింది', 'పారిపోయింది', 'ఏడ్చింది', 'నిద్రపోయింది'],
          ans: 0,
        },
      },
      {
        scene: '⭐🌙🏡',
        text: `రాత్రి పూట, [[నక్షత్రాలు|Stars|⭐]] [[మెరుస్తున్నాయి|Shining|✨]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] మరియు [[${el.friend.t}|${el.friend.e}|${el.friend.em}]] కలిసి [[చెట్టు|Tree|🌳]] కింద నిద్రపోయాయి. అడవి [[శాంతంగా|Peacefully|🌙]] ఉంది.`,
        q: null,
      },
      {
        scene: '🌅✨🙏',
        text: `తెల్లవారు [[సూర్యుడు|Sun|☀️]] [[ఉదయించాడు|Rose|🌅]]. అడవిలో [[పక్షులు|Birds|🐦]] [[మధురంగా|Sweetly|🎵]] పాడాయి. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] నేర్చుకుంది: [[పంచుకోవడం|Sharing|🤝]] అందరికీ [[ఆనందాన్ని|Happiness|😊]] తెస్తుంది.`,
        q: {
          t: 'కథలో నైతికం (moral) ఏమిటి?',
          opts: ['పంచుకోవడం మంచిది', 'పారిపోవడం మంచిది', 'ఒంటరిగా ఉండటం మంచిది', 'ఏడవడం మంచిది'],
          ans: 0,
        },
      },
    ],
  ],
  school: [
    (el) => [
      {
        scene: '🏫📚✏️',
        text: `[[${el.name}|our hero|⭐]] [[పాఠశాలకు|To School|🏫]] వెళ్ళే ముందు [[ఉత్సాహంగా|Excitedly|🎉]] తయారయ్యారు. [[పుస్తకాలు|Books|📚]], [[పెన్సిల్|Pencil|✏️]], [[నోట్‌బుక్|Notebook|📓]] సర్దుకున్నారు. [[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] చాలా [[మంచివారు|Kind|💝]].`,
        q: {
          t: 'పాఠశాలకు వెళ్ళే ముందు ఏమి సర్దుకున్నారు?',
          opts: ['పుస్తకాలు పెన్సిల్', 'ఆహారం నీళ్ళు', 'బొమ్మలు', 'దుస్తులు'],
          ans: 0,
        },
      },
      {
        scene: '🔢📝🤔',
        text: `తరగతిలో [[గణితం|Mathematics|🔢]] [[పరీక్ష|Exam|📝]] ఉంది. [[${el.name}|our hero|⭐]]కి [[భయంగా|Fearfully|😨]] అనిపించింది. కానీ [[స్నేహితుడు|Friend|👫]] "[[ధైర్యంగా|Bravely|💪]] ఉండు" అన్నాడు.`,
        q: null,
      },
      {
        scene: '📖💡🌟',
        text: `[[${el.name}|our hero|⭐]] [[రాత్రి|Night|🌙]] అంతా [[చదివారు|Studied|📖]]. [[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] [[పాఠం|Lesson|📚]] [[శ్రద్ధగా|Carefully|🎯]] వినారు. [[కష్టపడి|Hardwork|💪]] [[చదివితే|Study|📖]] [[విజయం|Success|🏆]] వస్తుంది.`,
        q: {
          t: 'రాత్రి ఏమి చేశారు?',
          opts: ['చదివారు', 'నిద్రపోయారు', 'ఆడుకున్నారు', 'తిన్నారు'],
          ans: 0,
        },
      },
      {
        scene: '🎉✅🥇',
        text: `[[పరీక్ష|Exam|📝]] రోజు వచ్చింది. [[${el.name}|our hero|⭐]] [[ధైర్యంగా|Bravely|💪]] అన్ని [[ప్రశ్నలు|Questions|❓]] రాశారు. [[ఫలితాలు|Results|📊]] వచ్చాయి — [[100 మార్కులు|Full marks|🥇]] వచ్చాయి!`,
        q: null,
      },
      {
        scene: '🌟💝🙏',
        text: `[[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] [[శాబాష్|Well done|👏]] అన్నారు. [[అమ్మా నాన్న|Parents|👨‍👩]] [[సంతోషపడ్డారు|Rejoiced|😊]]. [[${el.name}|our hero|⭐]] నేర్చుకుంది: [[కష్టపడితే|Hard work|💪]] [[గెలుపు|Victory|🏆]] తప్పదు.`,
        q: {
          t: 'ఎంత మార్కులు వచ్చాయి?',
          opts: ['100 మార్కులు', '50 మార్కులు', '0 మార్కులు', '75 మార్కులు'],
          ans: 0,
        },
      },
    ],
  ],
};
