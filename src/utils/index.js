import moment from "moment";

export const formatDateWithYear = (date) => {
  // Months array to get the month name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month, day, year, hour, and minute from the date object
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes();

  // Determine AM or PM suffix and convert hour to 12-hour format
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour 0 to 12

  // Format the hour and minute to always show two digits
  const hourFormatted = hour.toString().padStart(2, "0");
  const minuteFormatted = minute.toString().padStart(2, "0");

  // Construct the final formatted string
  const formattedDate = `${month} ${day}, ${year} ${hourFormatted}:${minuteFormatted} ${amPm}`;

  return formattedDate;
};

export const calculateMetrics = (userClients) => {
  const contactedClients = userClients.filter(
    (client) => client.contacted
  ).length;

  const calculateAverageResponseTime = (clients) => {
    const responseTimes = clients
      .map((client) => {
        if (client.dateAdded && client.lastActivity) {
          const dateAdded = moment(client.dateAdded, "MMM D - hh:mm A");
          const lastActivity = moment(
            client.lastActivity,
            "MMM D, YYYY hh:mm A"
          );
          return dateAdded.isValid() && lastActivity.isValid()
            ? lastActivity.diff(dateAdded)
            : null;
        }
        return null;
      })
      .filter((time) => time !== null);

    if (responseTimes.length === 0) return "NA";
    const avgResponseTime =
      responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    return moment.duration(avgResponseTime).humanize();
  };

  const totalActivity = userClients.reduce(
    (acc, client) => acc + (client.groups.length > 0 ? 1 : 0),
    0
  );

  return {
    assignedClients: userClients.length,
    contactedClients,
    averageResponseTime: calculateAverageResponseTime(userClients),
    totalActivity,
  };
};
