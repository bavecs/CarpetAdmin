

export function wooStringArray(array: string | string[], uncapitalize = true) {
    if (typeof array === "string") array = array.split(" ")
    
    return uncapitalize ? array.join("|") : array.join("|")
}

export function quotedString(string:string) {
    string = removeLineBreaks(string)
    return `"${string}"`;
}

export function removeLineBreaks(string:string) {
    return string.replace(/(\r\n|\n|\r)/gm, "");
}