/*
 * The maker-reflection question pool — the ONE place these questions live.
 *
 * A game's detail page can carry a short "behind the game" movement: three
 * gentle, free-writing answers, one from each category. The categories run in
 * creative order (the message comes first, then how it's made, then how it
 * plays), which lets a reader quietly follow idea → mechanic → experience.
 *
 * The maker answers ONE question from each category (see README). Both options
 * in a category surface the same underlying idea, so either choice works.
 *
 * This is reused later by the submission form and by optional validation, so
 * keep it as the single source of truth.
 */
export const REFLECTION_CATEGORIES = [
  {
    id: "seed",
    label: "The seed",
    questions: [
      "Where did this game start for you?",
      "What did you want to explore or say?",
    ],
  },
  {
    id: "making",
    label: "Making it",
    questions: [
      "How do you play it — what does someone actually do?",
      "What was the trickiest thing to get working?",
    ],
  },
  {
    id: "reflection",
    label: "Playing it",
    questions: [
      "What do you hope someone feels when they play?",
      "Is there a small detail you're glad you kept?",
    ],
  },
] as const;

export type ReflectionCategory = (typeof REFLECTION_CATEGORIES)[number]["id"];

const CATEGORY_INDEX: Record<ReflectionCategory, number> = {
  seed: 0,
  making: 1,
  reflection: 2,
};

export function isReflectionCategory(
  value: unknown,
): value is ReflectionCategory {
  return typeof value === "string" && value in CATEGORY_INDEX;
}

/** The warm display label for a category, e.g. "The seed". */
export function categoryLabel(id: ReflectionCategory): string {
  return REFLECTION_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/** Sort key so reflections always read seed → making → reflection. */
export function categoryOrder(id: ReflectionCategory): number {
  return CATEGORY_INDEX[id] ?? 99;
}
