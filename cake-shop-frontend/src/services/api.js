const getBaseURL = function() {
    if (import.meta.env.MODE === "development") {
        return `http://localhost:5050/api`;
    } else {
        return `http://localhost:8080/api`;
    }
}

/**
 * @returns Default value for a product list page with no elements and no pages.
 */
export const emptyProductQueryAsync = async () => {
    return {lastPage: true, numPages: 0, cakes: []};
}
/**
 * @returns Default value for a product list page with no elements and no pages.
 */
export const emptyProductQuery = () => {
    return {lastPage: true, numPages: 0, cakes: []};
}

/**
 * Add a cake.
 * @param {object} cake
 */
export const addCake = async (cake) => {
    try {
        const response = await fetch(`${getBaseURL()}/cakes`, {
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
        const response = await fetch(`${getBaseURL()}/cakes`, {
            method: 'GET'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error getting cakes: "+e);
        return [];
    }
}

/**
 * Get a page query of the cake list.
 * @param {number} pageNr The current page.
 * @param {number} pageAmt The amount of items to be shown per page.
 * @param {string} query Optional search term to filter items with.
 */
export const getCakesSearched = async (pageNr, pageAmt, query = "") => {
    try {
        let str = `${getBaseURL()}/cakes/Page-${pageNr}_AmtPerPage-${pageAmt}`;
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
        return await emptyProductQueryAsync();
    }
}

/**
 * Get a cake specified by the id.
 * @param {number} id
 */
export const getCakeByID = async (id) => {
    try {
        const response = await fetch(`${getBaseURL()}/cakes/${id}`, {
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
        const response = await fetch(`${getBaseURL()}/cakes/${cake.id}`, {
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
        const response = await fetch(`${getBaseURL()}/cakes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error deleting cake: "+e);
        return null;
    }
}

/**
 * Add a cake.
 * @param {object} cake
 */
export const addOrder = async (order) => {
    try {
        const response = await fetch(`${getBaseURL()}/orders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(order)
        });

        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (e) {
        console.error("Error creating order: "+e);
        return null;
    }
}