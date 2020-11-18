import { NgModule } from "@angular/core";
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventsResolver } from './resolvers/events-resolver.service';

const routes: Route[] = [
  { path: '', component: EventsComponent, resolve: { events: EventsResolver } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
