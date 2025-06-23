import { Routes } from '@angular/router';
import { HomeComponent } from "./payment/pages/paymentMethod/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { ReceiptManagementComponent } from "./payment/pages/receipt-management/receipt-management.component";

export const routes: Routes = [
  { path: 'Payment', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'payment/receipts', component: ReceiptManagementComponent },
  { path: '', redirectTo: 'Payment', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
