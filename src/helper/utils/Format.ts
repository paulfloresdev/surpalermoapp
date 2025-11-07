//  Converts a Date object to a string formatted for HTML date input (YYYY-MM-DD)
export function DateToInput(value: Date | string | null | undefined): string {
    if (!value) return "";

    if (typeof value === "string") {
        // asumiendo formato ISO o YYYY-MM-DD — esto funciona para ambos
        return value.substring(0, 10);
    }

    return value.toISOString().substring(0, 10);
}

//  Gets Char from boolean for Y/N combos
export function YNParse(value: boolean | null | undefined): string {
    return value ? '1' : '0';
}

//  Converts '1'/'0' string to boolean for Y/N combos
export function BoolParse(value: string | null | undefined): boolean {
    return value === '1' ? true : false;
}