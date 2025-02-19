import Conditions from '../../../../../resources/conditions';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

// Byakko Normal
const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.TheJadeStoa,
  timelineFile: 'byakko.txt',
  triggers: [
    {
      id: 'Byakko Storm Pulse',
      type: 'StartsUsing',
      netRegex: { source: 'Byakko', id: '2A2F', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Byakko Heavenly Strike',
      type: 'StartsUsing',
      netRegex: { source: 'Byakko', id: '2A2D' },
      response: Responses.tankBuster(),
    },
    {
      // TODO: we could not call this out for the person who was caught by Clutch (27E1).
      id: 'Byakko Highest Stakes',
      type: 'StartsUsing',
      netRegex: { source: 'Byakko', id: '27E2', capture: false },
      response: Responses.stackMarker(),
    },
    {
      id: 'Byakko White Herald',
      type: 'HeadMarker',
      netRegex: { id: '0057' },
      response: Responses.awayFrom(),
    },
    {
      id: 'Byakko Bombogenesis',
      type: 'HeadMarker',
      netRegex: { id: '0065' },
      condition: Conditions.targetIsYou(),
      response: Responses.spread(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Aratama Force': 'Aratama-Kraft',
        'Byakko': 'Byakko',
        'Hakutei': 'Hakutei',
      },
      'replaceText': {
        'Answer On High': 'Himmlische Antwort',
        'Aratama': 'Aratama',
        'Bombogenesis': 'Plötzliches Orkantief',
        'Clutch': 'Umklammerung',
        'Dance Of The Incomplete': 'Tanz der zwei Gesichter',
        'Distant Clap': 'Donnergrollen',
        'Fell Swoop': 'Auf einen Schlag',
        'Fire And Lightning': 'Feuer und Blitz',
        'Heavenly Strike': 'Himmlischer Schlag',
        'Highest Stakes': 'Höchstes Risiko',
        'Hundredfold Havoc': 'Hundertfache Verwüstung',
        'Imperial Guard': 'Herbststurm',
        'State Of Shock': 'Bannblitze',
        'Steel Claw': 'Stahlklaue',
        'Storm Pulse': 'Gewitterwelle',
        'Sweep The Leg': 'Vertikalität',
        'The Roar Of Thunder': 'Brüllen des Donners',
        'The Voice Of Thunder': 'Stimme des Donners',
        'Unrelenting Anguish': 'Pandämonium',
        'White Herald': 'Herbstböe',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Aratama Force': 'aramitama',
        'Byakko': 'Byakko',
        'Hakutei': 'Hakutei',
      },
      'replaceText': {
        'Answer On High': 'Foudre céleste',
        'Aratama': 'Aratama',
        'Bombogenesis': 'Bombogénèse',
        'Clutch': 'Empoignement',
        'Dance Of The Incomplete': 'Danse semi-bestiale',
        'Distant Clap': 'Tonnerre lointain',
        'Fell Swoop': 'Éléments déchaînés',
        'Fire And Lightning': 'Feu et foudre',
        'Heavenly Strike': 'Frappe céleste',
        'Highest Stakes': 'Tout pour le tout',
        'Hundredfold Havoc': 'Ravages centuples',
        'Imperial Guard': 'Garde impériale',
        'State Of Shock': 'Foudroiement brutal',
        'Steel Claw': 'Griffe d\'acier',
        'Storm Pulse': 'Pulsion de tempête',
        'Sweep The Leg': 'Verticalité',
        'The Roar Of Thunder': 'Rugissement du tonnerre',
        'The Voice Of Thunder': 'Voix du tonnerre',
        'Unrelenting Anguish': 'Douleur continuelle',
        'White Herald': 'Héraut blanc',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Aratama Force': '荒弾',
        'Byakko': '白虎',
        'Hakutei': '白帝',
      },
      'replaceText': {
        'Answer On High': '天つ雷',
        'Aratama': '荒弾',
        'Bombogenesis': '爆弾低気圧',
        'Clutch': '掌握',
        'Dance Of The Incomplete': '半獣舞踏',
        'Distant Clap': '遠雷',
        'Fell Swoop': '迅雷風烈波',
        'Fire And Lightning': '雷火一閃',
        'Heavenly Strike': '天雷掌',
        'Highest Stakes': '乾坤一擲',
        'Hundredfold Havoc': '百雷繚乱',
        'Imperial Guard': '白帝一陣',
        'State Of Shock': '呪縛雷',
        'Steel Claw': '鉄爪斬',
        'Storm Pulse': '風雷波動',
        'Sweep The Leg': '旋体脚',
        'The Roar Of Thunder': '雷轟',
        'The Voice Of Thunder': '雷声',
        'Unrelenting Anguish': '無間地獄',
        'White Herald': '白帝衝',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Aratama Force': '荒弹',
        'Byakko': '白虎',
        'Hakutei': '白帝',
      },
      'replaceText': {
        'Answer On High': '天雷',
        'Aratama': '荒弹',
        'Bombogenesis': '炸弹低气压',
        'Clutch': '紧握',
        'Dance Of The Incomplete': '半兽舞蹈',
        'Distant Clap': '远雷',
        'Fell Swoop': '迅雷风烈波',
        'Fire And Lightning': '雷火一闪',
        'Heavenly Strike': '天雷掌',
        'Highest Stakes': '乾坤一掷',
        'Hundredfold Havoc': '百雷缭乱',
        'Imperial Guard': '白帝降临',
        'State Of Shock': '咒缚雷',
        'Steel Claw': '铁爪斩',
        'Storm Pulse': '风雷波动',
        'Sweep The Leg': '旋体脚',
        'The Roar Of Thunder': '雷轰',
        'The Voice Of Thunder': '雷声',
        'Unrelenting Anguish': '无间地狱',
        'White Herald': '白帝冲',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Aratama Force': '아라미타마 탄환',
        'Byakko': '백호',
        'Hakutei': '하얀 제왕',
      },
      'replaceText': {
        'Answer On High': '하늘의 번개',
        'Aratama': '아라미타마 탄환',
        'Bombogenesis': '폭탄 저기압',
        'Clutch': '장악',
        'Dance Of The Incomplete': '반수의 춤',
        'Distant Clap': '원뢰',
        'Fell Swoop': '신뢰풍렬파',
        'Fire And Lightning': '뇌화일섬',
        'Heavenly Strike': '천뢰장',
        'Highest Stakes': '건곤일척',
        'Hundredfold Havoc': '백뢰요란',
        'Imperial Guard': '제왕의 진격',
        'State Of Shock': '주박뢰',
        'Steel Claw': '강철 발톱',
        'Storm Pulse': '풍뢰파동',
        'Sweep The Leg': '돌려차기',
        'The Roar Of Thunder': '뇌굉',
        'The Voice Of Thunder': '뇌성',
        'Unrelenting Anguish': '무간지옥',
        'White Herald': '제왕의 충격',
      },
    },
  ],
};

export default triggerSet;
