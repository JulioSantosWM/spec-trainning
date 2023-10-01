import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class GlobalStateService {
  private selectedUser = new BehaviorSubject<User | null>(null);
  public selectedUser$ = this.selectedUser.asObservable();

  public updateSelectedUser(newUser: User | null): void {
    this.selectedUser.next(newUser);
  }
}