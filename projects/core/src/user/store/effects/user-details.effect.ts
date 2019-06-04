import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import * as fromUserDetailsAction from '../actions/user-details.action';
import { User } from '../../../model/misc.model';
import { UserConnector } from '../../connectors/user/user.connector';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<
    fromUserDetailsAction.UserDetailsAction
  > = this.actions$.pipe(
    ofType(fromUserDetailsAction.LOAD_USER_DETAILS),
    map((action: fromUserDetailsAction.LoadUserDetails) => action.payload),
    mergeMap(userId => {
      return this.userConnector.get(userId).pipe(
        map((user: User) => {
          return new fromUserDetailsAction.LoadUserDetailsSuccess(user);
        }),
        catchError(error =>
          of(new fromUserDetailsAction.LoadUserDetailsFail(error))
        )
      );
    })
  );

  @Effect()
  updateUserDetails$: Observable<
    | fromUserDetailsAction.UpdateUserDetailsSuccess
    | fromUserDetailsAction.UpdateUserDetailsFail
  > = this.actions$.pipe(
    ofType(fromUserDetailsAction.UPDATE_USER_DETAILS),
    map((action: fromUserDetailsAction.UpdateUserDetails) => action.payload),
    concatMap(payload =>
      this.userConnector.update(payload.username, payload.userDetails).pipe(
        map(
          _ =>
            new fromUserDetailsAction.UpdateUserDetailsSuccess(
              payload.userDetails
            )
        ),
        catchError(error =>
          of(new fromUserDetailsAction.UpdateUserDetailsFail(error))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
