export const stripFloatInput = (value: string): string => {
    return value.replace(/[^0-9|.]/g, "");
}

export const isEnter = (event: React.KeyboardEvent<HTMLInputElement>): boolean => {
    return event.key === "Enter";
}