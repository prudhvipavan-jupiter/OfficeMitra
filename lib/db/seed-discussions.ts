/** Community seed disabled for production — real posts only. */
export const seedDiscussions: never[] = [];

export async function seedDiscussionsIfEmpty(
  _sql: ReturnType<typeof import("./client").getSql>
) {
  // Intentionally empty — do not seed fictional community posts in production.
}
