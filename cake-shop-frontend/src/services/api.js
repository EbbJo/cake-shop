const BASE_URL = `http://localhost:5050/api`;

/**
 * Add a cake.
 * @param {object} cake
 */
export const addCake = async (cake) => {
    try {
        const response = await fetch(`${BASE_URL}/cakes`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cake)
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error creating cake: "+e);
        return null;
    }
}

/**
 * Get all cakes.
 */
export const getAllCakes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/cakes`, {
            method: 'GET'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error getting cakes: "+e);
        return [];
    }
}

export const getCakesSearched = async (pageNr, pageAmt, query = "") => {
    try {
        let str = `${BASE_URL}/cakes/Page-${pageNr}_AmtPerPage-${pageAmt}`;
        if (query.length > 0) {
            str += `?query=${query}`;
        }

        const response = await fetch(str, {
            method: 'GET'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error getting cakes: "+e);
        return {lastPage: true, cakes: []};
    }
}

/**
 * Get a cake specified by the id.
 * @param {number} id
 */
export const getCakeByID = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/cakes/${id}`, {
            method: 'GET'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error getting cake: "+e);
        return null;
    }
}

/**
 * Update a cake.
 * @param {object} cake
 */
export const updateCake = async (cake) => {
    try {
        const response = await fetch(`${BASE_URL}/cakes/${cake.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cake)
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error updating cake: "+e);
        return null;
    }
}

/**
 * Delete a cake specified by the id.
 * @param {number} id
 */
export const deleteCake = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/cakes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error deleting cake: "+e);
        return null;
    }
}