export function formatDate(date: string): string {

    return new Date(date).toLocaleString("en-IN", {

        day: "2-digit",
        month: "short",
        year: "numeric",

        hour: "numeric",
        minute: "2-digit",

        hour12: true

    });

}