export function resumeAnalysisPrompt(
  resumeText: string,
  jobRole: string
) {
  return `
You are an expert technical recruiter.

Analyze the following resume for the job role: ${jobRole}

Return clearly separated sections:
1. Strengths
2. Weaknesses
3. Missing Skills
4. Estimated ATS Score (0-100)

Resume:
${resumeText}
`
}
