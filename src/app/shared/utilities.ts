import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

export function openSnackBar(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {panelClass: ['mat-toolbar']});
}

export function getErrorMessage(formGroup: FormGroup, formControlName: string, errorOptions: { type:string, message: string}[]): string{
    const form: FormControl = (formGroup.get(formControlName) as FormControl);
    for(let i = 0; i< errorOptions.length; i++){
        if(form.hasError(errorOptions[i].type)) return errorOptions[i].message;
    }
    return "Invalid";
}