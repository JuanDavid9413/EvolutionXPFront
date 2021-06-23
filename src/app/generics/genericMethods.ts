import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class GenericMethods {

    MessageSuccess( title: string, messageText: string): void {
        Swal.fire({
            icon: 'success',
            title: title,
            text: messageText
        });
    }

    MessageError(title: string, messageText: string): void {
        Swal.fire({
            icon: 'error',
            title: title,
            text: messageText
        });
    }

    MessageWarning(title: string, messageText: string): void {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: messageText
        });
    }

    MessageWarningOption(swalButtons: any) {
        return swalButtons.fire({
            icon: 'warning',
            title: '¿Esta seguro?',
            text: 'Quiere eliminar el registro',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true
          });
    }

    MessageConfigOption() {
        return Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ml-2',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
    }


}