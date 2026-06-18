import { requestJson } from "./httpClient";
import type { TrainingSessionDto } from "./dtos";

export function getTrainingSessions(from: string, to: string) {
  const query = new URLSearchParams({ from, to });

  return requestJson<TrainingSessionDto[]>(`/trainingsessions?${query.toString()}`);
}

export function saveTrainingSession(dto: TrainingSessionDto) {
  return requestJson<TrainingSessionDto>("/trainingsessions", {
    method: "POST",
    body: dto,
  });
}

export function deleteTrainingSession(id: string) {
  return requestJson<TrainingSessionDto>(`/trainingsessions/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
