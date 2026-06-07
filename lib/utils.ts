export function cn(...inputs: (string | false | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
