export function formatDate(date) {
    let dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Vancouver"
    };
    return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
}