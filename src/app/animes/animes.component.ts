import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { DELETE_ANIME } from '../graphql/graphql.mutate';
import { GET_BY_FILTER } from '../graphql/graphql.queries';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

  animes: any[] = [];
  animeDetail: any;
  error: any;
  pageInfo: any;
  itemsPerPage: number = 5;
  currentPage: number = 1
  filterByName: any = null;

  animeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes() {
    this.apollo.watchQuery({
      query: DELETE_ANIME,
      variables: this.getVariables(),

    }).valueChanges.subscribe(({ data, error }: any) => {
      this.animes = data.Page.media;
      this.animeDetail = this.animes[0];
      this.pageInfo = data.Page.pageInfo;
      this.error = error;
    });
  }

  getVariables() {
    if (this.filterByName === '' || this.filterByName ===  null) {
      return  {
        page: this.currentPage,
        perPage: this.itemsPerPage,
      }
    } else {
      return {
        page: this.currentPage,
        perPage: this.itemsPerPage,
        search: this.filterByName
      }
    }
  }

  setPagination(action: string) {
    
    if(action === 'NEXT') {
      if( this.currentPage < this.pageInfo.total) {
        this.currentPage++;
      }
    } else if (action === 'PREV') {
      if( this.currentPage > 1) {
        this.currentPage--;
      }
    } else if (action === 'FIRST'){
      this.currentPage = 1;
    } else if (action === 'LAST') {
      this.currentPage = this.pageInfo.lastPage
    }

    this.getAnimes();

  }

  setTotalPerPage(event: any) {
    this.itemsPerPage = event.target.value;
    this.setPagination('');
  }


  setFilterByName(event: any) {
    
    this.filterByName = event.target.value;
    this.setPagination('FIRST');
  }


  showAnimeDetail(animeDetail: any) {
    this.animeDetail = animeDetail;
  }

}
