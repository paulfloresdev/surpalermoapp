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

export function SKey(key: string | number | null | undefined) {
    if (key == null) return new Set<string>();
    return new Set<string>([String(key)]);
}

// utils/date.ts
export const GetAge = (fecha: string | Date | null | undefined): string => {
    if (!fecha) return "";
    const born = new Date(fecha);
    if (isNaN(born.getTime())) return "";

    const today = new Date();
    let age = today.getFullYear() - born.getFullYear();

    const hasBirthdayPassedThisYear =
        today.getMonth() > born.getMonth() ||
        (today.getMonth() === born.getMonth() && today.getDate() >= born.getDate());

    if (!hasBirthdayPassedThisYear) age--;

    return String(age);
};

export const GetAgeAtMonthEnd = (
    fecha: string | Date | null | undefined,
    month: number | null | undefined, // 1-12
    year: number | null | undefined
): string => {
    if (!fecha || !month || !year) return "-";

    const born = new Date(fecha);
    if (isNaN(born.getTime())) return "-";

    // Último día del mes (month: 1–12)
    const endOfMonth = new Date(year, month, 0);

    let age = endOfMonth.getFullYear() - born.getFullYear();

    const hasBirthdayPassed =
        endOfMonth.getMonth() > born.getMonth() ||
        (endOfMonth.getMonth() === born.getMonth() &&
            endOfMonth.getDate() >= born.getDate());

    if (!hasBirthdayPassed) age--;

    // ✅ Si es negativo, devuelve "-"
    if (age < 0) return "-";

    return String(age);
};



export const DateToDMY = (value: string | Date | null | undefined): string => {
    if (!value) return "";

    let d: Date;

    if (value instanceof Date) {
        // Normalizar la fecha a local
        d = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    } else if (typeof value === "string") {
        // Tomar solo la parte YYYY-MM-DD del string
        const [y, m, day] = value.substring(0, 10).split("-").map(Number);

        // Crear fecha en ZONA LOCAL sin timezone
        d = new Date(y, m - 1, day);
    } else {
        return "";
    }

    if (isNaN(d.getTime())) return "";

    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
};

export const isSocioProgramaPivot = (obj: any): boolean => {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.socio_id === "number" &&
        typeof obj.programa_id === "number"
    );
};

export const getDayOfWeek = (input: string): string => {
    const date = new Date(input);
    const day = date.getDay();

    const daysOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    return daysOfWeek[day];
}

// utils/formatMoney.ts
export function formatMoney(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
        return "$0.00";
    }

    return new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export const getFileExtension = (path: string): string => {
    if (!path) return "";
    return path.split(".").pop()?.toLowerCase() ?? "";
};

