import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatPseudoCheckboxModule } from "@angular/material/core";

import { GoogleChartsModule } from "angular-google-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "./footer/footer.component";
import { CoursesComponent } from "./courses/courses.component";
import { RouterModule } from "@angular/router";
import { CoursesDetailComponent } from "./courses/courses-detail/courses-detail.component";
import { ExamDetailsComponent } from "./exam-details/exam-details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AboutComponent } from "./about/about.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule } from "@angular/common/http";
import { ValidateEqualModule } from "ng-validate-equal";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { authInterceptorProviders } from "./exampanel/interceptor/AuthInterceptor";
import { CountdownModule } from "ngx-countdown";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    CoursesComponent,
    CoursesDetailComponent,
    ExamDetailsComponent,
    AboutComponent,
  ],
  imports: [
    AuthModule.forRoot(),
    ValidateEqualModule,
    Ng4LoadingSpinnerModule,
    BrowserModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    FormsModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatPseudoCheckboxModule,
    MatPseudoCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,

    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
