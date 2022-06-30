import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent {

  constructor(private gifsServSideBar:GifsService){}

  get historial(){
    return this.gifsServSideBar.historial;
  }

  buscar(termino:string){
    this.gifsServSideBar.buscarGifs(termino);
  }

}
