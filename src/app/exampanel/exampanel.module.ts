import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExampanelscreenComponent } from "./component/exampanelscreen/exampanelscreen.component";
import { RouterModule } from "@angular/router";
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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { BlockCopyPasteDirective } from "./directives/block-copy-paste.directive";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CalculatorComponent } from "./component/calculator/calculator.component";
import { authInterceptorProviders } from "./interceptor/AuthInterceptor";
import { CountdownModule, CountdownGlobalConfig } from "ngx-countdown";
import { TimerComponentComponent } from "./component/timer-component/timer-component.component";
import { DialogComponent } from "./component/exampanelscreen/dialog/dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { InstructionDialogComponent } from "./component/exampanelscreen/instruction-dialog/instruction-dialog.component";
import { ExamInstructionsComponent } from "./component/exam-instructions/exam-instructions.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { LoaderExampanel } from './services/loaderexampanel';
import { LoaderInterceptorExam } from './interceptor/LoaderExamInterceptor';
import { LoaderComponent } from './component/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionsService } from './services/questions.service';


@NgModule({
  declarations: [
    ExampanelscreenComponent,
    LoaderComponent,
    BlockCopyPasteDirective,
    CalculatorComponent,
    TimerComponentComponent,
    DialogComponent,
    InstructionDialogComponent,
    ExamInstructionsComponent,
  ],
  imports: [
    CountdownModule,
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
      { path: "exam/:test_id", component: ExampanelscreenComponent },
      {
        path: "",
        component: ExamInstructionsComponent,
      },
    ]),
  ],
  providers: [ QuestionsService,LoaderExampanel,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorExam,
      multi: true,
    },authInterceptorProviders, { provide: CountdownGlobalConfig }, ],
  entryComponents: [DialogComponent, InstructionDialogComponent],
})
export class ExampanelModule {
 
}
