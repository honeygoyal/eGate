import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BodyComponent } from "./body/body.component";
import { CoursesComponent } from "./courses/courses.component";
import { CoursesDetailComponent } from "./courses/courses-detail/courses-detail.component";
import { ExamDetailsComponent } from "./exam-details/exam-details.component";
import { AboutComponent } from "./about/about.component";
import { AuthGuard } from "./auth/auth.guard";
import { DownloadComponent } from './download/download.component';
import { CarrersComponent } from './carrers/carrers.component';
const routes: Routes = [
  { path: "", component: BodyComponent },
  { path: "home", component: BodyComponent },
  { path: "courses", component: CoursesComponent },
  { path: "courses/:subject/:content", component: CoursesDetailComponent },
  { path: "examdetails/:subject", component: ExamDetailsComponent },
  { path: "about", component: AboutComponent },
  { path: "carrers", component: CarrersComponent },
  {path:"download/:exam",component:DownloadComponent},
  {
    path: "userdashboard",
    loadChildren: () =>
      import("./userdashboard/userdashboard.module").then(
        (m) => m.UserdashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "exampanel",
    loadChildren: () =>
      import("./exampanel/exampanel.module").then((m) => m.ExampanelModule),
    canActivate: [AuthGuard],
  },
  { path: "**", component: BodyComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
