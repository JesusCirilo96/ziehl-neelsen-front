import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';
/*
"node_modules/popper.js/dist/popper.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
*/
import 'bootstrap';
import 'popper.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
