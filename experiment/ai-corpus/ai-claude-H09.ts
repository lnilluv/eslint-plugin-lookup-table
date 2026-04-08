export type AnimalKind = "dog" | "cat" | "rabbit" | "parrot" | "goldfish";

export interface AnimalProfile {
  averageLifespanYears: number;
  typicalAdultWeightRange: string;
  needsOutdoorAccess: boolean;
  funFact: string;
}

const ANIMAL_PROFILES: Record<AnimalKind, AnimalProfile> = {
  dog: {
    averageLifespanYears: 12,
    typicalAdultWeightRange: "5-45 kg",
    needsOutdoorAccess: true,
    funFact: "Dogs can learn over 100 words and gestures.",
  },
  cat: {
    averageLifespanYears: 15,
    typicalAdultWeightRange: "3-6 kg",
    needsOutdoorAccess: false,
    funFact: "Cats spend around two-thirds of their lives sleeping.",
  },
  rabbit: {
    averageLifespanYears: 9,
    typicalAdultWeightRange: "1-2.5 kg",
    needsOutdoorAccess: false,
    funFact: "A rabbit's teeth never stop growing.",
  },
  parrot: {
    averageLifespanYears: 35,
    typicalAdultWeightRange: "0.1-1.5 kg",
    needsOutdoorAccess: false,
    funFact: "Some parrots can mimic human speech with impressive accuracy.",
  },
  goldfish: {
    averageLifespanYears: 10,
    typicalAdultWeightRange: "0.05-0.3 kg",
    needsOutdoorAccess: false,
    funFact: "Goldfish can recognize patterns and be trained to do simple tricks.",
  },
};

export function getAnimalProfile(kind: AnimalKind): AnimalProfile {
  return ANIMAL_PROFILES[kind];
}
