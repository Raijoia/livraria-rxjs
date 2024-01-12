import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy{
  listaLivros: [];
  campoBusca: string = '';
  subscription: Subscription;

  constructor(private service: LivroService) {}

  buscarLivro() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
      complete: () => console.log('Requisição completa'),
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
