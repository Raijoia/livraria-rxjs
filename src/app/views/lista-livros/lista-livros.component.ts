import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy{
  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) {}

  buscarLivro() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (response) => {
       this.listaLivros = this.livrosResultadosParaLivros(response)
      },
      error: (error) => console.error(error),
      complete: () => console.log('Requisição completa'),
    });
  }

  livrosResultadosParaLivros(items: Item[]):  LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
