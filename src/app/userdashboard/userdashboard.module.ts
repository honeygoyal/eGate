import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { UserprofileComponent } from "./component/userprofile/userprofile.component";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./component/profile/profile.component";
import { MatCardModule } from "@angular/material/card";
import { TestseriesComponent } from "./component/testseries/testseries.component";
import { DemoseriesComponent } from "./component/demoseries/demoseries.component";
import { StoreModule } from "@ngrx/store";
import * as fromUserdashboard from "./reducers";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "./component/profile/dialog/dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSliderModule } from "@angular/material/slider";
import { HttpClientModule } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BuypackageComponent } from "./component/buypackage/buypackage.component";
import { authInterceptorProviders } from "./interceptors/AuthInterceptor";
import { TestseriesService } from "./service/testseries.service";
import { ReportComponent } from "./component/report/report.component";
import { AdminPanelComponent } from "./component/admin-panel/admin-panel.component";

@NgModule({
  declarations: [
    UserprofileComponent,
    ProfileComponent,
    TestseriesComponent,
    DemoseriesComponent,
    DialogComponent,
    BuypackageComponent,
    ReportComponent,
    AdminPanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
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
        component: UserprofileComponent,
        children: [
          { path: "profile", component: ProfileComponent },
          { path: "testseries/:subject", component: TestseriesComponent },
          { path: "report", component: ReportComponent },
          { path: "demoseries", component: DemoseriesComponent },
          { path: "buypackage", component: BuypackageComponent },
          { path: "adminPanel", component: AdminPanelComponent },
        ],
      },
    ]),
    StoreModule.forFeature(
      fromUserdashboard.userdashboardFeatureKey,
      fromUserdashboard.reducers
    ),
  ],
  providers: [authInterceptorProviders, TestseriesService, DatePipe],
  entryComponents: [DialogComponent],
})
export class UserdashboardModule {}
