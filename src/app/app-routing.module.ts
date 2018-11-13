import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { EventsComponent } from "./content/events/events.component";
import { EventDetailsComponent } from "./content/event-details/event-details.component";
import { EditEventComponent } from "./content/events-details/edit-event/edit-event.component";
import { VolunteersComponent } from "./content/events-details/volunteers/volunteers.component";

//import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoute: Routes = [
    { path:'', redirectTo:'/events', pathMatch:'full'  }, //localhost:4200/
    { path:'events', component: EventsComponent },
    { path:':id/event', component: EventDetailsComponent, children:[
        { path:'edit', component: EditEventComponent },
        { path:'volunteers', component: VolunteersComponent },
        { path:'', redirectTo:'edit', pathMatch:'full' }
    ] },
    // { path:'recipes', component: RecipesComponent, children: [
    //     { path:'', component:NoRecipeSelectedComponent },
    //     { path:'new', component: RecipeEditComponent },
    //     { path:':id', component:RecipeDetailComponent },
    //     { path:':id/edit', component: RecipeEditComponent }
    // ] },
    // { path:'shoppingList', component: ShoppingListComponent },
    // { path: 'users', component: UsersComponent, children:[
    //   { path: ':id/:name', component: UserComponent }
    // ]},
    // { path: 'servers', /*canActivate: [AuthGaurd],*/ canActivateChild: [AuthGaurd], component: ServersComponent, children:[
    //   { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    //   { path: ':id/edit', component: EditServerComponent, canDeactivate:[CanDeactivateGuard] }
    // ] },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: { messege:'Page Not Foun!d' } },
    { path: '**',  redirectTo:'/not-found' }
  ]

@NgModule({
    imports: [
        //RouterModule.forRoot(appRoute, {userHash: true})
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}