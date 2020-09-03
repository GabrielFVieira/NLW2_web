export function cellphone(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 13;
    e.currentTarget.value = maskAsCellphone(e.currentTarget.value);
    return e;
}

export function maskAsCellphone(text: string | undefined) {
    if(!text) {
        return "+__ (__) _____-____";
    }

    if(text.length > 13) {
        text.slice(0, 13);
    }
    text = text.replace(/\D/g, "");
    text = text.replace(/^(\d{2})(\d{2})(\d{5})(\d)/, "+$1 ($2) $3-$4");
    return text;
}