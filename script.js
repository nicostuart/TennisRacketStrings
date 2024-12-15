document.getElementById("submitBtn").addEventListener("click", () => {
    const power = parseInt(document.getElementById("power").value);
    const control = parseInt(document.getElementById("control").value);
    const spin = parseInt(document.getElementById("spin").value);

    // Weight calculation logic
    let score = power + control + spin;

    // Determine string recommendation
    let stringRecommendation = "";
    if (score <= -5) {
        stringRecommendation = "Natural Gut";
    } else if (score > -5 && score <= 0) {
        stringRecommendation = "Synthetic Gut";
    } else if (score > 0 && score <= 5) {
        stringRecommendation = "Multifilament";
    } else {
        stringRecommendation = "Polyester";
    }

    // Redirect to a new page with the recommendation
    window.location.href = `questionnaire-results.html?string=${encodeURIComponent(stringRecommendation)}`;
});