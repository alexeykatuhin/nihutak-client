import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ExternalLoginCallbackComponent } from './components/auth/external-login-callback/login-callback.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ExternalLoginCallback', component: ExternalLoginCallbackComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);