import { useEffect, useState } from "react";
import { SectionCard } from "../components/SectionCard";
import { getOptionalNumber } from "../helpers/GenericHelpers";
import {
  getExerciseDisplayLabel,
  getExerciseOptionsForMuscleGroup,
  getMuscleGroupDisplayLabel,
  muscleGroupOptions,
} from "../data/programValues";
import type { MuscleGroup } from "../types/appTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTrainingExercise,
  addTrainingSet,
  clearTrainingErrorMessage,
  clearTrainingSuccessMessage,
  deleteTrainingSession,
  fetchTrainingDays,
  removeTrainingExercise,
  removeTrainingSet,
  saveTrainingSession,
  updateTrainingExercise,
  updateTrainingSessionDraft,
  updateTrainingSet,
} from "../store/slices/trainingSlice";
import { getTrainingData, selectTrainingDays } from "../store/selectors/trainingSelector";
import { getTrainingFormError } from "../helpers/TrainingPageHelpers";

function getRangeAround(date: string) {
  const center = new Date(`${date}T00:00:00`);
  const from = new Date(center);
  const to = new Date(center);
  from.setDate(from.getDate() - 30);
  to.setDate(to.getDate() + 30);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export function TrainingPage() {
  const dispatch = useAppDispatch();
  const trainingDays = useAppSelector(selectTrainingDays);
  const {
    trainingSessionDraft,
    pendingMessage,
    successMessage,
    operationErrorMessage,
  } = useAppSelector(getTrainingData);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const range = getRangeAround(trainingSessionDraft.date);
    void dispatch(fetchTrainingDays(range));
  }, [dispatch, trainingSessionDraft.date]);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = window.setTimeout(() => dispatch(clearTrainingSuccessMessage()), 2200);
    return () => window.clearTimeout(timeout);
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (!operationErrorMessage) return;
    const timeout = window.setTimeout(() => dispatch(clearTrainingErrorMessage()), 4200);
    return () => window.clearTimeout(timeout);
  }, [dispatch, operationErrorMessage]);

  function handleSave() {
    const error = getTrainingFormError(trainingSessionDraft);
    setFormError(error ?? "");
    if (!error) void dispatch(saveTrainingSession());
  }

  const sortedDays = [...trainingDays].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="page page-stack">
      <header className="dashboard-hero">
        <p className="landing-eyebrow">训练记录</p>
        <h1 className="page-title">按训练日、Session、Exercise 和 Set 记录</h1>
        <p className="page-subtitle">
          一个训练日可以包含多次 Session；每次 Session 可以包含多个动作，每个动作的 Set 独立记录。
        </p>
      </header>

      <SectionCard title="1. 训练日" eyebrow="Training Day">
        <div className="training-form-grid training-form-grid--day">
          <label className="form-field">
            <span>日期</span>
            <input
              type="date"
              value={trainingSessionDraft.date}
              onChange={(event) => dispatch(updateTrainingSessionDraft({ field: "date", value: event.target.value }))}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="2. Session 细节" eyebrow="Training Session">
        <div className="training-form-grid training-form-grid--session">
          <label className="form-field">
            <span>开始时间</span>
            <input
              type="time"
              value={trainingSessionDraft.startTime}
              onChange={(event) => dispatch(updateTrainingSessionDraft({ field: "startTime", value: event.target.value }))}
            />
          </label>
          <label className="form-field">
            <span>时长（分钟）</span>
            <input
              type="number"
              min="1"
              value={trainingSessionDraft.durationMinutes}
              onChange={(event) => dispatch(updateTrainingSessionDraft({ field: "durationMinutes", value: Number(event.target.value) }))}
            />
          </label>
          <label className="form-field">
            <span>Session RPE</span>
            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={trainingSessionDraft.sessionRpe}
              onChange={(event) => dispatch(updateTrainingSessionDraft({ field: "sessionRpe", value: Number(event.target.value) }))}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="3. Exercises 与 Sets" eyebrow="Session 内容">
        <div className="training-exercise-stack">
          {trainingSessionDraft.exercises.map((exercise, exerciseIndex) => {
            const exerciseOptions = getExerciseOptionsForMuscleGroup(exercise.muscleGroup);

            return (
              <article className="training-exercise-editor" key={exercise.id}>
                <div className="training-editor-heading">
                  <div>
                    <p className="landing-eyebrow">Exercise {exerciseIndex + 1}</p>
                    <h3>{getExerciseDisplayLabel(exercise.exerciseName)}</h3>
                  </div>
                  <button
                    type="button"
                    className="text-button"
                    disabled={trainingSessionDraft.exercises.length === 1}
                    onClick={() => dispatch(removeTrainingExercise(exercise.id))}
                  >
                    删除 Exercise
                  </button>
                </div>

                <div className="training-form-grid training-form-grid--exercise">
                  <label className="form-field">
                    <span>肌群</span>
                    <select
                      value={exercise.muscleGroup}
                      onChange={(event) => dispatch(updateTrainingExercise({
                        exerciseId: exercise.id,
                        field: "muscleGroup",
                        value: event.target.value,
                      }))}
                    >
                      {muscleGroupOptions.map((muscleGroup) => (
                        <option key={muscleGroup} value={muscleGroup}>
                          {getMuscleGroupDisplayLabel(muscleGroup)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-field">
                    <span>动作</span>
                    <select
                      value={exercise.exerciseName}
                      onChange={(event) => dispatch(updateTrainingExercise({
                        exerciseId: exercise.id,
                        field: "exerciseName",
                        value: event.target.value,
                      }))}
                    >
                      {exerciseOptions.map((name) => (
                        <option key={name} value={name}>{getExerciseDisplayLabel(name)}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="training-set-table-wrap">
                  <table className="training-set-table">
                    <thead>
                      <tr>
                        <th>Set</th>
                        <th>次数</th>
                        <th>重量 kg</th>
                        <th>RPE</th>
                        <th>RIR</th>
                        <th>类型</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.sets.map((set, setIndex) => (
                        <tr key={set.id}>
                          <td className="training-set-number">{setIndex + 1}</td>
                          <td><input aria-label={`Exercise ${exerciseIndex + 1} Set ${setIndex + 1} 次数`} type="number" min="1" value={set.reps} onChange={(event) => dispatch(updateTrainingSet({ exerciseId: exercise.id, setId: set.id, field: "reps", value: Number(event.target.value) }))} /></td>
                          <td><input aria-label={`Exercise ${exerciseIndex + 1} Set ${setIndex + 1} 重量`} type="number" min="0" step="0.5" value={set.weightKg} onChange={(event) => dispatch(updateTrainingSet({ exerciseId: exercise.id, setId: set.id, field: "weightKg", value: Number(event.target.value) }))} /></td>
                          <td><input aria-label={`Exercise ${exerciseIndex + 1} Set ${setIndex + 1} RPE`} type="number" min="1" max="10" step="0.5" value={set.rpe ?? ""} onChange={(event) => dispatch(updateTrainingSet({ exerciseId: exercise.id, setId: set.id, field: "rpe", value: getOptionalNumber(event.target.value) }))} /></td>
                          <td><input aria-label={`Exercise ${exerciseIndex + 1} Set ${setIndex + 1} RIR`} type="number" min="0" step="1" value={set.rir ?? ""} onChange={(event) => dispatch(updateTrainingSet({ exerciseId: exercise.id, setId: set.id, field: "rir", value: getOptionalNumber(event.target.value) }))} /></td>
                          <td>
                            <select
                              aria-label={`Exercise ${exerciseIndex + 1} Set ${setIndex + 1} 类型`}
                              value={set.isWarmup ? "warmup" : "working"}
                              onChange={(event) => dispatch(updateTrainingSet({ exerciseId: exercise.id, setId: set.id, field: "isWarmup", value: event.target.value === "warmup" }))}
                            >
                              <option value="working">正式组</option>
                              <option value="warmup">热身组</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="text-button"
                              disabled={exercise.sets.length === 1}
                              onClick={() => dispatch(removeTrainingSet({ exerciseId: exercise.id, setId: set.id }))}
                            >删除</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button type="button" className="button-secondary" onClick={() => dispatch(addTrainingSet(exercise.id))}>
                  + 新增 Set
                </button>
              </article>
            );
          })}

          <button type="button" className="button-secondary" onClick={() => dispatch(addTrainingExercise())}>
            + 新增 Exercise
          </button>
        </div>

        {formError ? <p className="form-error" role="alert">{formError}</p> : null}
        <div className="training-save-row">
          <button type="button" className="button-dark" onClick={handleSave}>保存完整 Session</button>
          <span>{trainingSessionDraft.exercises.length} 个 Exercise · {trainingSessionDraft.exercises.reduce((total, exercise) => total + exercise.sets.length, 0)} 个 Set</span>
        </div>
      </SectionCard>

      <SectionCard title="已保存训练" eyebrow="内存数据（重启后清空）">
        {sortedDays.length === 0 ? (
          <p className="body-text">还没有保存的训练 Session。</p>
        ) : (
          <div className="training-day-list">
            {sortedDays.map((day) => (
              <article className="training-day-card" key={day.id}>
                <div className="training-editor-heading">
                  <div>
                    <p className="landing-eyebrow">Training Day</p>
                    <h3>{day.date}</h3>
                  </div>
                  <span>{day.sessions.length} 个 Session</span>
                </div>
                {day.sessions.map((session) => (
                  <div className="saved-training-session" key={session.id}>
                    <div>
                      <strong>{session.startTime}</strong>
                      <span>{session.durationMinutes} 分钟 · RPE {session.sessionRpe}</span>
                    </div>
                    <div className="saved-training-exercises">
                      {session.exercises.map((exercise) => (
                        <span key={exercise.id}>
                          {getMuscleGroupDisplayLabel(exercise.muscleGroup as MuscleGroup)} · {getExerciseDisplayLabel(exercise.exerciseName)} · {exercise.sets.length} Sets
                        </span>
                      ))}
                    </div>
                    <button type="button" className="text-button" onClick={() => void dispatch(deleteTrainingSession(session.id))}>
                      删除 Session
                    </button>
                  </div>
                ))}
              </article>
            ))}
          </div>
        )}
      </SectionCard>

      {pendingMessage ? <div className="operation-loading-overlay" role="status"><div className="operation-loading-panel"><span className="operation-spinner" />{pendingMessage}</div></div> : null}
      {successMessage ? <div className="floating-operation-badge floating-operation-badge--success" role="status">{successMessage}</div> : null}
      {operationErrorMessage ? <div className="floating-operation-badge floating-operation-badge--error" role="alert">{operationErrorMessage}</div> : null}
    </div>
  );
}
