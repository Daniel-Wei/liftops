import { describe, expect, it } from "vitest";
import { getMuscleKeyForModelObject } from "./muscleModelMap";

describe("muscleModelMap", () => {
  it("maps exact GLB muscle names to fine-grained muscle ids", () => {
    expect(getMuscleKeyForModelObject("Gluteus maximus muscle.005", {
      name: "Gluteus Maximus",
      nameDetail: "Gluteus Maximus Muscle",
    })).toBe("gluteMaximus");

    expect(getMuscleKeyForModelObject("Long head of biceps femoris.003", {
      name: "Biceps Femoris",
      nameDetail: "Long Head Of Biceps Femoris",
    })).toBe("bicepsFemorisLongHead");

    expect(getMuscleKeyForModelObject("Lateral head of gastrocnemius.003", {
      name: "Gastrocnemius",
      nameDetail: "Lateral Head Of Gastrocnemius",
    })).toBe("gastrocnemiusLateral");
  });

  it("separates pectoralis major regions available in the GLB", () => {
    expect(getMuscleKeyForModelObject("Clavicular head of pectoralis major muscle.001", {
      name: "Pectoralis Major",
      nameDetail: "Clavicular Head Of Pectoralis Major Muscle",
    })).toBe("pecClavicular");

    expect(getMuscleKeyForModelObject("Sternocostal head of pectoralis major muscle.007", {
      name: "Pectoralis Major",
      nameDetail: "Sternocostal Head Of Pectoralis Major Muscle",
    })).toBe("pecSternocostal");

    expect(getMuscleKeyForModelObject("(Abdominal part of pectoralis major muscle).003", {
      name: "Pectoralis Major",
      nameDetail: "(Abdominal Part Of Pectoralis Major Muscle)",
    })).toBe("pecAbdominal");
  });

  it("separates back muscles instead of coloring all back meshes", () => {
    expect(getMuscleKeyForModelObject("Rhomboid major muscle.001", {
      name: "Rhomboid Major",
      nameDetail: "Rhomboid Major Muscle",
    })).toBe("rhomboidMajor");

    expect(getMuscleKeyForModelObject("Teres major muscle.003", {
      name: "Teres Major",
      nameDetail: "Teres Major Muscle",
    })).toBe("teresMajor");

    expect(getMuscleKeyForModelObject("Transverse part of trapezius muscle.003", {
      name: "Trapezius",
      nameDetail: "Transverse Part Of Trapezius Muscle",
    })).toBe("midTrapezius");
  });

  it("separates deltoid heads instead of coloring the entire shoulder", () => {
    expect(getMuscleKeyForModelObject("Clavicular part of deltoid muscle.003", {
      name: "Deltoid",
      nameDetail: "Clavicular Part Of Deltoid Muscle",
    })).toBe("frontDeltoid");

    expect(getMuscleKeyForModelObject("Acromial part of deltoid muscle.003", {
      name: "Deltoid",
      nameDetail: "Acromial Part Of Deltoid Muscle",
    })).toBe("sideDeltoid");

    expect(getMuscleKeyForModelObject("Scapular spinal part of deltoid muscle.003", {
      name: "Deltoid",
      nameDetail: "Scapular Spinal Part Of Deltoid Muscle",
    })).toBe("rearDeltoid");
  });
});
