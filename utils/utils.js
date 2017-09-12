export const timestamp = () => {
  return (new Date()).getTime();
}

export const timestampAgo = (days = 0) => {
    let date = new Date();
    date.setDate(date.getDate() - days);
    return date.getTime();
}

export const daysAgo = (timestamp) => {
    const days = (1000 * 60 * 60 * 24);

    const date = new Date(timestamp),
        now = new Date(),
        delta = now - date;

    return Math.floor(delta / days);
}

export const capitalize = (string) => {
    return string.substr(0, 1).toUpperCase() + string.substr(1);
}