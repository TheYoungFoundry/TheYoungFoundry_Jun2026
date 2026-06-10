import { buildQuestions } from '../quiz/quizEngine.js';
import { GRADE_PROFILE } from '../difficulty/difficultyManager.js';

export async function generateAssessment(grade, topicIds, topicDefs, actDefs) {
  const profile  = GRADE_PROFILE[grade] || GRADE_PROFILE[3];
  const duration = 20;

  const allActIds = actDefs
    .filter(a => a.grades.includes(grade))
    .map(a => a.id);

  const questions = await buildQuestions(
    grade, topicIds, allActIds, duration, topicDefs, actDefs
  );

  return {
    grade,
    profile,
    questions,
    topicIds,
    totalQuestions: questions.length,
    createdAt: new Date().toISOString()
  };
}

export function scoreAssessment(questions, answers) {
  let correct = 0;
  const results = questions.map((q, i) => {
    const given = (answers[i] || '').trim();
    const isCorrect = given === q.answer ||
      given.toLowerCase() === q.answer.toLowerCase();
    if (isCorrect) correct++;
    return { question: q, given, correct: isCorrect };
  });

  const total = questions.length;
  const pct   = total > 0 ? Math.round(correct / total * 100) : 0;
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';

  return { correct, total, pct, grade, results };
}
