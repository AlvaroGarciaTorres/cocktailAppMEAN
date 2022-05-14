import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import swal from 'sweetalert2';

export function openSnackBar(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {panelClass: ['mat-toolbar']});
    setTimeout(() => {
        _snackBar.dismiss();
    },3000);
}

export function getErrorMessage(formGroup: FormGroup, formControlName: string, errorOptions: { type:string, message: string}[]): string{
    const form: FormControl = (formGroup.get(formControlName) as FormControl);
    for(let i = 0; i< errorOptions.length; i++){
        if(form.hasError(errorOptions[i].type)) return errorOptions[i].message;
    }
    return "Invalid";
}

export function deleteAlert(message: string, cbk: Function){
    swal.fire({
        title: 'DELETE',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'DELETE',
        cancelButtonText: 'CANCEL'
    }).then(
        (result) => {
        if(result.isConfirmed) {
            cbk();
        }
        }
    )
}
