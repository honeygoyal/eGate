import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./component/signup/signup.component";

import { RouterModule } from "@angular/router";
import { FileUploadModule } from "ng2-file-upload";
import { ProgressComponent } from "./component/signup/progress/progress.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { LoginComponent } from "./component/login/login.component";
import { AuthService } from "./service/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ValidateEqualModule } from "ng-validate-equal";
import { LoaderService } from "./service/loader.service";
import { LoaderInterceptor } from "./interceptors/LoaderInterceptor";
import { EffectsModule } from "@ngrx/effects";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./reducers";
import { AuthGuard } from "./auth.guard";
import { AuthEffects } from "./auth.effects";
import { MatFormFieldModule } from "@angular/material/form-field";

import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [SignupComponent, LoginComponent, ProgressComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    SharedModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ValidateEqualModule,
    RouterModule.forChild([
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "signup",
        component: SignupComponent,
      },
    ]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    };
  }
}
