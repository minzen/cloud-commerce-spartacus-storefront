import { Action } from '@ngrx/store';
import { ErrorModel, ProductReference } from '../../../occ/occ-models';

export const LOAD_PRODUCT_REFERENCES = '[Product] Load Product References Data';
export const LOAD_PRODUCT_REFERENCES_FAIL =
  '[Product] Load Product References Data Fail';
export const LOAD_PRODUCT_REFERENCES_SUCCESS =
  '[Product] Load Product References Data Success';

export class LoadProductReferences implements Action {
  readonly type = LOAD_PRODUCT_REFERENCES;
  constructor(public payload: string) {}
}

export class LoadProductReferencesFail implements Action {
  readonly type = LOAD_PRODUCT_REFERENCES_FAIL;
  constructor(public payload: ErrorModel) {}
}

export class LoadProductReferencesSuccess implements Action {
  readonly type = LOAD_PRODUCT_REFERENCES_SUCCESS;
  constructor(
    public payload: { productCode: string; list: ProductReference[] }
  ) {}
}

// action types
export type ProductReferencesAction =
  | LoadProductReferences
  | LoadProductReferencesFail
  | LoadProductReferencesSuccess;