export {};

declare global {
    interface String {
        capitalizeFirstChar(): string;
    }
}

String.prototype.capitalizeFirstChar = function () {
    if (this.length === 0) return "";
    else return `${this.charAt(0).toUpperCase()}${this.substring(1)}`;
}