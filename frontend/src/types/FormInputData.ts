export type FormInputData = {
    label: string,
    type: string,
    name: string,
    placeholder?: string,
    text?: string,
    valid?: string,
    invalid?: string,
    isRequired: boolean,
    regexPattern? : string
}