export const formatDateAdded = (date) => {
    // Months array to get the month name
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the month, day, hour, and minute from the date object
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    
    // Determine AM or PM suffix and convert hour to 12-hour format
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour 0 to 12
    
    // Format the hour and minute to always show two digits
    const hourFormatted = hour < 10 ? `0${hour}` : hour;
    const minuteFormatted = minute < 10 ? `0${minute}` : minute;
    
    // Construct the final formatted string
    const formattedDate = `${month} ${day} - ${hourFormatted}:${minuteFormatted} ${amPm}`;
    
    return formattedDate;
}

export const formatDateWithYear = (date) => {
    // Months array to get the month name
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the month, day, year, hour, and minute from the date object
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes();
    
    // Determine AM or PM suffix and convert hour to 12-hour format
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour 0 to 12
    
    // Format the hour and minute to always show two digits
    const hourFormatted = hour.toString().padStart(2, '0');
    const minuteFormatted = minute.toString().padStart(2, '0');
    
    // Construct the final formatted string
    const formattedDate = `${month} ${day}, ${year} ${hourFormatted}:${minuteFormatted} ${amPm}`;
    
    return formattedDate;
}