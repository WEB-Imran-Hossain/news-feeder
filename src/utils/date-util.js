function getFormattedDate(value, type) {
  if (!type) return value; // Check 'type' ; if not, return the input 'value'

  const date = new Date(value); // Create a new Date object from the 'value'

  let options; // Declare a variable to hold date formatting options
  if (type === "date") {
    // Define options for formatting the date
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date); // Format the date using the specified options and return the formatted date string
  } else {
    return date.toString(); // 'type' is not "date", return the date as a string
  }
}
export { getFormattedDate };
