import { reactive } from 'vue';

class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor(errors = {}) {
        this.errors = reactive(errors);
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
        let hasError = Object.prototype.hasOwnProperty.call(this.errors, field);

        if (!hasError) {
            const errors = Object.keys(this.errors).filter(
                e => e.startsWith(`${field}.`) || e.startsWith(`${field}[`)
            );

            hasError = errors.length > 0;
        }

        return hasError;
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
        this.errors = reactive(errors);
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

        this.errors = reactive(errors);
    }
}

export default Errors;
