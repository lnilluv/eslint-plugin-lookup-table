export type AnimalKind = "dog" | "cat" | "rabbit" | "parrot" | "goldfish";

export interface AnimalProfile {
  averageLifespanYears: number;
  typicalAdultWeightRange: string;
  needsOutdoorAccess: boolean;
  funFact: string;
}

export function getAnimalProfile(kind: AnimalKind): AnimalProfile {
  switch (kind) {
    case "dog":
      return {
        averageLifespanYears: 12,
        typicalAdultWeightRange: "5-40 kg",
        needsOutdoorAccess: true,
        funFact: "Dogs can understand up to 250 words and gestures.",
      };
    case "cat":
      return {
        averageLifespanYears: 15,
        typicalAdultWeightRange: "3-7 kg",
        needsOutdoorAccess: false,
        funFact: "Cats spend about 70% of their lives sleeping.",
      };
    case "rabbit":
      return {
        averageLifespanYears: 9,
        typicalAdultWeightRange: "1-5 kg",
        needsOutdoorAccess: true,
        funFact: "Rabbits can rotate their ears 180 degrees independently.",
      };
    case "parrot":
      return {
        averageLifespanYears: 50,
        typicalAdultWeightRange: "0.03-1.5 kg",
        needsOutdoorAccess: false,
        funFact: "Some parrots can live to be over 80 years old.",
      };
    case "goldfish":
      return {
        averageLifespanYears: 10,
        typicalAdultWeightRange: "0.02-0.3 kg",
        needsOutdoorAccess: false,
        funFact: "Goldfish can distinguish between different human faces.",
      };
  }
}
