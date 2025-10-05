import moment from 'moment';

export const dateFormat = (date) => {
    const formattedDate = moment(date);

    // Check if the date is valid
    if (!formattedDate.isValid()) {
        console.error("Invalid date:", date);  // Log invalid dates for debugging
        return 'Invalid Date';  // Return a fallback string for invalid dates
    }

    // If the date is valid, return the formatted date
    return formattedDate.format('DD/MM/YYYY');
};
