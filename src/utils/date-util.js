function getFormattedDate(value, type) {
  if (!type) return value;

  const date = new Date(value);

  let options;
  if (type === "date") {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
    }else{
        return date.toString()
  }
  
}
export { getFormattedDate };
