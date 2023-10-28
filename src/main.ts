import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '@Environment';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { MultiTranslateLoader } from './app/shared/loaders/multi-translate.loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: MultiTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    provideEffects([]),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err: unknown) => console.error(err));
