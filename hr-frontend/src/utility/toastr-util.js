import * as toastr from "toastr";

export function showMessage(level, message) {
    toastr[level](message);
}

export function showErrorMessage(message) {
    toastr.error(message);
}

export function showWarningMessage(message) {
    toastr.warning(message);
}

export function showSuccessMessage(message) {
    toastr.success(message);
}

export function showInfoMessage(message) {
    toastr.info(message);
}

export function initializeToastr(opts) {
    for (let o in opts) {
        toastr.options[o] = opts[o];
    }
}