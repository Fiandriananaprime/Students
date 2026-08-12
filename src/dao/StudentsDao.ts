import { Students, StudentsDTO } from "../model/Students";

class StudentsRepository {
  private Studentss: Students[] = [];
  private nextId = 1;

  findAll(): Students[] {
    return this.Studentss;
  }

  findById(id: number): Students | undefined {
    return this.Studentss.find((e) => e.id === id);
  }

  save(data: StudentsDTO): Students {
    const Students: Students = { id: this.nextId++, ...data };
    this.Studentss.push(Students);
    return Students;
  }

  update(id: number, Students: Students): Students {
    const index = this.Studentss.findIndex((e) => e.id === id);
    this.Studentss[index] = Students;
    return Students;
  }

  deleteById(id: number): void {
    this.Studentss = this.Studentss.filter((e) => e.id !== id);
  }

  existsById(id: number): boolean {
    return this.Studentss.some((e) => e.id === id);
  }
}

export const StudentsRepo = new StudentsRepository();
