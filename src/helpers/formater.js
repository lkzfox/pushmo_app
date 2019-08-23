function mask(pattern, newValue, currentValue) {
    let masked = pattern;
    let specialChars = pattern.replace(/#/g, '').split('');
    let valueToFormat = newValue;
    if (currentValue) {
        if (specialChars.includes(currentValue[currentValue.length - 1]) && newValue.length < currentValue.length){
            currentValue = currentValue.substring(0, currentValue.length - 2);
            valueToFormat = currentValue;
        }     
    }

    let cleanValue = valueToFormat.replace(/\.|,|-|\//g, '');
    for(i = 0; i < cleanValue.length; i++) {
        masked = masked.replace(/#/, cleanValue[i]);
    }
    masked = masked.substring(0, masked.indexOf("#") > -1 ? masked.indexOf("#") : 99 );
    return masked;
}
const resources = {
    formatCPF: (newValue, currentValue = null) => {
        return mask("###.###.###-##", newValue, currentValue);
    },
    formatDate: (newValue, currentValue) => {
        return mask("##/##/####", newValue, currentValue);
    },
    dateDBReal: (date) => {
        return date.split('-').reverse().join('/');
    },
    dateRealDB: (date) => {
        return date.split('/').reverse().join('-');
    },
    clearString: (string) => {
        return string.replace(/\.|-|\//);
    },
    mask
}

export default resources;