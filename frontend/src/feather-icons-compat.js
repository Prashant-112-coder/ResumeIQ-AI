// Compatibility layer for the frontend icon set.
// Feather Icons does not provide FiSparkles, so ResumeIQ-AI uses FiZap
// as the closest available fallback while preserving the existing UI API.
export * from "react-icons/fi/index.js";
export { FiZap as FiSparkles } from "react-icons/fi/index.js";
