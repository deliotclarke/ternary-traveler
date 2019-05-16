const baseURL = "http://0.0.0.0:8088";

const APIManager = {
    getAllPlaces: function () {
        return fetch(`${baseURL}/places`)
            .then(response => response.json())
    },
    getAllInterests: function () {
        return fetch(`${baseURL}/interests`)
            .then(response => response.json())
    },
    getSingleInterest: function (id) {
        return fetch(`${baseURL}/interests/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json())
    },
    addInterest: function (obj) {
        return fetch(`${baseURL}/interests`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(response => response.json())
    },
    editInterest: function (id, obj) {
        return fetch(`${baseURL}/interests/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(response => response.json())
    },
    deleteInterest: function (id) {
        return fetch(`${baseURL}/interests/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        }).then(response => response.json())
    }
}

export default APIManager;
