import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collectionData,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class GameScoreRepositoryService{
  listadoPuntajes!: CollectionReference<DocumentData>;

  listadoPuntajes$!: Observable<any[]>;

  constructor(private _firestore: Firestore) {
    this.listadoPuntajes = collection(this._firestore, 'puntajes');
    this.listadoPuntajes$ = collectionData(this.listadoPuntajes) as Observable<
      any[]
    >;
  }
  create(entity:any): boolean {

    if (this.listadoPuntajes) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoPuntajes);
      const newItem: any = {
        ...entity
      };

      setDoc(docRef, newItem);
      return true;
    }
    return false;
  }

}
