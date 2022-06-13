import { FormControl, FormGroup } from "@angular/forms";
import swal from 'sweetalert2';

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
