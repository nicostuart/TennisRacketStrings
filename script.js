document.getElementById("submitBtn").addEventListener("click", () => {
    // Retrieve slider values
    const power = parseInt(document.getElementById("power").value);
    const control = parseInt(document.getElementById("control").value);
    const spin = parseInt(document.getElementById("spin").value);
    const price = parseInt(document.getElementById("price").value);
    const comfort = parseInt(document.getElementById("comfort").value);
    const often = parseInt(document.getElementById("often").value);
    const years = parseInt(document.getElementById("years").value);

    console.log("Inputs:", power, control, spin, price, comfort, often, years);

    // Initialize scores for each string type
    let scores = {
        "Natural Gut": 0,
        "Synthetic Gut": 0,
        "Multifilament": 0,
        "Polyester": 0
    };

    // Natural Gut will emphasize comfort and power, penalized by price sensitivity and control needs
    scores["Natural Gut"] += comfort * 3 + power * 1.5 - price * 2 - control;

    // Synthetic Gut will be roughly balanced for beginners/intermediates, considers all factors equally
    scores["Synthetic Gut"] += (power + control + spin + price + comfort + often + years) / 7;

    // Multifilament will prioritizes comfort and power, slightly adjusted for skill and spin
    scores["Multifilament"] += comfort * 2 + power * 1.5 + years * 0.5 + spin * 0.3;

    // Polyester will generally rioritizes control, spin, and durability (often and years also influence)
    scores["Polyester"] += control * 3 + spin * 2 + price * 1.5 + often * 2 + years * 2 - comfort;

    // Tennis pro helped me think of certain play styles and understand what preferences would be for individuals with such styles, etc.
    //This also takes into account my research and calling of various pros
    if (power > 3 && control > 3) scores["Polyester"] += 3; // ..Aggressive players favor Polyester
    if (comfort > 3 && price < -2) scores["Natural Gut"] += 3; //  ex High comfort need, low price sensitivity
    if (often > 3 && years > 3) scores["Synthetic Gut"] += 2; // average/normal players benefit from Synthetic Gut
    if (spin > 3 && control > 2) scores["Polyester"] += 2; // Spin-oriented control boosts Polyester
    if (price > 3 && comfort > 2) scores["Multifilament"] += 2; // Balanced budget and comfort favors Multifilament

    // note there will be a negative penalties for conflicting traits
    if (comfort > 3 && control > 3) scores["Polyester"] -= 3; // Polyester sacrifices comfort for control

    if (price < -3) scores["Natural Gut"] -= 5; // Natural Gut will have to be penalized heavily for high price sensitivity since it's more expensive!

    console.log("Scores:", scores);

    // Code to find highest score!
    let stringRecommendation = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    console.log("Recommended String:", stringRecommendation);

    // images for the output page
    const stringImages = {
        "Natural Gut": "images/natural_gut.png",
        "Synthetic Gut": "images/synthetic_gut.png",
        "Multifilament": "images/multifilament.png",
        "Polyester": "images/polyester.png"
    };

    const chosenImage = stringImages[stringRecommendation];

    // Redirect to results page with query parameters for string and image
    window.location.href = `questionnaire-results.html?string=${encodeURIComponent(stringRecommendation)}&image=${encodeURIComponent(chosenImage)}`;
});

// document.getElementById("submitBtn").addEventListener("click", () => {
//     const power = parseInt(document.getElementById("power").value);
//     const control = parseInt(document.getElementById("control").value);
//     const spin = parseInt(document.getElementById("spin").value);

//     // Weight calculation logic
//     let score = power + control + spin;

//     // Determine string recommendation
//     let stringRecommendation = "";
//     if (score <= -5) {
//         stringRecommendation = "Natural Gut";
//     } else if (score > -5 && score <= 0) {
//         stringRecommendation = "Synthetic Gut";
//     } else if (score > 0 && score <= 5) {
//         stringRecommendation = "Multifilament";
//     } else {
//         stringRecommendation = "Polyester";
//     }

//     // Redirect to a new page with the recommendation
//     window.location.href = `questionnaire-results.html?string=${encodeURIComponent(stringRecommendation)}`;
// });