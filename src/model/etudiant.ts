export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  filiere?: string;
}


export type EtudiantInput = Omit<Etudiant, "id">;

export type EtudiantPartialInput = Partial<EtudiantInput>;
