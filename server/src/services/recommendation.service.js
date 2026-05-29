const prisma = require('../utils/prisma');

function calculateMatchScore(studentInterests, studentSkills, opportunity) {
  if (!studentInterests || !studentSkills) return 0;

  const oppSkills = opportunity.skillsRequired || [];
  const categoryToInterest = {
    INTERNSHIP: 'Software Engineering',
    COLLABORATION: 'Software Engineering',
    COMPETITION: 'Software Engineering',
    TRAINING: 'Software Engineering',
  };

  // Interest overlap (60% weight)
  const interestFields = [...oppSkills, categoryToInterest[opportunity.category]];
  const interestOverlap = studentInterests.filter((interest) =>
    interestFields.some((field) =>
      field.toLowerCase().includes(interest.toLowerCase().split(' / ')[0].split(' ')[0]) ||
      interest.toLowerCase().includes(field.toLowerCase().split(' ')[0])
    )
  ).length;
  const interestScore = interestFields.length > 0
    ? (interestOverlap / Math.max(studentInterests.length, 1)) * 100
    : 0;

  // Skill overlap (40% weight)
  const skillOverlap = studentSkills.filter((skill) =>
    oppSkills.some((reqSkill) =>
      reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(reqSkill.toLowerCase())
    )
  ).length;
  const skillScore = oppSkills.length > 0
    ? (skillOverlap / oppSkills.length) * 100
    : 0;

  const totalScore = Math.round(interestScore * 0.6 + skillScore * 0.4);
  
  return {
    score: Math.min(100, totalScore),
    interestOverlap,
    skillOverlap,
    totalInterestFields: studentInterests.length,
    totalSkillsRequired: oppSkills.length,
  };
}

async function getRecommended(userId, limit = 6) {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    select: { interests: true, skills: true },
  });

  if (!profile) return [];

  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: 'ACTIVE',
      deadline: { gte: new Date() },
    },
    include: {
      company: {
        select: {
          companyName: true,
          logoUrl: true,
        },
      },
      _count: {
        select: { savedBy: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const scored = opportunities.map((opp) => {
    const matchResult = calculateMatchScore(profile.interests, profile.skills, opp);
    return {
      ...opp,
      matchScore: matchResult.score,
      matchBreakdown: matchResult,
    };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, limit);
}

module.exports = {
  calculateMatchScore,
  getRecommended,
};
