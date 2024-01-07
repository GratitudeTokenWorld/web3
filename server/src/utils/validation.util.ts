export class ValidationUtil
{
    public static minMax(value: string | number | undefined, minLength?: number, maxLength?: number): boolean
    {
        const stringValue = typeof value === 'string' ? value.trim() : value?.toString().trim();

        if (!stringValue)
            return true;

        if (minLength !== undefined && stringValue.length < minLength)
            return true;

        if (maxLength !== undefined && stringValue.length > maxLength)
            return true;

        return false;
    }

    public static isEmpty(value: any): boolean
    {
        if (value === undefined || value === null)
            return true;

        if (typeof value === 'string' && value.trim() === '')
            return true;

        if (Array.isArray(value) && value.length === 0)
            return true;

        if (typeof value === 'object' && Object.keys(value).length === 0)
            return true;

        return false;
    }

    public static isBoolean(value: any): boolean
    {
        if (typeof value === 'boolean')
            return false;

        if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false'))
            return false;

        return true;
    }

    public static isDate(value: any): boolean
    {
        return isNaN(Date.parse(value));
    }

    public static isEmail(value: string | undefined): boolean
    {
        if (!value)
            return true;

        const emailRegex = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return !emailRegex.test(value);
    }

    public static isPhoneNumber(value: string | undefined): boolean
    {
        if (!value)
            return true;

        const phoneNumberRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/;
        return !phoneNumberRegex.test(value);
    }

    public static isNumber(value: any): boolean
    {
        if (value === undefined || value === null || value === '')
            return false;

        if (typeof value === 'string' && !isNaN(Number(value)))
            return false;

        const numberValue = Number(value);
        return isNaN(numberValue);
    }

    public static isValidRGBA(value: string | undefined): boolean
    {
        if (!value)
            return true;

        const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d{1,2})\)$/;
        return !rgbaRegex.test(value);
    }

    public static isInEnum(value: string | undefined, enumType: any): boolean
    {
        if (!value)
            return true;

        const enumValues = Object.values(enumType);
        return !enumValues.includes(value);
    }
}
