import { GuessType } from './GuessType';
interface OptionsProps {
  value: number | GuessType;
  label: string;
  desc: number | string;
}

export const ScoreList = [
  { value: 1, label: '1-0', desc: '0' },
  { value: 2, label: '2-1', desc: '0' },
  { value: 3, label: '0-0', desc: '0' },
  { value: 4, label: '0-1', desc: '0' },
  { value: 5, label: '1-2', desc: '0' },
  { value: 6, label: '3-1', desc: '0' },
  { value: 7, label: '4-0', desc: '0' },
  { value: 8, label: '1-1', desc: '0' },
  { value: 9, label: '1-3', desc: '0' },
  { value: 10, label: '0-4', desc: '0' },
  { value: 11, label: '4-2', desc: '0' },
  { value: 12, label: '2-0', desc: '0' },
  { value: 13, label: '2-2', desc: '0' },
  { value: 14, label: '2-4', desc: '0' },
  { value: 15, label: '0-2', desc: '0' },
  { value: 16, label: '3-0', desc: '0' },
  { value: 17, label: '3-2', desc: '0' },
  { value: 18, label: '3-3', desc: '0' },
  { value: 19, label: '0-3', desc: '0' },
  { value: 20, label: '2-3', desc: '0' },
  { value: 21, label: '4-1', desc: '0' },
  { value: 22, label: '4-3', desc: '0' },
  { value: 23, label: '4-4', desc: '0' },
  { value: 24, label: '1-4', desc: '0' },
  { value: 25, label: '3-4', desc: '0' },
  { value: 26, label: '其他', desc: '0' },
];

export const ScoreById: { [key: number]: OptionsProps } = (() => {
  const scoreById: any = {};
  for (const score of ScoreList) {
    scoreById[score.value] = score;
  }
  return scoreById;
})();
