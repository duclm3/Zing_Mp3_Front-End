import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRegiserService {

  constructor(@Inject('memberData') private memberData: any) {
    console.log(memberData);
  }
}
