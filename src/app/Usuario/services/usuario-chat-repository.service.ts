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
import { Mensaje } from '../interface/mensaje';


@Injectable({
  providedIn: 'root',
})
export class UsuarioChatRepositoryService implements Repository<Mensaje> {
  listadoMensajes!: CollectionReference<DocumentData>;

  listadoMensajes$!: Observable<Mensaje[]>;

  constructor(private _firestore: Firestore) {
    this.listadoMensajes = collection(this._firestore, 'mensajes');
    this.listadoMensajes$ = collectionData(this.listadoMensajes) as Observable<
    Mensaje[]
    >;
  }
  getAll(): Observable<Mensaje[]> {
    return this.listadoMensajes$;
  }

  create(entity: Mensaje, uid:string): boolean {
    if (this.listadoMensajes) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoMensajes);
      const newItem: any = {
        ...entity,
        idMensajeDocRef: docRef.id
      };

      setDoc(docRef, newItem);
      return true;
    }
    return false;
  }
  update(id: number): Observable<Mensaje> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<Mensaje> {
    throw new Error('Method not implemented.');
  }
}
