export const COLORS = [
  { label: "Black", color: "black", tw: "bg-black" },
  { label: "Blue", color: "blue", tw: "bg-blue-600" },
  { label: "Rose", color: "rose", tw: "bg-rose-600" },
] as const;

export const MODELS = [
  {
    label: "iPhone X",
    value: "iphonex",
  },
  {
    label: "iPhone 11",
    value: "iphone11",
  },
  {
    label: "iPhone 12",
    value: "iphone12",
  },
  {
    label: "iPhone 13",
    value: "iphone13",
  },
  {
    label: "iPhone 14",
    value: "iphone14",
  },
  {
    label: "iPhone 15",
    value: "iphone15",
  },
] as const;

export const MATERIALS = [
  {
    label: "Silicone",
    value: "silicone",
    description: undefined,
    price: 0,
  },
  {
    label: "Soft Polycarbonate",
    value: "polycarbonate",
    description: "Scratch-resistant coating",
    price: 5_00,
  },
] as const;

export const FINISHES = [
  {
    label: "Smooth Finish",
    value: "smooth",
    description: undefined,
    price: 0,
  },
  {
    label: "Textured Finish",
    value: "textured",
    description: "Soft grippy texture",
    price: 3_00,
  },
] as const;
