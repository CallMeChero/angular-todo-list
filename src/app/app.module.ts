import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/in-memory-data.service';
import { ModalConfirmationComponent } from './shared/components/modal-confirmation/modal-confirmation.component';
import { ModalConfirmExitComponent } from './shared/components/modal-confirm-exit/modal-confirm-exit.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { delay: 1500 } 
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    // croatian ngb date adapter
    { provide: NgbDateNativeAdapter, useClass: NgbDateNativeAdapter }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  entryComponents: [
    //shared throughout app
    ModalConfirmationComponent,
    ModalConfirmExitComponent
  ]
})
export class AppModule { }
