var requestOptions = {
    method: "GET",
    redirect: "follow"
}

fetch(
        "https://www.cheapshark.com/api/1.0/games?title=batman",
        requestOptions
    )
    .then(response => response.text())
    .then(result => {
        const data = JSON.parse(result)
        console.log("Games found:", data.length)
        console.log("First game:", data[0])
    })
    .catch(error => console.log("error", error))