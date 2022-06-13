import { isPlatformServer } from '@angular/common';
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppShellNoRender]',
})
export class AppShellNoDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    /**
     * Si estamos en el cliente (no SSR) limpiamos la vista.
     * Entonces solo se mostrará el spinner hasta que la aplicación cargue.
     */
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      /**
       * Si estamos desde el servidor (si es SSR) entonces NO mostramos el componente
       * utilizando el viewContainer y pasandole el templateRef
       */
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
