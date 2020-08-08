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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSliderModule } from "@angular/material/slider";
import { HttpClientModule } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { BlockCopyPasteDirective } from "./directives/block-copy-paste.directive";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CalculatorComponent } from "./component/calculator/calculator.component";
import { authInterceptorProviders } from "./interceptor/AuthInterceptor";
import { CountdownModule, CountdownGlobalConfig } from "ngx-countdown";
import { TimerComponentComponent } from "./component/timer-component/timer-component.component";
// function countdownConfigFactory(): CountdownGlobalConfig {
//   return { locale: 'mm:ss' };
// }

@NgModule({
  declarations: [
    ExampanelscreenComponent,
    BlockCopyPasteDirective,
    CalculatorComponent,
    TimerComponentComponent,
  ],
  imports: [
    CountdownModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
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

    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: "",
        component: ExampanelscreenComponent,
      },
    ]),
  ],
  providers: [authInterceptorProviders, { provide: CountdownGlobalConfig }],
})
export class ExampanelModule {}
