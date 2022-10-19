import { FormGroup } from "@angular/forms"

export function markAllAsDirty(form: FormGroup){
    if (!form.valid) {
      for (let i in form.controls) {
        
          form.controls[i].markAsTouched()
          form.controls[i].markAsDirty()

          if(form.controls[i].invalid){
            console.log(form.controls[i])
          }
      }
      return false
    } else {
        return true
    }
  }