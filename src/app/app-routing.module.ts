import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: 'quick-view', component: SummaryComponent },
  { path: 'explore', component: ExploreComponent },
  { path: '', redirectTo: '/quick-view', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
