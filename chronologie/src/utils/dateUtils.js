
export const parseDateObj = (dateStr) => {
    if (!dateStr) return null;
    try {
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                return new Date(parts[2], parts[1] - 1, parts[0]);
            }
            if (parts.length === 2) {
                return new Date(parts[1], parts[0] - 1, 1);
            }
        }
        if (/^\d{4}$/.test(dateStr)) {
            return new Date(dateStr, 0, 1);
        }
        return new Date(dateStr);
    } catch (e) {
        console.log(e)
    }
};
