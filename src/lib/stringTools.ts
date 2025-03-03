

export function wooStringArray(array: string | string[], uncapitalize = true) {
    if (typeof array === "string") array = array.split(" ")
    
    return uncapitalize ? array.join("|").toLowerCase() : array.join("|")
}

export function quotedString(string:string) {
    return`"${string}"`;
}