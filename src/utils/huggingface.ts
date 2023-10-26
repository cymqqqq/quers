// import fetch from "node-fetch";
// async function query(data) {
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/gpt2",
//         {
//             headers: { Authorization: `Bearer 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` },
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );
//     const result = await response.json();
//     return result;
// }
// query("Can you please let us know more details about your ").then((response) => {
//     console.log(JSON.stringify(response));
// });