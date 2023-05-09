import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Data/common-repository.interface';
import { Usuario } from '../class/Usuario';
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
export class UsuarioRepositoryService implements Repository<Usuario> {
  listadoUsuarios!: CollectionReference<DocumentData>;

  listadoUsuarios$!: Observable<Usuario[]>;

  constructor(private _firestore: Firestore) {
    this.listadoUsuarios = collection(this._firestore, 'usuarios');
    this.listadoUsuarios$ = collectionData(this.listadoUsuarios) as Observable<
      Usuario[]
    >;
  }
  getAll(): Observable<Usuario[]> {
    return this.listadoUsuarios$;
  }

  create(entity: Usuario, uid:string): boolean {
    if (this.listadoUsuarios) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del actor.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoUsuarios);
      const newItem: any = {
        ...entity,
        idUsuarioDocRef: docRef.id,
        idUsuarioUid: uid
      };

      setDoc(docRef, newItem);
      return true;
    }
    return false;
  }
  update(id: number): Observable<Usuario> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<Usuario> {
    throw new Error('Method not implemented.');
  }
}
