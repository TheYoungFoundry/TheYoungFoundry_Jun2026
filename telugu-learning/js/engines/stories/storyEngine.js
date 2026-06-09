import { loadData } from '../../data/loader.js';
import { pick } from '../../utils.js';
import { GRADE_PROFILE } from '../difficulty/difficultyManager.js';
import { launchConfetti } from '../../utils.js';

export const STORY_THEMES = [
  {id:'jungle',    name:'అడవి కథ',    eng:'Jungle',        em:'🌳', color:'#166534', bg:'#dcfce7'},
  {id:'school',    name:'పాఠశాల కథ',  eng:'School',        em:'🏫', color:'#1e40af', bg:'#dbeafe'},
  {id:'festival',  name:'పండుగ కథ',   eng:'Festival',      em:'🪔', color:'#92400e', bg:'#fef3c7'},
  {id:'farm',      name:'రైతు కథ',    eng:'Farm Life',     em:'🌾', color:'#166534', bg:'#dcfce7'},
  {id:'sea',       name:'సముద్రం కథ', eng:'Sea Adventure', em:'🌊', color:'#1e40af', bg:'#dbeafe'},
  {id:'sky',       name:'ఆకాశం కథ',   eng:'Sky & Birds',   em:'🦅', color:'#4c1d95', bg:'#ede9fe'},
  {id:'friendship',name:'స్నేహం కథ',  eng:'Friendship',    em:'💝', color:'#9f1239', bg:'#ffe4e6'},
  {id:'courage',   name:'ధైర్యం కథ',  eng:'Courage',       em:'🦁', color:'#7c2d12', bg:'#fed7aa'},
  {id:'magic',     name:'మాయా కథ',    eng:'Magical',       em:'✨', color:'#4c1d95', bg:'#ede9fe'},
  {id:'village',   name:'ఊరి కథ',     eng:'Village Life',  em:'🏡', color:'#166534', bg:'#dcfce7'},
  {id:'surprise',  name:'Surprise Me!',eng:'Random',        em:'🎲', color:'#fff', bg:'#0F1D32', special:true}
];

export const STORY_CHARS = [
  {t:'కోతి',    e:'Monkey',   em:'🐒', type:'animal'},
  {t:'గుర్రం',  e:'Horse',    em:'🐎', type:'animal'},
  {t:'ఏనుగు',  e:'Elephant', em:'🐘', type:'animal'},
  {t:'కుందేలు',e:'Rabbit',   em:'🐇', type:'animal'},
  {t:'నెమలి',  e:'Peacock',  em:'🦚', type:'bird'},
  {t:'చిలుక',  e:'Parrot',   em:'🦜', type:'bird'},
  {t:'పిల్లి',  e:'Cat',      em:'🐱', type:'animal'},
  {t:'కుక్క',  e:'Dog',      em:'🐶', type:'animal'},
];

const STORY_TEMPLATES = {
  jungle: [
    (el) => [
      {scene:'🌳🐒🌿', text:`ఒకప్పుడు [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] అనే [[అందమైన|Beautiful|✨]] జంతువు [[అడవి|Forest|🌳]]లో నివసించేది. ఆ అడవి [[పచ్చని|Green|🟢]] చెట్లతో నిండి ఉండేది. [[${el.name}|our hero|⭐]] ప్రతిరోజూ [[సంతోషంగా|Happily|😊]] ఆడుకునేది.`, q:{t:`${el.hero.t} ఎక్కడ నివసించేది?`, opts:['అడవిలో','సముద్రంలో','పాఠశాలలో','ఊరిలో'], ans:0}},
      {scene:'🍎🌈💦', text:`ఒకరోజు, [[వర్షం|Rain|🌧️]] పడ్డాక, అడవిలో [[${el.fruit.t}|${el.fruit.e}|${el.fruit.em}]] పండ్లు [[తాజాగా|Freshly|🌿]] కనిపించాయి. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] చాలా [[ఆనందంగా|Joyfully|🎉]] వాటిని చూసింది. ఆ పండ్లు [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగులో ఉన్నాయి.`, q:null},
      {scene:'👫🍃🤝', text:`అక్కడ [[${el.friend.t}|${el.friend.e}|${el.friend.em}]] కూడా ఉంది. అది [[ఆకలితో|Hungry|😔]] ఉంది. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] తన [[స్నేహితుడికి|Friend|💝]] పండ్లు [[పంచింది|Shared|🤝]]. ఇద్దరూ కలిసి [[రుచిగా|Deliciously|😋]] తిన్నారు.`, q:{t:'హీరో ఏమి చేసింది?', opts:['పండ్లు పంచింది','పారిపోయింది','ఏడ్చింది','నిద్రపోయింది'], ans:0}},
      {scene:'⭐🌙🏡', text:`రాత్రి పూట, [[నక్షత్రాలు|Stars|⭐]] [[మెరుస్తున్నాయి|Shining|✨]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] మరియు [[${el.friend.t}|${el.friend.e}|${el.friend.em}]] కలిసి [[చెట్టు|Tree|🌳]] కింద నిద్రపోయాయి. అడవి [[శాంతంగా|Peacefully|🌙]] ఉంది.`, q:null},
      {scene:'🌅✨🙏', text:`తెల్లవారు [[సూర్యుడు|Sun|☀️]] [[ఉదయించాడు|Rose|🌅]]. అడవిలో [[పక్షులు|Birds|🐦]] [[మధురంగా|Sweetly|🎵]] పాడాయి. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] నేర్చుకుంది: [[పంచుకోవడం|Sharing|🤝]] అందరికీ [[ఆనందాన్ని|Happiness|😊]] తెస్తుంది.`, q:{t:'కథలో నైతికం (moral) ఏమిటి?', opts:['పంచుకోవడం మంచిది','పారిపోవడం మంచిది','ఒంటరిగా ఉండటం మంచిది','ఏడవడం మంచిది'], ans:0}}
    ]
  ],
  school: [
    (el) => [
      {scene:'🏫📚✏️', text:`[[${el.name}|our hero|⭐]] [[పాఠశాలకు|To School|🏫]] వెళ్ళే ముందు [[ఉత్సాహంగా|Excitedly|🎉]] తయారయ్యారు. [[పుస్తకాలు|Books|📚]], [[పెన్సిల్|Pencil|✏️]], [[నోట్‌బుక్|Notebook|📓]] సర్దుకున్నారు. [[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] చాలా [[మంచివారు|Kind|💝]].`, q:{t:'పాఠశాలకు వెళ్ళే ముందు ఏమి సర్దుకున్నారు?', opts:['పుస్తకాలు పెన్సిల్','ఆహారం నీళ్ళు','బొమ్మలు','దుస్తులు'], ans:0}},
      {scene:'🔢📝🤔', text:`తరగతిలో [[గణితం|Mathematics|🔢]] [[పరీక్ష|Exam|📝]] ఉంది. [[${el.name}|our hero|⭐]]కి [[భయంగా|Fearfully|😨]] అనిపించింది. కానీ [[స్నేహితుడు|Friend|👫]] "[[ధైర్యంగా|Bravely|💪]] ఉండు" అన్నాడు.`, q:null},
      {scene:'📖💡🌟', text:`[[${el.name}|our hero|⭐]] [[రాత్రి|Night|🌙]] అంతా [[చదివారు|Studied|📖]]. [[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] [[పాఠం|Lesson|📚]] [[శ్రద్ధగా|Carefully|🎯]] వినారు. [[కష్టపడి|Hardwork|💪]] [[చదివితే|Study|📖]] [[విజయం|Success|🏆]] వస్తుంది.`, q:{t:'రాత్రి ఏమి చేశారు?', opts:['చదివారు','నిద్రపోయారు','ఆడుకున్నారు','తిన్నారు'], ans:0}},
      {scene:'🎉✅🥇', text:`[[పరీక్ష|Exam|📝]] రోజు వచ్చింది. [[${el.name}|our hero|⭐]] [[ధైర్యంగా|Bravely|💪]] అన్ని [[ప్రశ్నలు|Questions|❓]] రాశారు. [[ఫలితాలు|Results|📊]] వచ్చాయి — [[100 మార్కులు|Full marks|🥇]] వచ్చాయి!`, q:null},
      {scene:'🌟💝🙏', text:`[[ఉపాధ్యాయుడు|Teacher|👨‍🏫]] [[శాబాష్|Well done|👏]] అన్నారు. [[అమ్మా నాన్న|Parents|👨‍👩]] [[సంతోషపడ్డారు|Rejoiced|😊]]. [[${el.name}|our hero|⭐]] నేర్చుకుంది: [[కష్టపడితే|Hard work|💪]] [[గెలుపు|Victory|🏆]] తప్పదు.`, q:{t:'ఎంత మార్కులు వచ్చాయి?', opts:['100 మార్కులు','50 మార్కులు','0 మార్కులు','75 మార్కులు'], ans:0}}
    ]
  ],
  festival: [
    (el) => [
      {scene:'🪔🎉🌺', text:`[[దీపావళి|Diwali|🪔]] వస్తున్న వేళ ఊరు అంతా [[సంతోషంగా|Happily|😊]] ఉంది. [[${el.name}|our hero|⭐]] [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగు [[దుస్తులు|Clothes|👗]] వేసుకున్నారు. ఇళ్ళు అన్నీ [[రంగురంగుల|Colorful|🌈]] [[దీపాలతో|Lamps|💡]] [[వెలిగాయి|Glowed|✨]].`, q:{t:'ఏ పండుగ వచ్చింది?', opts:['దీపావళి','సంక్రాంతి','హోలీ','ఉగాది'], ans:0}},
      {scene:'🍬🍫🎁', text:`[[${el.name}|our hero|⭐]] [[ఇంటింటికీ|House to house|🏠]] [[స్నేహితులకు|Friends|👫]] [[మిఠాయిలు|Sweets|🍬]] [[పంచారు|Distributed|🤝]]. ఆ [[మిఠాయిలు|Sweets|🍬]] [[తీపిగా|Sweetly|😋]] ఉన్నాయి. అందరి [[ముఖాలు|Faces|😊]] [[వెలిగిపోయాయి|Glowed|✨]].`, q:null},
      {scene:'🎆🎇🥳', text:`రాత్రి [[టపాసులు|Fireworks|🎆]] [[పేల్చారు|Burst|💥]]. [[ఆకాశం|Sky|🌌]] [[రంగురంగుల|Colorful|🌈]] [[వెలుతురులో|Lights|💡]] [[మెరిసింది|Sparkled|✨]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] కూడా [[ఆనందంగా|Joyfully|🎉]] [[నాట్యమాడింది|Danced|💃]].`, q:{t:'రాత్రి ఏమి చేశారు?', opts:['టపాసులు పేల్చారు','నిద్రపోయారు','చదివారు','ఏడ్చారు'], ans:0}},
      {scene:'🙏👨‍👩‍👧‍👦💖', text:`[[అందరూ|Everyone|👨‍👩‍👧‍👦]] కలిసి [[ప్రార్థన|Prayer|🙏]] చేశారు. [[పెద్దలు|Elders|👴]] [[దీవించారు|Blessed|🙏]]. [[${el.name}|our hero|⭐]] [[కృతజ్ఞత|Gratitude|💖]] అనుభవించారు.`, q:null},
      {scene:'🌟🤝💝', text:`[[పండుగ|Festival|🎉]] ముగిసింది. [[${el.name}|our hero|⭐]] [[అర్థం|Understood|💡]] చేసుకున్నారు: [[పండుగలు|Festivals|🪔]] [[అందరినీ|Everyone|👨‍👩‍👧‍👦]] [[కలిపే|Unite|🤝]] సందర్భాలు. [[ప్రేమ|Love|💝]] మరియు [[సంతోషం|Happiness|😊]] [[పంచుకోవాలి|Share|🤝]].`, q:{t:'కథ నైతికం ఏమిటి?', opts:['పండుగలు అందరినీ కలిపే సందర్భాలు','పండుగలలో మాత్రమే తినాలి','టపాసులు పేల్చడం ముఖ్యం','ఒంటరిగా జరుపుకోవాలి'], ans:0}}
    ]
  ],
  farm: [
    (el) => [
      {scene:'🌾🚜🌅', text:`[[${el.name}|our hero|⭐]] [[రైతు|Farmer|🌾]] కుటుంబంలో పుట్టారు. [[తెల్లవారు|Dawn|🌅]] అవ్వగానే [[పొలానికి|To the field|🌾]] వెళ్ళేవారు. [[మట్టి|Soil|🌍]] వాసన [[మనసుకు|To the heart|💚]] ఆహ్లాదంగా అనిపించేది.`, q:{t:'ఏ కుటుంబంలో పుట్టారు?', opts:['రైతు కుటుంబంలో','వ్యాపారి కుటుంబంలో','డాక్టర్ కుటుంబంలో','ఉపాధ్యాయ కుటుంబంలో'], ans:0}},
      {scene:'💧🌱🌞', text:`[[వర్షాకాలం|Monsoon|🌧️]] రావడంతో [[పంట|Crop|🌾]] [[నాటారు|Planted|🌱]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[పొలానికి|Field|🌾]] [[నీళ్ళు|Water|💧]] [[తోడింది|Drew water|🪣]]. [[సూర్యుడు|Sun|☀️]] [[వేడిగా|Warmly|🌡️]] [[వెలిగాడు|Shone|🌞]].`, q:null},
      {scene:'🌿🐛🌼', text:`[[పంట|Crop|🌾]] [[పెరుగుతున్నది|Growing|📈]]. కానీ [[పురుగులు|Insects|🐛]] [[చేటు|Damage|⚠️]] చేస్తున్నాయి. [[${el.name}|our hero|⭐]] [[సహజమైన|Natural|🌿]] [[మందులు|Medicines|💊]] వాడారు. [[పర్యావరణం|Environment|🌍]] రక్షించారు.`, q:{t:'పంటకు ఏమి సమస్య వచ్చింది?', opts:['పురుగులు చేటు చేస్తున్నాయి','వర్షం రాలేదు','భూమి లేదు','విత్తనాలు లేవు'], ans:0}},
      {scene:'🌾🎉🏠', text:`[[పంట|Crop|🌾]] [[పండింది|Ripened|🌾]]! ఊరంతా [[సంతోషించింది|Rejoiced|🎉]]. [[${el.name}|our hero|⭐]] [[పొరుగువారికి|Neighbors|🏘️]] [[ధాన్యం|Grain|🌾]] [[పంచారు|Shared|🤝]]. [[కలిసి|Together|🤝]] [[వంట|Cooking|🍳]] చేసి [[తిన్నారు|Ate|😋]].`, q:null},
      {scene:'💪🌍🙏', text:`[[${el.name}|our hero|⭐]] [[నేర్చుకున్నారు|Learned|📚]]: [[రైతు|Farmer|🌾]] [[శ్రమ|Hardwork|💪]] వల్లే [[ఆహారం|Food|🍽️]] దొరుకుతుంది. [[మన్ను|Soil|🌍]] [[దేవుడు|God|🙏]] — దానిని [[గౌరవించాలి|Respect|🙏]].`, q:{t:'రైతు శ్రమ వల్ల ఏమి దొరుకుతుంది?', opts:['ఆహారం','డబ్బు','బంగారం','పుస్తకాలు'], ans:0}}
    ]
  ],
  sea: [
    (el) => [
      {scene:'🌊⛵🐟', text:`[[${el.name}|our hero|⭐]] [[సముద్రం|Sea|🌊]] [[తీరానికి|Seashore|🏖️]] వెళ్ళారు. [[అలలు|Waves|🌊]] [[ఘర్జిస్తున్నాయి|Roaring|🔊]]. [[ఇసుక|Sand|🏖️]] [[మృదువుగా|Softly|🤍]] [[అడుగులకు|Under feet|👣]] అనిపించింది. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[నీటిలో|In water|💧]] [[ఆడింది|Played|🏊]].`, q:{t:'ఎక్కడికి వెళ్ళారు?', opts:['సముద్రం తీరానికి','అడవికి','పాఠశాలకు','పొలానికి'], ans:0}},
      {scene:'🐠🐡🦀', text:`సముద్రంలో [[రంగురంగుల|Colorful|🌈]] [[చేపలు|Fish|🐟]] కనిపించాయి. [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగు [[పగడాలు|Corals|🪸]] [[అందంగా|Beautifully|✨]] ఉన్నాయి. [[పీత|Crab|🦀]] [[పక్కకు|Sideways|↔️]] [[నడుస్తోంది|Walking|🚶]].`, q:null},
      {scene:'⚡🌧️🆘', text:`అకస్మాత్తుగా [[తుఫాను|Storm|⚡]] వచ్చింది. [[అలలు|Waves|🌊]] [[పెద్దవయ్యాయి|Got bigger|📈]]. [[${el.name}|our hero|⭐]] [[భయపడ్డారు|Got scared|😨]]. కానీ [[మత్స్యకారుడు|Fisherman|🎣]] [[సహాయం|Help|🤝]] చేశాడు.`, q:{t:'అకస్మాత్తుగా ఏమి వచ్చింది?', opts:['తుఫాను','వర్షం','సూర్యుడు','నక్షత్రాలు'], ans:0}},
      {scene:'🌈☀️🙌', text:`[[తుఫాను|Storm|⚡]] తగ్గింది. [[ఇంద్రధనుస్సు|Rainbow|🌈]] [[కనిపించింది|Appeared|👀]]. [[${el.name}|our hero|⭐]] [[మత్స్యకారుడికి|Fisherman|🎣]] [[ధన్యవాదాలు|Thanked|🙏]] చెప్పారు. [[సమస్య|Problem|⚠️]] [[పరిష్కారమైంది|Solved|✅]].`, q:null},
      {scene:'🌊💙🌟', text:`[[${el.name}|our hero|⭐]] [[సముద్రం|Sea|🌊]] [[నేర్పింది|Taught|📚]]: [[ప్రకృతి|Nature|🌍]] [[బలమైనది|Powerful|💪]]. దానిని [[గౌరవిస్తే|If we respect|🙏]] అది [[రక్షిస్తుంది|Protects|🛡️]]. [[సహాయం|Help|🤝]] ఎప్పుడూ [[సమయానికి|In time|⏰]] వస్తుంది.`, q:{t:'సముద్రం నేర్పిన నైతికం ఏమిటి?', opts:['ప్రకృతిని గౌరవించాలి','సముద్రానికి వెళ్ళకూడదు','చేపలు తినాలి','నీళ్ళలో ఆడకూడదు'], ans:0}}
    ]
  ],
  friendship: [
    (el) => [
      {scene:'👫😊🌸', text:`[[${el.name}|our hero|⭐]] [[కొత్త|New|✨]] [[ఊరికి|Village|🏘️]] [[వెళ్ళారు|Went|🚶]]. [[అక్కడ|There|📍]] [[ఒంటరిగా|Lonely|😔]] అనిపించింది. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[స్నేహంగా|Friendly|💝]] [[దగ్గరికి|Nearby|📍]] వచ్చింది.`, q:{t:'ఎక్కడికి వెళ్ళారు?', opts:['కొత్త ఊరికి','పాఠశాలకు','అడవికి','సముద్రానికి'], ans:0}},
      {scene:'🎮🎨🌟', text:`[[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[ఆడుకోవడానికి|To play|🎮]] [[పిలిచింది|Invited|📢]]. [[${el.name}|our hero|⭐]] [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగుతో [[బొమ్మలు|Drawings|🎨]] [[గీశారు|Drew|✏️]]. [[అందమైన|Beautiful|✨]] [[స్నేహం|Friendship|💝]] [[మొదలైంది|Started|🌱]].`, q:null},
      {scene:'😢🤝💪', text:`ఒకరోజు [[${el.name}|our hero|⭐]] [[విచారంగా|Sadly|😢]] ఉన్నారు. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[కారణం|Reason|❓]] [[అడిగింది|Asked|🗣️]]. [[${el.fruit.t}|${el.fruit.e}|${el.fruit.em}]] తెచ్చి [[ఇచ్చింది|Gave|🤝]]. [[బాధ|Sadness|😢]] [[తగ్గింది|Reduced|📉]].`, q:{t:'స్నేహితుడు ఏమి చేశాడు?', opts:['ఫలం తెచ్చి ఇచ్చింది','పారిపోయింది','ఏడ్చింది','నిద్రపోయింది'], ans:0}},
      {scene:'🏆🌈🎉', text:`[[పాఠశాలలో|In school|🏫]] [[పోటీ|Competition|🏆]] జరిగింది. [[ఇద్దరూ|Both|👫]] [[కలిసి|Together|🤝]] [[ప్రయత్నించారు|Tried|💪]]. [[మొదటి|First|🥇]] [[స్థానం|Position|🏆]] [[వచ్చింది|Got|✅]]! [[అందరూ|Everyone|👏]] [[అభినందించారు|Congratulated|🎉]].`, q:null},
      {scene:'💝🌟🤝', text:`[[${el.name}|our hero|⭐]] [[నేర్చుకున్నారు|Learned|📚]]: [[నిజమైన|True|💯]] [[స్నేహితుడు|Friend|💝]] [[సుఖంలో|In happiness|😊]] మాత్రమే కాదు, [[దుఃఖంలో|In sadness|😢]] కూడా [[పక్కన|Beside|🤝]] ఉంటారు.`, q:{t:'నిజమైన స్నేహం అంటే ఏమిటి?', opts:['సుఖదుఃఖాల్లో పక్కన ఉండటం','సుఖంలో మాత్రమే ఉండటం','ఎప్పుడూ తినడం','కలిసి ఆడటం'], ans:0}}
    ]
  ],
  courage: [
    (el) => [
      {scene:'😨🌑❓', text:`[[${el.name}|our hero|⭐]] ఒక [[సమస్య|Problem|⚠️]]ను చూసి [[భయపడ్డారు|Got scared|😨]]. రాత్రి [[చీకటి|Darkness|🌑]] [[మనసులో|In mind|💭]] [[భయాన్ని|Fear|😨]] [[నింపింది|Filled|📥]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] "[[ధైర్యంగా|Bravely|💪]] ఉండు" అని [[చెప్పింది|Said|🗣️]].`, q:{t:'హీరో ఎందుకు భయపడ్డారు?', opts:['సమస్య చూసి','చీకటిలో','అడవిలో','సముద్రంలో'], ans:0}},
      {scene:'🌟💡🗡️', text:`[[${el.name}|our hero|⭐]] [[నిద్రపోలేదు|Couldn\'t sleep|😴]]. [[పరిష్కారం|Solution|💡]] [[ఆలోచించారు|Thought|🤔]]. [[రేపు|Tomorrow|📅]] [[ఎదుర్కొంటాను|I will face it|💪]] అని [[నిర్ణయించుకున్నారు|Decided|✅]].`, q:null},
      {scene:'🤝💪🌅', text:`[[తెల్లవారు|Dawn|🌅]] [[సమస్యను|The problem|⚠️]] [[ఎదుర్కొన్నారు|Faced|💪]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[పక్కన|Beside|🤝]] నిలబడింది. [[ఇద్దరూ|Both|👫]] [[కలిసి|Together|🤝]] [[పని|Work|🔧]] చేశారు. [[సమస్య|Problem|⚠️]] [[పరిష్కారమైంది|Solved|✅]]!`, q:{t:'సమస్యను ఎలా పరిష్కరించారు?', opts:['కలిసి పని చేసి','పారిపోయి','ఏడ్చి','నిద్రపోయి'], ans:0}},
      {scene:'🎊🏆🌈', text:`[[ఊరి|Village|🏘️]] [[ప్రజలు|People|👨‍👩‍👧‍👦]] [[సంతోషించారు|Rejoiced|🎉]]. [[పెద్దలు|Elders|👴]] [[మెచ్చుకున్నారు|Praised|👏]]. [[${el.name}|our hero|⭐]] [[గర్వంగా|Proudly|😤]] [[నిలబడ్డారు|Stood|💪]].`, q:null},
      {scene:'💪🦁✨', text:`[[${el.name}|our hero|⭐]] [[గ్రహించారు|Realized|💡]]: [[భయం|Fear|😨]] అనేది [[మనసులో|In the mind|💭]] ఉంటుంది. [[ధైర్యం|Courage|💪]] అంటే [[భయం|Fear|😨]] లేకపోవడం కాదు — [[భయాన్ని|Fear|😨]] [[అధిగమించడం|Overcoming|🏆]].`, q:{t:'ధైర్యం అంటే ఏమిటి?', opts:['భయాన్ని అధిగమించడం','భయం లేకపోవడం','పారిపోవడం','నిద్రపోవడం'], ans:0}}
    ]
  ],
  magic: [
    (el) => [
      {scene:'✨🌙🔮', text:`ఒక [[మాయా|Magical|✨]] [[రాజ్యంలో|Kingdom|🏰]] [[${el.name}|our hero|⭐]] నివసించేవారు. అక్కడ [[మాట్లాడే|Talking|🗣️]] [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] ఉండేది. [[${el.color.t}|${el.color.e}|${el.color.em}]] రంగు [[మేఘాలు|Clouds|☁️]] [[ఆకాశంలో|In the sky|🌌]] తిరిగేవి.`, q:{t:'ఏ రాజ్యంలో నివసించేవారు?', opts:['మాయా రాజ్యంలో','సాధారణ ఊరిలో','అడవిలో','సముద్రంలో'], ans:0}},
      {scene:'🔑🗝️🚪', text:`ఒక [[మాయా|Magic|✨]] [[తోట|Garden|🌺]]లో [[అద్భుతమైన|Wonderful|🌟]] [[${el.fruit.t}|${el.fruit.e}|${el.fruit.em}]] పండు ఉంది. దాన్ని [[తింటే|If eaten|😋]] ఒక [[కోరిక|Wish|💫]] [[తీరుతుంది|Comes true|✅]]. కానీ [[స్వార్థంగా|Selfishly|😒]] వాడకూడదు.`, q:null},
      {scene:'🌟💭🤔', text:`[[${el.name}|our hero|⭐]] [[ఆలోచించారు|Thought|🤔]]: "ఈ [[కోరికను|Wish|💫]] [[అందరి కోసం|For everyone|👨‍👩‍👧‍👦]] వాడతాను." [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[సంతోషంగా|Happily|😊]] [[తోక|Tail|🦊]] [[ఊపింది|Wagged|😊]].`, q:{t:'కోరికను ఎవరి కోసం వాడాలని నిర్ణయించారు?', opts:['అందరి కోసం','తమకోసం మాత్రమే','రాజు కోసం','పక్షుల కోసం'], ans:0}},
      {scene:'🌈🏘️💖', text:`[[కోరిక|Wish|💫]] [[నెరవేరింది|Fulfilled|✅]]! [[ఊరికి|Village|🏘️]] [[నీళ్ళు|Water|💧]] వచ్చాయి. [[చెట్లు|Trees|🌳]] [[పచ్చగా|Green|🟢]] [[మారాయి|Turned|🌿]]. [[ప్రజలు|People|👨‍👩‍👧‍👦]] [[సంతోషించారు|Rejoiced|🎉]].`, q:null},
      {scene:'🌟✨💫', text:`[[మాయా|Magic|✨]] [[అంటే|Means|💡]] ఏమిటి? నిజమైన మాయ [[పరోపకారం|Helping others|🤝]] చేయడం. [[ఇచ్చే|Giving|🎁]] మనిషి [[మాయా|Magic|✨]] [[లాంటివాడు|Like magic|✨]].`, q:{t:'నిజమైన మాయ అంటే ఏమిటి?', opts:['పరోపకారం చేయడం','మాయలు చేయడం','కోరికలు అడగడం','సంపద కూడబెట్టడం'], ans:0}}
    ]
  ],
  sky: [
    (el) => [
      {scene:'☀️🦅🌥️', text:`[[ఆకాశంలో|In the sky|🌌]] [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[స్వేచ్ఛగా|Freely|🕊️]] [[ఎగురుతోంది|Flying|✈️]]. [[${el.name}|our hero|⭐]] కిందనుంచి [[చూస్తున్నారు|Watching|👀]]. "ఎప్పటికైనా [[ఎగరాలని|To fly|✈️]] ఉంది!" అని [[కలలు కన్నారు|Dreamed|💭]].`, q:{t:'కింద నుండి ఏమి చూస్తున్నారు?', opts:['పక్షి ఎగురుతోంది','మేఘాలు','సూర్యుడు','వర్షం'], ans:0}},
      {scene:'📚🌟🔭', text:`[[${el.name}|our hero|⭐]] [[పక్షుల|Birds|🐦]] [[గురించి|About|📖]] [[చదివారు|Read|📚]]. [[నెమలి|Peacock|🦚]] [[నృత్యం|Dance|💃]], [[కోయిల|Cuckoo|🐦]] [[పాట|Song|🎵]], [[గద్ద|Eagle|🦅]] [[వేగం|Speed|⚡]] — అన్నీ [[అద్భుతంగా|Wonderfully|🌟]] అనిపించాయి.`, q:null},
      {scene:'🦜🗣️💡', text:`[[చిలుక|Parrot|🦜]] వచ్చి "[[ఎగరాలంటే|To fly|✈️]] [[రెక్కలు|Wings|🪽]] [[కావాలి|Need|✅]]. రెక్కలు లేకున్నా [[కలలు|Dreams|💭]] [[ఎగరవచ్చు|Can fly|✈️]]!" అని [[చెప్పింది|Said|🗣️]]. [[${el.name}|our hero|⭐]] [[ఆశ్చర్యపడ్డారు|Got surprised|😲]].`, q:{t:'చిలుక ఏం చెప్పింది?', opts:['కలలు ఎగరవచ్చు','ఎగరలేవు','నీళ్ళల్లో ఈదవచ్చు','పాటలు పాడవచ్చు'], ans:0}},
      {scene:'🚀📖🌍', text:`[[${el.name}|our hero|⭐]] [[శాస్త్రం|Science|🔬]] [[చదివారు|Studied|📚]]. [[రేపు|Tomorrow|📅]] [[శాస్త్రవేత్త|Scientist|🔬]] అవుతానని [[నిర్ణయించుకున్నారు|Decided|✅]]. [[రాకెట్|Rocket|🚀]] [[నిర్మించాలని|To build|🔧]] [[కలలు కన్నారు|Dreamed|💭]].`, q:null},
      {scene:'💪🌟🛸', text:`[[${el.name}|our hero|⭐]] [[నేర్చుకున్నారు|Learned|📚]]: [[కలలు|Dreams|💭]] [[రెక్కలు|Wings|🪽]] లాంటివి — [[నిన్ను|You|👤]] [[ఎత్తిపడతాయి|Lift you|🚀]]. [[కష్టపడి|Work hard|💪]] [[చదివితే|If you study|📚]] ఏ [[లక్ష్యమైనా|Goal|🎯]] [[చేరుకోవచ్చు|Can reach|✅]].`, q:{t:'కలలు దేనిలాంటివి?', opts:['రెక్కల లాంటివి','రాళ్ళ లాంటివి','నీళ్ళ లాంటివి','మేఘాల లాంటివి'], ans:0}}
    ]
  ],
  village: [
    (el) => [
      {scene:'🏡🌳🌅', text:`[[${el.name}|our hero|⭐]] [[అందమైన|Beautiful|✨]] [[పల్లెలో|Village|🏡]] [[నివసించేవారు|Lived|🏠]]. [[మట్టి|Clay|🌍]] [[ఇళ్ళు|Houses|🏠]], [[పచ్చని|Green|🟢]] [[చెట్లు|Trees|🌳]], [[స్వచ్ఛమైన|Clean|💧]] [[గాలి|Air|💨]] — అన్నీ [[హాయిగా|Pleasantly|😊]] అనిపించాయి.`, q:{t:'ఎక్కడ నివసించేవారు?', opts:['పల్లెలో','నగరంలో','అడవిలో','సముద్ర తీరంలో'], ans:0}},
      {scene:'🤝🏘️💧', text:`ఊరిలో [[నీళ్ళ|Water|💧]] [[సమస్య|Problem|⚠️]] వచ్చింది. [[${el.name}|our hero|⭐]] [[అందరినీ|Everyone|👨‍👩‍👧‍👦]] [[కలిపారు|United|🤝]]. [[కలిసి|Together|🤝]] [[పని|Work|🔧]] చేయాలని [[నిర్ణయించారు|Decided|✅]].`, q:null},
      {scene:'⛏️🔧🌊', text:`[[యువకులు|Youth|💪]] [[బావి|Well|🪣]] [[తవ్వారు|Dug|⛏️]]. [[${el.hero.t}|${el.hero.e}|${el.hero.em}]] [[నీళ్ళు|Water|💧]] [[వాసన|Smell|👃]] [[పసిగట్టింది|Detected|🔍]]. [[స్వచ్ఛమైన|Clean|💧]] [[నీళ్ళు|Water|💧]] [[దొరికాయి|Found|✅]]!`, q:{t:'ఏ సమస్య పరిష్కారమైంది?', opts:['నీళ్ళ సమస్య','ఆహార సమస్య','వసతి సమస్య','చదువు సమస్య'], ans:0}},
      {scene:'🎊🌈🙏', text:`ఊరంతా [[సంతోషించింది|Rejoiced|🎉]]. [[పెద్దలు|Elders|👴]] [[ఆశీర్వదించారు|Blessed|🙏]]. [[${el.name}|our hero|⭐]] [[ఊరి|Village|🏡]] [[సేవలో|Service|💪]] [[గర్వం|Pride|😤]] అనుభవించారు.`, q:null},
      {scene:'💪🏡🤝', text:`[[${el.name}|our hero|⭐]] [[అర్థమైంది|Understood|💡]]: [[పల్లె|Village|🏡]] [[అంటే|Means|📖]] [[కలిసి|Together|🤝]] [[బతికే|Living|🏠]] [[కుటుంబం|Family|👨‍👩‍👧‍👦]]. [[ఒకరికి ఒకరు|For each other|💝]] [[సహాయం|Help|🤝]] చేసుకోవడమే [[జీవితం|Life|🌟]].`, q:{t:'పల్లె అంటే ఏమిటి?', opts:['కలిసి బతికే కుటుంబం','ఒంటరిగా ఉండే చోటు','అడవిలాంటిది','సముద్రంలాంటిది'], ans:0}}
    ]
  ]
};

const THEME_MORALS = {
  jungle:     'పంచుకోవడం అందరికీ ఆనందాన్ని తెస్తుంది. Sharing brings joy to all.',
  school:     'కష్టపడితే విజయం తప్పదు. Hard work always pays off.',
  festival:   'పండుగలు అందరినీ కలిపే సందర్భాలు. Festivals unite everyone.',
  farm:       "రైతు శ్రమను గౌరవించాలి. Respect the farmer's hard work.",
  sea:        'ప్రకృతిని గౌరవించాలి. Respect nature always.',
  friendship: 'నిజమైన స్నేహితుడు సుఖదుఃఖాల్లో పక్కన ఉంటారు. True friends stand by you.',
  courage:    'భయాన్ని అధిగమించడమే ధైర్యం. Overcoming fear is true courage.',
  magic:      'పరోపకారమే నిజమైన మాయ. Helping others is true magic.',
  sky:        'కలలు రెక్కలు — నిన్ను ఎత్తిపడతాయి. Dreams are wings that lift you.',
  village:    'కలిసి బతకడమే జీవితం. Living together is true life.'
};

export const storyState = {
  theme: null, paragraphs: [], title: '', moral: '',
  vocabulary: [], comprehensionQs: [],
  heroChar: STORY_CHARS[0], storyLength: 'medium',
  readParas: 0, wordsRead: 0,
  readTimerInterval: null, readSeconds: 0,
  currentRating: 0
};

let tooltipTimeout = null;
let speechSynth = window.speechSynthesis;
let isSpeaking = false;
let currentFontMod = 0;
let compAnswers = [];
let compSubmitted = false;

export function selectStoryTheme(id) {
  storyState.theme = id;
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('tc_' + id)?.classList.add('selected');
}

export function selectStoryChar(idx) {
  storyState.heroChar = STORY_CHARS[idx];
  document.querySelectorAll('.char-btn').forEach((b, i) => b.classList.toggle('selected', i === idx));
}

export function setStoryLength(len) {
  storyState.storyLength = len;
  document.querySelectorAll('#screenStorySetup .dur-btn').forEach(b => {
    b.classList.toggle('selected', b.textContent.toLowerCase().includes(len));
  });
}

export async function generateAndShowStory(appState, showScreenFn) {
  let theme = storyState.theme;
  if (!theme) theme = pick(STORY_THEMES.filter(t => !t.special)).id;
  if (theme === 'surprise') theme = pick(STORY_THEMES.filter(t => !t.special)).id;

  const grade = appState.grade || 3;
  const childName = document.getElementById('storyChildNameInput')?.value.trim() || 'రవి';

  const [animals, birds, fruits, colors, adjectives, nature] = await Promise.all([
    loadData('animals'), loadData('birds'), loadData('fruits'),
    loadData('colors'), loadData('adjectives'), loadData('nature')
  ]);

  const hero = storyState.heroChar;
  const friend = pick(animals.filter(a => a.t !== hero.t)) || pick(birds);
  const fruit  = pick(fruits);
  const color  = pick(colors);
  const adj    = pick(adjectives);
  const place  = pick(nature);

  const el = { hero, friend, fruit, color, adj, place, name: childName };

  const templateFn = STORY_TEMPLATES[theme]?.[0] || STORY_TEMPLATES.jungle[0];
  let paragraphs = templateFn(el);

  const lengths = { short: 4, medium: 5, long: 6 };
  paragraphs = paragraphs.slice(0, Math.min(paragraphs.length, lengths[storyState.storyLength] || 5));

  const themeMeta = STORY_THEMES.find(t => t.id === theme);
  const titleTemplates = [
    `${hero.em} ${childName} మరియు ${friend.em} ${friend.t} కథ`,
    `${themeMeta?.em} ${childName}${themeMeta ? ' — ' + themeMeta.name : ''}`,
    `${hero.em} ${hero.t} యొక్క అద్భుత కథ`
  ];

  storyState.title = pick(titleTemplates);
  storyState.theme = theme;
  storyState.paragraphs = paragraphs;
  storyState.vocabulary = extractVocabulary(paragraphs);
  storyState.comprehensionQs = buildComprehensionQs(paragraphs, grade, el, theme);
  storyState.readParas = 0;
  storyState.wordsRead = 0;
  storyState.readSeconds = 0;

  renderStoryReader(appState);
  showScreenFn('screenStoryRead');
  document.getElementById('backBtn').style.display = 'block';
  startReadingTimer();
}

function extractVocabulary(paras) {
  const vocab = [];
  const seen = new Set();
  paras.forEach(p => {
    const matches = p.text.matchAll(/\[\[([^|]+)\|([^|]+)\|([^\]]+)\]\]/g);
    for (const m of matches) {
      const word = m[1];
      if (!seen.has(word)) { seen.add(word); vocab.push({ tel: word, eng: m[2], em: m[3] }); }
    }
  });
  return vocab.slice(0, 12);
}

export function renderStoryReader(appState) {
  const grade = appState?.grade || 3;
  const sizeClass = grade <= 2 ? 'large' : grade >= 5 ? 'small' : '';

  let html = `
    <div class="story-header-card">
      <div class="story-title">${storyState.title}</div>
      <div class="story-meta">
        <span>Grade ${grade}</span>
        <span>${storyState.paragraphs.length} paragraphs</span>
        <span>${storyState.vocabulary.length} new words</span>
      </div>
      <div class="story-controls">
        <button class="story-ctrl-btn" id="readAloudBtn" onclick="toggleReadAloud()">🔊 Read Aloud</button>
        <div class="font-size-ctrl">
          <span style="color:rgba(255,255,255,.6);font-size:.8rem">Text:</span>
          <button onclick="changeFontSize(-1)" title="Smaller">A-</button>
          <button onclick="changeFontSize(0)"  title="Reset">A</button>
          <button onclick="changeFontSize(1)"  title="Larger">A+</button>
        </div>
      </div>
    </div>`;

  const spotWords = storyState.vocabulary.slice(0, 6);
  if (spotWords.length) {
    html += `<div class="spotlight-bar">
      <h4>💡 కొత్త పదాలు నేర్చుకోండి — Word Spotlight</h4>
      <div class="spotlight-words">
        ${spotWords.map(w => `
          <div class="spot-word" title="Click to copy to keyboard">
            <span class="sw-em">${w.em}</span>
            <span class="sw-tel">${w.tel}</span>
            <span class="sw-eng">${w.eng}</span>
          </div>`).join('')}
      </div>
    </div>`;
  }

  storyState.paragraphs.forEach((para, idx) => {
    const renderedText = renderStoryText(para.text, grade);
    html += `<div class="story-para" id="sp_${idx}">
      <div class="story-para-scene">${para.scene}</div>
      <div class="story-para-text ${sizeClass}" id="spt_${idx}">${renderedText}</div>`;
    if (para.q) {
      html += `<div class="para-checkpoint" id="pchk_${idx}">
        <div class="para-q">❓ ${para.q.t}</div>
        <div class="para-opts">
          ${para.q.opts.map((o, oi) =>
            `<button class="para-opt" data-qi="${idx}" data-oi="${oi}" data-ans="${para.q.ans}">${o}</button>`
          ).join('')}
        </div>
      </div>`;
    }
    html += `</div>`;
  });

  const moral = THEME_MORALS[storyState.theme] || 'మంచి పని చేయడమే మనిషి ధర్మం.';
  html += `<div class="moral-banner">
    <span class="moral-icon">🌟</span>
    <div class="moral-text">నైతికం — Moral</div>
    <div class="moral-sub">${moral}</div>
  </div>`;

  html += `<div class="vocab-bank">
    <h4>📚 నా పద సంపద — Vocabulary Bank (${storyState.vocabulary.length} words)</h4>
    <div class="vocab-chips">
      ${storyState.vocabulary.map(w => `<span class="vocab-chip" title="${w.eng}">${w.em} ${w.tel}</span>`).join('')}
    </div>
  </div>`;

  if (grade >= 5) {
    const prompts = [
      `ఈ కథకు కొనసాగింపు (continuation) రాయండి — What happens next?`,
      `మీరు హీరో అయితే ఏమి చేసేవారు? What would you do if you were the hero?`,
      `ఈ కథను మీ స్నేహితుడికి వివరించండి — Summarize this story in 3 sentences.`,
      `కథలో మీకు నచ్చిన పాత్ర గురించి రాయండి — Write about your favourite character.`
    ];
    html += `<div class="creative-prompt">
      <h4>✍️ సృజనాత్మక రచన — Creative Writing</h4>
      <p>${pick(prompts)}</p>
      <textarea id="creativeWritingBox" placeholder="మీ సమాధానం ఇక్కడ రాయండి..."></textarea>
      <button class="save-creative-btn" id="saveCreativeBtn">💾 Save My Writing</button>
    </div>`;
  }

  html += `<div style="text-align:center;margin:16px 0">
    <div style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:8px">కథ నచ్చిందా? Rate this story!</div>
    <div class="star-rating" id="storyStarRating">
      ${[1,2,3,4,5].map(s => `<button class="star-btn" data-rating="${s}" id="star_${s}">⭐</button>`).join('')}
    </div>
  </div>
  <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
    <button class="btn-primary"   id="endStoryReadingBtn">📝 అవగాహన ప్రశ్నలు (Comprehension Quiz) →</button>
    <button class="btn-secondary" id="newStoryBtn">🔄 New Story</button>
    <button class="btn-outline"   id="backToStorySetupBtn">← Back</button>
  </div>`;

  document.getElementById('storyReaderContainer').innerHTML = html;
  setupReadingProgress();
}

function renderStoryText(text, grade) {
  return text.replace(/\[\[([^\|]+)\|([^\|]+)\|([^\]]+)\]\]/g, (_, tel, eng, em) => {
    const showHint = grade <= 2 ? `<small style="font-size:.65em;color:var(--muted);font-weight:400"> (${eng})</small>` : '';
    const safeTel = tel.replace(/'/g, "\\'.");
    return `<span class="sw" data-tel="${tel}" data-eng="${eng}" data-em="${em}">${tel}${showHint}</span>`;
  });
}

export function showWordMeaning(el) {
  document.querySelectorAll('.word-tooltip').forEach(t => t.remove());
  clearTimeout(tooltipTimeout);
  el.classList.add('seen');

  const tt = document.createElement('div');
  tt.className = 'word-tooltip';
  tt.textContent = `${el.dataset.em} ${el.dataset.eng}`;
  el.style.position = 'relative';
  el.appendChild(tt);

  storyState.wordsRead++;
  const counter = document.getElementById('wordsReadCount');
  if (counter) counter.textContent = storyState.wordsRead;

  tooltipTimeout = setTimeout(() => tt.remove(), 2500);
}

export function checkParaQ(btn, selected, correct, paraIdx) {
  const checkBox = document.getElementById('pchk_' + paraIdx);
  checkBox.querySelectorAll('.para-opt').forEach(b => b.disabled = true);
  if (selected === correct) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    checkBox.querySelectorAll('.para-opt')[correct]?.classList.add('correct');
  }
}

function setupReadingProgress() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reading');
        const idx = parseInt(e.target.id.replace('sp_', ''));
        if (!isNaN(idx)) {
          setTimeout(() => {
            const chk = document.getElementById('pchk_' + idx);
            if (chk && !chk.classList.contains('show')) chk.classList.add('show');
          }, 3000);
          storyState.readParas = Math.max(storyState.readParas, idx + 1);
          const pct = (storyState.readParas / storyState.paragraphs.length * 100).toFixed(0);
          const fill = document.getElementById('readingProgressFill');
          if (fill) fill.style.width = pct + '%';
        }
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[id^="sp_"]').forEach(el => observer.observe(el));
}

export function toggleReadAloud() {
  const btn = document.getElementById('readAloudBtn');
  if (isSpeaking) {
    speechSynth.cancel();
    isSpeaking = false;
    btn.textContent = '🔊 Read Aloud';
    btn.classList.remove('active');
    return;
  }
  const textEls = document.querySelectorAll('.story-para-text');
  const fullText = [...textEls].map(el => el.textContent).join('. ');
  const utter = new SpeechSynthesisUtterance(fullText);
  const voices = speechSynth.getVoices();
  const teluguVoice = voices.find(v => v.lang === 'te-IN' || v.lang.startsWith('te'));
  if (teluguVoice) utter.voice = teluguVoice;
  utter.lang = 'te-IN';
  utter.rate = 0.85;
  utter.pitch = 1.1;
  utter.onend = () => { isSpeaking = false; btn.textContent = '🔊 Read Aloud'; btn.classList.remove('active'); };
  speechSynth.speak(utter);
  isSpeaking = true;
  btn.textContent = '⏹ Stop';
  btn.classList.add('active');
}

export function stopReadAloud() {
  if (isSpeaking) { speechSynth.cancel(); isSpeaking = false; }
}

export function changeFontSize(dir) {
  currentFontMod = dir === 0 ? 0 : Math.max(-1, Math.min(2, currentFontMod + dir));
  const sizes = { '-1': 'small', '0': '', '1': 'large', '2': 'large' };
  document.querySelectorAll('.story-para-text').forEach(el => {
    el.className = 'story-para-text ' + (sizes[currentFontMod] || '');
  });
}

export function startReadingTimer() {
  clearInterval(storyState.readTimerInterval);
  storyState.readSeconds = 0;
  storyState.readTimerInterval = setInterval(() => {
    storyState.readSeconds++;
    const m = Math.floor(storyState.readSeconds / 60);
    const s = storyState.readSeconds % 60;
    const disp = document.getElementById('readingTimer');
    if (disp) disp.textContent = m + ':' + String(s).padStart(2, '0');
  }, 1000);
}

export function rateStory(rating) {
  storyState.currentRating = rating;
  [1, 2, 3, 4, 5].forEach(s => {
    const btn = document.getElementById('star_' + s);
    if (btn) btn.classList.toggle('active', s <= rating);
  });
}

export function saveCreativeWriting(appState) {
  const text = document.getElementById('creativeWritingBox')?.value.trim();
  if (!text) return;
  const journal = JSON.parse(localStorage.getItem('tv_creative') || '[]');
  journal.unshift({ date: new Date().toLocaleDateString(), story: storyState.title, text, grade: appState?.grade });
  localStorage.setItem('tv_creative', JSON.stringify(journal.slice(0, 20)));
  alert('✅ మీ రచన సేవ్ అయింది! Your writing is saved!');
}

export function endStoryReading(appState, showScreenFn) {
  clearInterval(storyState.readTimerInterval);
  stopReadAloud();
  saveStoryToJournal(appState);
  renderComprehension();
  showScreenFn('screenStoryComp');
  document.getElementById('backBtn').style.display = 'block';
}

function buildComprehensionQs(paragraphs, grade, el, theme) {
  const qs = [];
  paragraphs.forEach(p => { if (p.q) qs.push(p.q); });
  const extras = [
    { t: `కథలో హీరో ఎవరు?`, opts: [el.hero.t, el.friend.t, el.fruit.t, 'ఉపాధ్యాయుడు'], ans: 0 },
    { t: `హీరోకి ${el.friend.t} ఏమి చేసింది?`, opts: ['సహాయం చేసింది', 'అరిచింది', 'పారిపోయింది', 'ఏడ్చింది'], ans: 0 },
    { t: `కథ ముగింపు (ending) ఎలా ఉంది?`, opts: ['సంతోషంగా', 'దుఃఖంగా', 'భయంగా', 'అనిర్ణీతంగా'], ans: 0 },
    { t: `${el.fruit.t} రంగు ఏమిటి?`, opts: [el.color.t, 'నలుపు', 'తెలుపు', 'బూడిద'], ans: 0 },
    { t: `కథ నుంచి మీరు ఏమి నేర్చుకున్నారు?`, opts: ['మంచి నైతికం', 'ఏమీ లేదు', 'చెడు విషయాలు', 'తెలియదు'], ans: 0 }
  ];
  const profile = GRADE_PROFILE[grade] || GRADE_PROFILE[3];
  while (qs.length < profile.compQ && extras.length) qs.push(extras.shift());
  return qs.slice(0, profile.compQ);
}

export function renderComprehension() {
  compAnswers = new Array(storyState.comprehensionQs.length).fill(-1);
  compSubmitted = false;

  const cont = document.getElementById('compQuestionsContainer');
  const res  = document.getElementById('compResultsContainer');
  res.style.display = 'none';

  let html = storyState.comprehensionQs.map((q, qi) => `
    <div class="comp-q-card">
      <div class="comp-q-num">Question ${qi + 1} of ${storyState.comprehensionQs.length}</div>
      <div class="comp-q-text">${q.t}</div>
      <div class="comp-opts">
        ${q.opts.map((o, oi) => `
          <button class="comp-opt" id="copt_${qi}_${oi}" data-qi="${qi}" data-oi="${oi}" data-ans="${q.ans}">
            <span style="color:var(--muted);margin-right:6px">${['A','B','C','D'][oi]}.</span> ${o}
          </button>`).join('')}
      </div>
    </div>
  `).join('');

  html += `<div style="text-align:center;margin-top:16px">
    <button class="btn-primary" id="submitCompBtn" style="min-width:180px">✓ సమర్పించు (Submit)</button>
  </div>`;
  cont.innerHTML = html;
}

export function selectCompAns(qi, oi) {
  if (compSubmitted) return;
  compAnswers[qi] = oi;
  for (let k = 0; k < 4; k++) {
    const btn = document.getElementById(`copt_${qi}_${k}`);
    if (btn) {
      btn.style.borderColor = k === oi ? 'var(--blue)' : '#e5e7eb';
      btn.style.background  = k === oi ? '#eff6ff'     : '#fff';
    }
  }
}

export function submitComprehension(showScreenFn) {
  compSubmitted = true;
  let correct = 0;
  storyState.comprehensionQs.forEach((q, qi) => {
    const selected = compAnswers[qi];
    for (let k = 0; k < q.opts.length; k++) {
      const btn = document.getElementById(`copt_${qi}_${k}`);
      if (!btn) continue;
      btn.disabled = true;
      if (k === q.ans) btn.classList.add('correct');
      else if (k === selected && selected !== q.ans) btn.classList.add('wrong');
    }
    if (selected === q.ans) correct++;
  });

  const total = storyState.comprehensionQs.length;
  const pct   = Math.round(correct / total * 100);
  const msgs  = {
    100: '🌟 అద్భుతం! Perfect score! You understood every word!',
    80:  '👍 చాలా బాగు! Great comprehension!',
    60:  '😊 మంచి ప్రయత్నం! Good try — read once more!',
    0:   '📖 మళ్ళీ చదవండి! Read the story again — you can do it!'
  };
  const msgKey = pct === 100 ? 100 : pct >= 80 ? 80 : pct >= 60 ? 60 : 0;
  const stars  = '⭐'.repeat(Math.ceil(pct / 20));
  const trophy = pct >= 80 ? '🏆' : pct >= 60 ? '🥈' : '📚';

  const res = document.getElementById('compResultsContainer');
  res.style.display = 'block';
  res.innerHTML = `
    <div class="comp-results">
      <span class="comp-trophy">${trophy}</span>
      <div class="comp-score-big">${correct}/${total}</div>
      <div style="color:var(--gold);font-size:1.2rem;margin:4px 0">${stars}</div>
      <div class="comp-msg">${msgs[msgKey]}</div>
      <div class="story-saved-badge">📚 కథ జర్నల్‌లో సేవ్ అయింది!</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <button class="btn-primary"   id="compNewStoryBtn">🔄 New Story</button>
        <button class="btn-secondary" id="compStoryMenuBtn">📚 Story Menu</button>
        <button class="btn-outline"   id="compMainMenuBtn">⚙️ Main Menu</button>
      </div>
    </div>`;
  res.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (pct >= 70) launchConfetti();
}

export function saveStoryToJournal(appState) {
  const child = appState?.currentChild || 'My Child';
  const journal = JSON.parse(localStorage.getItem('tv_stories') || '[]');
  journal.unshift({
    date:    new Date().toLocaleDateString('en-IN'),
    title:   storyState.title,
    theme:   storyState.theme,
    grade:   appState?.grade || 3,
    seconds: storyState.readSeconds,
    words:   storyState.wordsRead,
    rating:  storyState.currentRating,
    child
  });
  localStorage.setItem('tv_stories', JSON.stringify(journal.slice(0, 30)));
}

export function renderStoryJournal() {
  const journal = JSON.parse(localStorage.getItem('tv_stories') || '[]');
  const box  = document.getElementById('storyJournalBox');
  const list = document.getElementById('storyJournalList');
  if (!journal.length) { if (box) box.style.display = 'none'; return; }
  if (box) box.style.display = 'block';
  const themeMeta = id => STORY_THEMES.find(t => t.id === id) || { em: '📖' };
  list.innerHTML = journal.slice(0, 8).map(s => `
    <div class="journal-item">
      <span class="ji-emoji">${themeMeta(s.theme).em}</span>
      <div class="ji-info">
        <div class="ji-title">${s.title}</div>
        <div class="ji-meta">Grade ${s.grade} · ${s.date} · ${s.words} words · ${Math.floor(s.seconds / 60)}m read</div>
      </div>
      <div class="ji-rating">${'⭐'.repeat(s.rating || 0)}</div>
    </div>
  `).join('');
}

export function initStorySetup(appState) {
  const rem = document.getElementById('storyGradeReminder');
  if (appState?.grade && rem) {
    rem.style.display = 'block';
    const g = appState.grade;
    rem.textContent = `Grade ${g} mode — ${g <= 2 ? 'Beginner (simple words)' : g <= 4 ? 'Intermediate' : 'Advanced (rich vocabulary, idioms)'} story`;
  }

  const tg = document.getElementById('storyThemeGrid');
  if (tg) {
    tg.innerHTML = STORY_THEMES.map(t => `
      <div class="theme-card ${t.special ? 'surprise-card' : ''}" id="tc_${t.id}" data-theme="${t.id}">
        <span class="theme-emoji">${t.em}</span>
        <div class="theme-name">${t.name}</div>
        <div class="theme-eng">${t.eng}</div>
      </div>
    `).join('');
  }

  const cp = document.getElementById('storyCharPick');
  if (cp) {
    cp.innerHTML = STORY_CHARS.map((c, i) =>
      `<button class="char-btn ${i === 0 ? 'selected' : ''}" data-char-idx="${i}">${c.em} ${c.t}</button>`
    ).join('');
  }

  renderStoryJournal();
}
