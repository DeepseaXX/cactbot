import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.IlMheg,
  triggers: [
    {
      id: 'Hunt Pauldia Rusting Claw',
      type: 'StartsUsing',
      netRegex: { id: '41BE', source: 'O Poorest Pauldia', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getBehind(),
    },
    {
      id: 'Hunt Pauldia Words of Woe',
      type: 'StartsUsing',
      netRegex: { id: '41C0', source: 'O Poorest Pauldia', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getBehind(),
    },
    {
      id: 'Hunt Pauldia Tail Drive',
      type: 'StartsUsing',
      netRegex: { id: '41BF', source: 'O Poorest Pauldia', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.goFront(),
    },
    {
      id: 'Hunt Pauldia The Spin',
      type: 'StartsUsing',
      netRegex: { id: '41C1', source: 'O Poorest Pauldia', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getOut(),
    },
    {
      id: 'Hunt Mudman Royal Flush',
      type: 'StartsUsing',
      netRegex: { id: '41BA', source: 'The Mudman', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getOut(),
    },
    {
      id: 'Hunt Mudman Bog Bequest',
      type: 'StartsUsing',
      netRegex: { id: '41BB', source: 'The Mudman', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getUnder(),
    },
    {
      id: 'Hunt Mudman Gravity Force',
      type: 'StartsUsing',
      netRegex: { id: '41BD', source: 'The Mudman' },
      condition: (data) => data.inCombat,
      response: Responses.interruptIfPossible(),
    },
    {
      id: 'Hunt Aglaope Ancient Aero III',
      type: 'StartsUsing',
      netRegex: { id: '4688', source: 'Aglaope', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.knockback(),
    },
    {
      id: 'Hunt Aglaope Fourfold Suffering',
      type: 'StartsUsing',
      netRegex: { id: '41B3', source: 'Aglaope', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getIn(),
    },
    {
      id: 'Hunt Aglaope Song of Torment',
      type: 'StartsUsing',
      netRegex: { id: '41B9', source: 'Aglaope' },
      condition: (data) => data.inCombat,
      response: Responses.interruptIfPossible(),
    },
    {
      id: 'Hunt Aglaope Seductive Sonata',
      type: 'StartsUsing',
      netRegex: { id: '41B8', source: 'Aglaope', capture: false },
      condition: (data) => data.inCombat,
      response: Responses.getOut('alarm'),
    },
  ],
};

export default triggerSet;
