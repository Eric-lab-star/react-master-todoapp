import { atom, selector } from "recoil";

export const InputData = atom({
  key: "Data",
  default: 0,
});

export const InputDataSelector = selector<number>({
  key: "Selector",
  get: ({ get }) => {
    const data = get(InputData);
    return data / 60;
  },
  set: ({ set }, newValue) => {
    const min = 60 * Number(newValue);
    set(InputData, min);
  },
});
