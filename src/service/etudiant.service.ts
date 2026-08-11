import { etudiantDao } from "../dao/etudiant.dao";
import { Etudiant, EtudiantInput, EtudiantPartialInput } from "../model/etudiant";
import { ResourceNotFoundError, ValidationError } from "../exception/errors";


class EtudiantService {
  findAll(): Etudiant[] {
    return etudiantDao.findAll();
  }

  findById(id: number): Etudiant {
    const etudiant = etudiantDao.findById(id);
    if (!etudiant) {
      throw new ResourceNotFoundError(`Étudiant introuvable avec id=${id}`);
    }
    return etudiant;
  }

  create(data: EtudiantInput): Etudiant {
    this.validate(data);
    return etudiantDao.save(data);
  }

  update(id: number, data: EtudiantInput): Etudiant {
    this.validate(data);
    this.findById(id); 
    return etudiantDao.update(id, { id, ...data });
  }

  partialUpdate(id: number, data: EtudiantPartialInput): Etudiant {
    const existant = this.findById(id);
    const misAJour: Etudiant = {
      ...existant,
      ...(data.nom !== undefined && { nom: data.nom }),
      ...(data.prenom !== undefined && { prenom: data.prenom }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.filiere !== undefined && { filiere: data.filiere }),
    };
    return etudiantDao.update(id, misAJour);
  }

  delete(id: number): void {
    this.findById(id); 
    etudiantDao.deleteById(id);
  }

  private validate(data: Partial<EtudiantInput>): void {
    const erreurs: string[] = [];
    if (!data.nom?.trim()) erreurs.push("nom : obligatoire");
    if (!data.prenom?.trim()) erreurs.push("prenom : obligatoire");
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      erreurs.push("email : doit être une adresse valide");
    }
    if (erreurs.length > 0) {
      throw new ValidationError(erreurs);
    }
  }
}

export const etudiantService = new EtudiantService();
