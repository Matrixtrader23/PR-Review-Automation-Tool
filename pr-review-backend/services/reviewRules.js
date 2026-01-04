export function getRulesForBranch(branch) {
  if (branch.startsWith("feature/")) {
    return {
      name: "Feature Branch Rules",
      rules: [
        "No console.log statements",
        "Max 300 lines changed"
      ]
    };
  }

  if (branch.startsWith("bugfix/")) {
    return {
      name: "Bugfix Branch Rules",
      rules: [
        "Tests must be updated",
        "No breaking changes"
      ]
    };
  }

  if (branch === "main" || branch.startsWith("release")) {
    return {
      name: "Main/Release Rules",
      rules: [
        "Strict linting",
        "Tests required",
        "No TODO comments"
      ]
    };
  }

  return {
    name: "Default Rules",
    rules: ["Basic review"]
  };
}
