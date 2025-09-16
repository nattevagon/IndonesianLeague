export default function safeJsonParse(value) {
  try {
    if (!value) return null;
    return JSON.parse(value);
  } catch (error) {
    console.error("JSON parse error:", error.message);
    return null;
  }
}