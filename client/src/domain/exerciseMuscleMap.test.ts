import { describe, expect, it } from "vitest";
import { getExerciseMuscleContribution } from "./exerciseMuscleMap";

function contributionFor(exerciseName: string, muscleGroup: Parameters<typeof getExerciseMuscleContribution>[1]) {
  const contribution = getExerciseMuscleContribution(exerciseName, muscleGroup);
  if (!contribution) throw new Error(`Missing contribution for ${exerciseName}`);
  return Object.fromEntries(
    contribution.muscles.map((activation) => [activation.muscle, activation.contribution]),
  );
}

describe("exerciseMuscleMap", () => {
  it("separates incline bench from flat bench by pectoralis region", () => {
    const flatBench = contributionFor("Bench Press", "Chest");
    const inclineBench = contributionFor("Incline Bench Press", "Chest");

    expect(flatBench.pecSternocostal).toBeGreaterThan(flatBench.pecClavicular);
    expect(inclineBench.pecClavicular).toBeGreaterThan(inclineBench.pecSternocostal);
    expect(inclineBench.pecAbdominal).toBeLessThan(inclineBench.pecClavicular);
  });

  it("maps horizontal rows to mid-back muscles instead of a generic back bucket", () => {
    const row = contributionFor("Barbell Row", "Back");

    expect(row.rhomboidMajor).toBeGreaterThanOrEqual(70);
    expect(row.midTrapezius).toBeGreaterThan(row.latissimusDorsi);
    expect(row.erectorSpinae).toBeGreaterThan(0);
  });

  it("separates glute thrusting from hip abduction", () => {
    const hipThrust = contributionFor("Hip Thrust", "Glutes");
    const abduction = contributionFor("Abduction Machine", "Glutes");

    expect(hipThrust.gluteMaximus).toBeGreaterThan(hipThrust.gluteMedius);
    expect(abduction.gluteMedius).toBeGreaterThan(abduction.gluteMaximus);
    expect(abduction.gluteMinimus).toBeGreaterThan(abduction.gluteMaximus);
  });

  it("separates seated and standing calf work", () => {
    const standing = contributionFor("Standing Calf Raise", "Calves");
    const seated = contributionFor("Seated Calf Raise", "Calves");

    expect(standing.gastrocnemiusMedial).toBeGreaterThan(standing.soleus);
    expect(seated.soleus).toBeGreaterThan(seated.gastrocnemiusMedial);
  });
});
