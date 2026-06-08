export interface DepartmentHubConfig {
  slug: string;
  titleKey: "health" | "finance" | "education";
  articleTags?: string[];
  articleCategories?: string[];
}

export const departmentHubs: DepartmentHubConfig[] = [
  {
    slug: "health",
    titleKey: "health",
    articleTags: ["health-department"],
  },
  {
    slug: "finance",
    titleKey: "finance",
    articleCategories: ["finance", "treasury", "apgli", "gpf"],
  },
  {
    slug: "education",
    titleKey: "education",
    articleCategories: ["establishment", "service-rules"],
  },
];
