import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionbankpanelscreenComponent } from './component/questionbankpanelscreen/questionbankpanelscreen.component';
import { RouterModule } from '@angular/router';
import { GetquestionforquesbankService } from './services/getquestionforquesbank.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSliderModule } from "@angular/material/slider";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderExampanel } from '../exampanel/services/loaderexampanel';
import { LoaderInterceptorExam } from '../exampanel/interceptor/LoaderExamInterceptor';
import { authInterceptorProviders } from '../userdashboard/interceptors/AuthInterceptor';


@NgModule({
  declarations: [QuestionbankpanelscreenComponent],
  imports: [
    CommonModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: "qb/:test_id", component: QuestionbankpanelscreenComponent },
    ]),
  ],
  providers: [ GetquestionforquesbankService,LoaderExampanel,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorExam,
      multi: true,
    },authInterceptorProviders]
})
export class QuestionbankpanelModule { }
