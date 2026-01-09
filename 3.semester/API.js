export function getGamesByTitle(title) {
    var requestOptions = {
        method: "GET",
        redirect: "follow"
    }

    return fetch(
            `https://www.cheapshark.com/api/1.0/games?title=${title}`,
            requestOptions
        )
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => {
            console.log("error", error)
            throw error
        })
}