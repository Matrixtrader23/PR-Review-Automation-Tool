import axios from "axios";
import { getRulesForBranch } from "./reviewRules.js";

export async function reviewPullRequest({ repo, prNumber, branch }) {
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json"
  };

  // Fetch PR files
  const filesResponse = await axios.get(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/files`,
    { headers }
  );

  const files = filesResponse.data;

  // Apply rules
  const ruleSet = getRulesForBranch(branch);
  const violations = [];

  files.forEach(file => {
    if (file.patch && file.patch.includes("console.log")) {
      violations.push(`console.log found in ${file.filename}`);
    }
  });

  const score = Math.max(10 - violations.length, 1);

  return {
    status: "PENDING_INSTRUCTOR_APPROVAL",
    repository: repo,
    pullRequest: prNumber,
    branch,
    rulesApplied: ruleSet.rules,
    violations,
    score
  };
}
