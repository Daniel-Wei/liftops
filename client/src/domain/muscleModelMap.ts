import type { MuscleMapKey } from "../types/appTypes";

type MuscleModelDefinition = {
  labels: string[];
};

const muscleModelMap: Record<MuscleMapKey, MuscleModelDefinition> = {
  pecClavicular: {
    labels: ["clavicular head of pectoralis major"],
  },
  pecSternocostal: {
    labels: ["sternocostal head of pectoralis major"],
  },
  pecAbdominal: {
    labels: ["abdominal part of pectoralis major"],
  },
  pectoralisMinor: {
    labels: ["pectoralis minor"],
  },
  latissimusDorsi: {
    labels: ["latissimus dorsi"],
  },
  teresMajor: {
    labels: ["teres major"],
  },
  teresMinor: {
    labels: ["teres minor"],
  },
  infraspinatus: {
    labels: ["infraspinatus"],
  },
  rhomboidMajor: {
    labels: ["rhomboid major"],
  },
  rhomboidMinor: {
    labels: ["rhomboid minor"],
  },
  upperTrapezius: {
    labels: ["descending part of trapezius"],
  },
  midTrapezius: {
    labels: ["transverse part of trapezius"],
  },
  lowerTrapezius: {
    labels: ["ascending part of trapezius"],
  },
  erectorSpinae: {
    labels: [
      "iliocostalis lumborum",
      "iliocostalis thoracis",
      "longissimus thoracis",
      "spinalis thoracis",
      "multifidus lumborum",
      "multifidus thoracis",
    ],
  },
  serratusAnterior: {
    labels: ["serratus anterior"],
  },
  frontDeltoid: {
    labels: ["clavicular part of deltoid"],
  },
  sideDeltoid: {
    labels: ["acromial part of deltoid"],
  },
  rearDeltoid: {
    labels: ["scapular spinal part of deltoid"],
  },
  bicepsLongHead: {
    labels: ["long head of biceps brachii"],
  },
  bicepsShortHead: {
    labels: ["short head of biceps brachii"],
  },
  brachialis: {
    labels: ["brachialis"],
  },
  brachioradialis: {
    labels: ["brachioradialis"],
  },
  tricepsLongHead: {
    labels: ["long head of triceps brachii"],
  },
  tricepsLateralHead: {
    labels: ["lateral head of triceps brachii"],
  },
  tricepsMedialHead: {
    labels: ["medial head of triceps brachii"],
  },
  rectusAbdominis: {
    labels: ["rectus abdominis"],
  },
  externalOblique: {
    labels: ["external abdominal oblique"],
  },
  internalOblique: {
    labels: ["internal abdominal oblique"],
  },
  transversusAbdominis: {
    labels: ["transversus abdominis"],
  },
  gluteMaximus: {
    labels: ["gluteus maximus"],
  },
  gluteMedius: {
    labels: ["gluteus medius"],
  },
  gluteMinimus: {
    labels: ["gluteus minimus"],
  },
  adductorMagnus: {
    labels: ["adductor magnus"],
  },
  rectusFemoris: {
    labels: ["rectus femoris"],
  },
  vastusLateralis: {
    labels: ["vastus lateralis"],
  },
  vastusMedialis: {
    labels: ["vastus medialis"],
  },
  vastusIntermedius: {
    labels: ["vastus intermedius"],
  },
  bicepsFemorisLongHead: {
    labels: ["long head of biceps femoris"],
  },
  bicepsFemorisShortHead: {
    labels: ["short head of biceps femoris"],
  },
  semitendinosus: {
    labels: ["semitendinosus"],
  },
  semimembranosus: {
    labels: ["semimembranosus"],
  },
  gastrocnemiusMedial: {
    labels: ["medial head of gastrocnemius"],
  },
  gastrocnemiusLateral: {
    labels: ["lateral head of gastrocnemius"],
  },
  soleus: {
    labels: ["soleus"],
  },
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[().#]/g, " ")
    .replace(/\.\d+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getModelSearchText(name: string, userData: Record<string, unknown>) {
  const userDataName = typeof userData.name === "string" ? userData.name : "";
  const nameDetail = typeof userData.nameDetail === "string" ? userData.nameDetail : "";

  return normalize([name, userDataName, nameDetail].join(" "));
}

export function getMuscleKeyForModelObject(name: string, userData: Record<string, unknown>) {
  const searchText = getModelSearchText(name, userData);

  return Object.entries(muscleModelMap).find(([, definition]) => (
    definition.labels.some((label) => searchText.includes(normalize(label)))
  ))?.[0] as MuscleMapKey | undefined;
}

export function getModelLabelsForMuscle(muscle: MuscleMapKey) {
  return muscleModelMap[muscle].labels;
}
