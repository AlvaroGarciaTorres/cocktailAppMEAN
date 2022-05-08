import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouritesDbConnectionService {

  constructor(private http: HttpClient) { }

  fetchFavouritesList(id: String){
    return this.http.get(`${environment.API_URL}favourites/${id}`);
  }

  updateFavouritesList(id: String, cocktailId: String){
    return this.http.put(`${environment.API_URL}favourites/${id}/${cocktailId}`, cocktailId);
  }
}
