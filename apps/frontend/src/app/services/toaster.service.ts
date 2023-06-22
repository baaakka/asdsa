import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ToasterPosition } from "../core/types/toaster-position";

@Injectable({
    providedIn: 'root',
  })

export class CustomToasterService {
    constructor(private toasterService: ToastrService) {
    }

    showErrorToaster(position: ToasterPosition, message: string) {
        this.toasterService.error(message, '', {
            positionClass: position,
        })
    }
}