import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const elements = document.querySelectorAll('.box');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elementPosition: number = element?.getBoundingClientRect().bottom!;
      const screenPosition = window.innerHeight;

      if (elementPosition < screenPosition) {
        element?.classList.add('animate');
      } else {
        element?.classList.remove('animate');
      }
    }
  }
}
