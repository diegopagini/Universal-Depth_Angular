import { isPlatformServer } from '@angular/common';
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShellRender]',
})
export class AppShellDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    /**
     * Si estamos desde el servidor (si es SSR) entonces mostramos el componente
     * utilizando el viewContainer y pasandole el templateRef
     */
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      /**
       * Si estamos en el cliente (no SSR) limpiamos la vista.
       * Entonces solo se mostrará el spinner hasta que la aplicación cargue.
       */
      this.viewContainer.clear();
    }
  }
}
