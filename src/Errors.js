export default class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor(errors = {}) {
        this.errors = errors;
    }

    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all() {
        return this.errors;
    }

    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string} field
     */
    has(field) {
        return Object.keys(this.errors).some(
            e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`)
        );
    }

    first(field) {
        return this.get(field)[0];
    }

    get(field) {
        return this.errors[field] || [];
    }

    /**
     * Determine if we have any errors.
     * Or return errors for the given keys.
     *
     * @param {array} keys
     */
    any(keys = []) {
        if (keys.length === 0) {
            return Object.keys(this.errors).length > 0;
        }

        let errors = {};

        keys.forEach(key => errors[key] = this.get(key));

        return errors;
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors = {}) {
        this.errors = errors;
    }

    /**
     * Clear a specific field, object or all error fields.
     *
     * @param {string|null} field
     */
    clear(field) {
        if (!field) {
            this.errors = {};

            return;
        }

        let errors = { ...this.errors };

        Object.keys(errors)
            .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
            .forEach(e => delete errors[e]);

        this.errors = errors;
    }
}
