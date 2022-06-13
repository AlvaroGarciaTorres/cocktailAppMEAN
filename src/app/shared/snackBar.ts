import { MatSnackBar } from "@angular/material/snack-bar";

export const OK_CONFIRMATION_MESSAGE = "OK";
export const FAVOURITES_CONFIRMATION_MESSAGE = "Cocktail added to favourites";
export const ADDED_TO_SHOPPING_LIST_MESSAGE = "Added to your shopping list";
export const LOG_IN_FIRST_MESSAGE = "You need to log in first";

export function openSnackBar(_snackBar: MatSnackBar, message: string, action: string) {
    _snackBar.open(message, action, {panelClass: ['mat-toolbar']});
    setTimeout(() => {
        _snackBar.dismiss();
    },3000);
}