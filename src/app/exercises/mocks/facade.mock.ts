import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of } from "rxjs";
import { BASE_URL } from "../constants/base-url";
import { UserDto } from "../models/user.dto";
import { CreditCardDto } from "../models/credit-card.dto";

@Injectable()
export class UsersOpenApiService {
  private readonly baseUrl = BASE_URL + '/users';

  constructor(private readonly httpClient: HttpClient) {} 

  public getUser(uid: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(this.baseUrl);
  }

  public getUsers(): Observable<UserDto[]> {
    const amountOfUsers = Math.ceil(Math.random() + 16);
    return this.httpClient.get<UserDto[]>(this.baseUrl + '?size=' + amountOfUsers);
  }

  public postUser(user: UserDto): Observable<void> {
    return EMPTY;
  }
}

@Injectable()
export class CreditCardOpenApiService {
  private readonly baseUrl = BASE_URL + '/credit_cards';

  constructor(private readonly httpClient: HttpClient) {} 

  public getPrimaryCreditCard(uid: string): Observable<CreditCardDto> {
    return this.httpClient.get<CreditCardDto>(this.baseUrl)
  }

  public getAvailableCreditCards(uid: string): Observable<CreditCardDto[]> {
    const amountOfCreditCards = Math.ceil(Math.random() + 5);
    return this.httpClient.get<CreditCardDto[]>(this.baseUrl + '?size=' + amountOfCreditCards);
  }
}

@Injectable()
export class TemporaryStoreService {

  public async storeInformation(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getStoredInformation<T>(key: string): Observable<T | null> {
    return of(JSON.parse(localStorage.getItem(key) || 'false') as T)
  }
}