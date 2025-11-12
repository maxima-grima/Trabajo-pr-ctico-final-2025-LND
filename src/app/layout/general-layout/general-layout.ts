import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-general-layout',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss'
})
export class GeneralLayout {

}
