import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/login/auth.guard';
import { SearchResultsComponent } from './components/main/search-results/search-results.component';
import { ManageAgentBuilderComponent } from './components/agent-builder/manage-agent-builder/manage-agent-builder.component';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchResultsComponent, canActivate:[AuthGuard]},
  // TODO: Add new AddNewAgentComponent
  {path:'manage-config', component: ManageAgentBuilderComponent, canActivate:[AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }