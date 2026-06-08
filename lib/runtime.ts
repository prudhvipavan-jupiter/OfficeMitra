/** True during `next build` static generation — skip DB/CMS side effects. */
export function isNextBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}
