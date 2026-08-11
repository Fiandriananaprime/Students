import { Etudiant, EtudiantInput } from "../model/etudiant";

class EtudiantDao {
  private etudiants: Etudiant[] = [];
  private nextId = 1;

  findAll(): Etudiant[] {
    return this.etudiants;
  }

  findById(id: number): Etudiant | undefined {
    return this.etudiants.find((e) => e.id === id);
  }

  save(data: EtudiantInput): Etudiant {
    const etudiant: Etudiant = { id: this.nextId++, ...data };
    this.etudiants.push(etudiant);
    return etudiant;
  }

  update(id: number, etudiant: Etudiant): Etudiant {
    const index = this.etudiants.findIndex((e) => e.id === id);
    this.etudiants[index] = etudiant;
    return etudiant;
  }

  deleteById(id: number): void {
    this.etudiants = this.etudiants.filter((e) => e.id !== id);
  }

  existsById(id: number): boolean {
    return this.etudiants.some((e) => e.id === id);
  }
}

export const etudiantDao = new EtudiantDao();
