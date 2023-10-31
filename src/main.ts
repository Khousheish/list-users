import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { environment } from '@Environment';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { MultiTranslateLoader } from './app/shared/loaders/multi-translate.loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: MultiTranslateLoader,
          deps: [HttpClient],
        },
      }),
      ToastModule,
    ]),
    MessageService,
    provideEffects([]),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err: unknown) => console.error(err));
