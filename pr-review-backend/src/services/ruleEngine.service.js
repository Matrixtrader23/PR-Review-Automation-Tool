const rules = {
  "feature": {
    requireTests: true,
    minFilesChanged: 2
  },
  "bugfix": {
    requireTests: true,
    minFilesChanged: 1
  },
  "hotfix": {
    requireTests: false,
    minFilesChanged: 1
  }
};

function evaluatePR(branchName, filesChanged) {
  const key = branchName.split("/")[0];
  const rule = rules[key] || rules["feature"];

  return {
    requireTests: rule.requireTests,
    passed:
      filesChanged.length >= rule.minFilesChanged
  };
}

module.exports = { evaluatePR };
