import { create } from 'zustand';

export type ModelId = string;

type ModelAnimationState = {
  /** Currently active animation name */
  currentAnimation: string;
  /** Crossfade duration in seconds */
  fadeDuration: number;
};

type AnimationStore = {
  /** Animation state keyed by model ID */
  models: Record<string, ModelAnimationState>;

  /** Register a model with its default animation (called on mount) */
  register: (modelId: ModelId, defaultAnimation: string) => void;
  /** Unregister a model (called on unmount) */
  unregister: (modelId: ModelId) => void;
  /** Set the active animation for a specific model */
  setAnimation: (modelId: ModelId, name: string) => void;
  /** Adjust the crossfade duration for a specific model */
  setFadeDuration: (modelId: ModelId, duration: number) => void;
};

export const useAnimationStore = create<AnimationStore>((set) => ({
  models: {},

  register: (modelId, defaultAnimation) =>
    set((state) => ({
      models: {
        ...state.models,
        [modelId]: {
          currentAnimation: defaultAnimation,
          fadeDuration: 0.5,
        },
      },
    })),

  unregister: (modelId) =>
    set((state) => {
      const { [modelId]: _, ...rest } = state.models;
      return { models: rest };
    }),

  setAnimation: (modelId, name) =>
    set((state) => {
      const model = state.models[modelId];
      if (!model) return state;
      return {
        models: {
          ...state.models,
          [modelId]: { ...model, currentAnimation: name },
        },
      };
    }),

  setFadeDuration: (modelId, duration) =>
    set((state) => {
      const model = state.models[modelId];
      if (!model) return state;
      return {
        models: {
          ...state.models,
          [modelId]: { ...model, fadeDuration: duration },
        },
      };
    }),
}));
