import Conditions from '../../../../../resources/conditions';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

// O8N - Sigmascape 4.0 Normal
const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.SigmascapeV40,
  timelineFile: 'o8n.txt',
  triggers: [
    {
      id: 'O8N Hyper Drive',
      type: 'StartsUsing',
      netRegex: { id: '292E', source: 'Kefka' },
      response: Responses.tankBuster(),
    },
    {
      id: 'O8N Shockwave',
      type: 'StartsUsing',
      netRegex: { id: '2927', source: 'Graven Image', capture: false },
      delaySeconds: 5,
      response: Responses.knockback(),
    },
    {
      id: 'O8N Gravitational Wave',
      type: 'StartsUsing',
      netRegex: { id: '2929', source: 'Graven Image', capture: false },
      response: Responses.goEast(),
    },
    {
      id: 'O8N Intemperate Will',
      type: 'StartsUsing',
      netRegex: { id: '292A', source: 'Graven Image', capture: false },
      response: Responses.goWest(),
    },
    {
      id: 'O8N Ave Maria',
      type: 'StartsUsing',
      netRegex: { id: '292B', source: 'Graven Image', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Look At Statue',
          de: 'Statue anschauen',
          fr: 'Regardez la statue',
          ja: '神々の像を見て',
          cn: '面对神像',
          ko: '시선 바라보기',
        },
      },
    },
    {
      id: 'O8N Indolent Will',
      type: 'StartsUsing',
      netRegex: { id: '292C', source: 'Graven Image', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Look Away From Statue',
          de: 'Von Statue wegschauen',
          fr: 'Ne regardez pas la statue',
          ja: '神々の像を見ない',
          cn: '背对神像',
          ko: '시선 피하기',
        },
      },
    },
    {
      id: 'O8N Timely Teleport',
      type: 'StartsUsing',
      netRegex: { id: '2921', source: 'Kefka', capture: false },
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Get Outside Destination',
          de: 'Geh aus dem Zielkreis raus',
          fr: 'Allez à côté du cercle extérieur',
          cn: '去传送目的地的外圈',
          ko: '마법진 바깥쪽으로 이동',
        },
      },
    },
    {
      id: 'O8N Aero Assault',
      type: 'StartsUsing',
      netRegex: { id: '2924', source: 'Kefka', capture: false },
      response: Responses.knockback(),
    },
    {
      id: 'O8N Flagrant Fire Single',
      type: 'HeadMarker',
      netRegex: { id: '0017' },
      condition: Conditions.targetIsYou(),
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'fire on YOU',
          de: 'Feuer auf DIR',
          fr: 'Feu sur VOUS',
          ja: '自分にファイガ',
          cn: '火点名',
          ko: '파이가 대상자',
        },
      },
    },
    {
      id: 'O8N Flagrant Fire Stack',
      type: 'HeadMarker',
      netRegex: { id: '003E' },
      response: Responses.stackMarkerOn(),
    },
    {
      id: 'O8N Thrumming Thunder Real',
      type: 'StartsUsing',
      netRegex: { id: '291D', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'True Thunder',
          de: 'Wahrer Blitz',
          fr: 'Vraie foudre',
          ja: '真サンダガ',
          cn: '真雷',
          ko: '진실 선더가',
        },
      },
    },
    {
      id: 'O8N Thrumming Thunder Fake',
      type: 'StartsUsing',
      netRegex: { id: '291B', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Fake Thunder',
          de: 'Falscher Blitz',
          fr: 'Fausse foudre',
          ja: '偽サンダガ',
          cn: '假雷',
          ko: '거짓 선더가',
        },
      },
    },
    {
      id: 'O8N Blizzard Fake Donut',
      type: 'StartsUsing',
      netRegex: { id: '2916', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Fake Ice: Get out',
          de: 'Falsches Eis: Rausgehen',
          fr: 'Fausse glace : Sortez',
          ja: '偽ブリザガ: 外へ',
          cn: '假冰：远离',
          ko: '거짓 블리자가: 밖으로',
        },
      },
    },
    {
      id: 'O8N Blizzard True Donut',
      type: 'StartsUsing',
      netRegex: { id: '2919', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'True Ice: Get in',
          de: 'Wahre Eis: Reingehen',
          fr: 'Vraie glace : À l\'intérieur',
          ja: '真ブリザガ: 入る',
          cn: '真冰：靠近',
          ko: '진실 블리자가: 안으로',
        },
      },
    },
    {
      id: 'O8N Blizzard Fake Near',
      type: 'StartsUsing',
      netRegex: { id: '2914', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Fake Ice: Get in',
          de: 'Falsches Eis: Reingehen',
          fr: 'Fausse glace: À l\'intérieur',
          ja: '偽ブリザガ: 入る',
          cn: '假冰：靠近',
          ko: '거짓 블리자가: 안으로',
        },
      },
    },
    {
      id: 'O8N Blizzard True Near',
      type: 'StartsUsing',
      netRegex: { id: '2918', source: 'Kefka', capture: false },
      suppressSeconds: 1,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'True Ice: Get out',
          de: 'Wahres Eis: Rausgehen',
          fr: 'Vraie glace: Sortez',
          ja: '真ブリザガ: 外へ',
          cn: '真冰：远离',
          ko: '진실 블리자가: 밖으로',
        },
      },
    },
    {
      id: 'O8N Ultima Upsurge',
      type: 'StartsUsing',
      netRegex: { id: '292D', source: 'Kefka', capture: false },
      response: Responses.aoe(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Destroy! Destroy! Destroy! I will destroy it all!':
          'Nichts wird mir standhalten, nichts! Alles will ich vernichten!',
        'Graven Image': 'heilig(?:e|er|es|en) Statue',
        'Kefka': 'Kefka',
      },
      'replaceText': {
        'Aero Assault': 'Wallendes Windga',
        'Aero/Ruin': 'Wind/Ruin',
        'Blizzard Blitz': 'Erstarrendes Eisga',
        'Flagrant Fire': 'Flammendes Feuga',
        'Graven Image': 'Göttliche Statue',
        'Half Arena': 'Halbe Arena',
        'Hyperdrive': 'Hyperantrieb',
        'Shockwave': 'Schockwelle',
        'Statue Gaze': 'Statuenblick',
        'Thrumming Thunder': 'Brachiales Blitzga',
        'Timely Teleport': 'Turbulenter Teleport',
        'Ultima Upsurge': 'Ultima-Wallung',
        'Wave Cannon': 'Wellenkanone',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Graven Image': 'Statue divine',
        'Destroy! Destroy! Destroy! I will destroy it all!':
          'Je détruirai le monde entier ! Plus personne ne pourra rêver !',
        'Kefka': 'Kefka',
      },
      'replaceText': {
        'Aero Assault': 'Méga Vent véhément',
        'Aero/Ruin': 'Vent/Ruine',
        'Blizzard Blitz': 'Méga Glace glissante',
        'Flagrant Fire': 'Méga Feu faufilant',
        'Graven Image': 'Statue divine',
        'Half Arena': 'Moitié d\'arène',
        'Hyperdrive': 'Colonne de feu',
        'Shockwave': 'Onde de choc',
        'Statue Gaze': 'Regard de statue',
        'Thrumming Thunder': 'Méga Foudre fourmillante',
        'Timely Teleport': 'Téléportation turbulente',
        'Ultima Upsurge': 'Ultima ulcérante',
        'Wave Cannon': 'Canon plasma',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Destroy! Destroy! Destroy! I will destroy it all!':
          'どれもこれもゼ～ンブ、ハカイ、ハカイ、ハカイ！\\s*ゼ～ンブ、ハカイだ！！',
        'Graven Image': '神々の像',
        'Kefka': 'ケフカ',
      },
      'replaceText': {
        'Aero Assault': 'ずんずんエアロガ',
        'Aero/Ruin': 'エアロガ/ルインガ',
        'Blizzard Blitz': 'ぐるぐるブリザガ',
        'Flagrant Fire': 'めらめらファイガ',
        'Graven Image': '神々の像',
        'Half Arena': 'フィールド半分即死',
        'Hyperdrive': 'ハイパードライブ',
        'Shockwave': '衝撃波',
        'Statue Gaze': '像ギミック',
        'Thrumming Thunder': 'もりもりサンダガ',
        'Timely Teleport': 'ぶっとびテレポ',
        'Ultima Upsurge': 'どきどきアルテマ',
        'Wave Cannon': '波動砲',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Destroy! Destroy! Destroy! I will destroy it all!': '我要破坏一切！破坏！破坏！破坏！',
        'Graven Image': '众神之像',
        'Kefka': '凯夫卡',
      },
      'replaceText': {
        'Aero Assault': '疼飕飕暴风',
        'Aero/Ruin': '暴风/毁荡',
        'Blizzard Blitz': '滴溜溜冰封',
        'Flagrant Fire': '呼啦啦爆炎',
        'Graven Image': '众神之像',
        'Half Arena': '半场',
        'Hyperdrive': '超驱动',
        'Shockwave': '冲击波',
        'Statue Gaze': '神像视线',
        'Thrumming Thunder': '劈啪啪暴雷',
        'Timely Teleport': '跳蹦蹦传送',
        'Ultima Upsurge': '扑腾腾究极',
        'Wave Cannon': '波动炮',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Destroy! Destroy! Destroy! I will destroy it all!': '이것저것 모~두, 파괴, 파괴, 파괴!',
        'Graven Image': '신들의 상',
        'Kefka': '케프카',
      },
      'replaceText': {
        'Aero Assault': '갈기갈기 에어로가',
        'Aero/Ruin': '에어로가/루인가',
        'Blizzard Blitz': '빙글빙글 블리자가',
        'Flagrant Fire': '이글이글 파이가',
        'Graven Image': '신들의 상',
        'Half Arena': '절반 장판',
        'Hyperdrive': '하이퍼드라이브',
        'Shockwave': '충격파',
        'Statue Gaze': '동상 작동',
        'Thrumming Thunder': '찌릿찌릿 선더가',
        'Timely Teleport': '껑충껑충 텔레포',
        'Ultima Upsurge': '두근두근 알테마',
        'Wave Cannon': '파동포',
      },
    },
  ],
};

export default triggerSet;
