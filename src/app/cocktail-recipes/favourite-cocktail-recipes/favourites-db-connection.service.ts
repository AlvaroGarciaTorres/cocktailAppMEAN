import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cocktail } from '../cocktail-list/cocktail-item/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesDbConnectionService {

  constructor(private http: HttpClient) { }

  getFavouritesListFromDb(id: String){
    return this.http.get(`${environment.API_URL}favourites/${id}`);
  }

  updateFavouritesListById(id: String, cocktailId: String){
    return this.http.put(`${environment.API_URL}favourites/${id}/${cocktailId}`, cocktailId);
  }

  updateFavouritesList(userId: String, favouritesList: Cocktail[]){
    let favouritesListIds: String[] = favouritesList.map(cocktail => cocktail._id);
    return this.http.put(`${environment.API_URL}favourites/${userId}`, { favourites: favouritesListIds });
  }
}
