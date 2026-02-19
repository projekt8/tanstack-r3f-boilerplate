import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { AnimationAction } from 'three';
import type { ModelId } from '@/stores/useAnimationStore';
import { useAnimationStore } from '@/stores/useAnimationStore';

/**
 * Hook that connects a model's animations to the global animation store.
 *
 * - Registers the model on mount, unregisters on unmount
 * - Crossfades to the active animation whenever the store changes
 *
 * @param modelId - Unique identifier for this model instance
 * @param actions - The actions object from drei's `useAnimations`
 * @param defaultAnimation - Animation to play on mount
 */
export function useModelAnimation(
  modelId: ModelId,
  actions: Record<string, AnimationAction | null>,
  defaultAnimation: string
) {
  const { register, unregister } = useAnimationStore(
    useShallow((s) => ({ register: s.register, unregister: s.unregister }))
  );

  const modelState = useAnimationStore((s) => s.models[modelId]);
  const previousAnimation = useRef<string | null>(null);

  // Register on mount, unregister on unmount
  useEffect(() => {
    register(modelId, defaultAnimation);
    return () => unregister(modelId);
  }, [modelId, defaultAnimation, register, unregister]);

  // Crossfade when the active animation changes
  useEffect(() => {
    if (!modelState) return;

    const { currentAnimation, fadeDuration } = modelState;
    const nextAction = actions[currentAnimation];
    if (!nextAction) return;

    // Fade out the previous animation
    if (previousAnimation.current && previousAnimation.current !== currentAnimation) {
      const prevAction = actions[previousAnimation.current];
      prevAction?.fadeOut(fadeDuration);
    }

    // Fade in the new animation
    nextAction.reset().fadeIn(fadeDuration).play();
    previousAnimation.current = currentAnimation;

    // No cleanup fadeOut here — it's handled by the fade-out-previous logic above
  }, [modelState?.currentAnimation, modelState?.fadeDuration, actions]);
}
