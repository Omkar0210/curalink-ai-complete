// Utility function to calculate match score between user data and experts/trials/publications

export const calculateMatchScore = (
  userCondition: string,
  userFieldOfResearch: string,
  targetTags: string[],
  targetSpecialization?: string,
  targetTitle?: string
): number => {
  let score = 0;
  const maxScore = 100;
  
  // Normalize strings for comparison
  const normalizeText = (text: string) => text.toLowerCase().trim();
  
  const condition = normalizeText(userCondition || "");
  const field = normalizeText(userFieldOfResearch || "");
  const specialization = normalizeText(targetSpecialization || "");
  const title = normalizeText(targetTitle || "");
  const tags = targetTags.map(normalizeText);

  // Check for exact matches (30 points each)
  if (condition && tags.some(tag => tag.includes(condition) || condition.includes(tag))) {
    score += 30;
  }
  if (field && tags.some(tag => tag.includes(field) || field.includes(tag))) {
    score += 30;
  }

  // Check specialization match (25 points)
  if (specialization) {
    if (condition && specialization.includes(condition)) score += 15;
    if (field && specialization.includes(field)) score += 15;
  }

  // Check title match (20 points)
  if (title) {
    if (condition && title.includes(condition)) score += 10;
    if (field && title.includes(field)) score += 10;
  }

  // Partial keyword matches (15 points)
  const keywords = [...condition.split(/\s+/), ...field.split(/\s+/)].filter(k => k.length > 3);
  keywords.forEach(keyword => {
    if (tags.some(tag => tag.includes(keyword))) {
      score += 3;
    }
  });

  // Cap at 100
  return Math.min(score, maxScore);
};

export const getMatchLabel = (score: number): { text: string; color: string } => {
  if (score >= 85) return { text: "Excellent Match", color: "bg-success text-success-foreground" };
  if (score >= 70) return { text: "Good Match", color: "bg-primary text-primary-foreground" };
  if (score >= 50) return { text: "Moderate Match", color: "bg-accent text-accent-foreground" };
  return { text: "Low Match", color: "bg-muted text-muted-foreground" };
};
