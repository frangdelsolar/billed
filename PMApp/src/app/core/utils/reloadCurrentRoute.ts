import { Router } from "@angular/router";

export function reloadCurrentRoute(router: Router,) {
    let currentUrl = router.url;
    router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        router.navigate([currentUrl]);
    });
  }