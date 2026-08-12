import { StudentsRepo } from "../dao/StudentsDao";
import { Students, StudentsDTO, StudentsDTOPartial } from "../model/Students";
import { ResourceNotFoundError, ValidationError } from "../exception/errors";


class StudentsServices {
  findAll(): Students[] {
    return StudentsRepo.findAll();
  }

  findById(id: number): Students {
    const Students = StudentsRepo.findById(id);
    if (!Students) {
      throw new ResourceNotFoundError(`Cannot find students: id=${id}`);
    }
    return Students;
  }

  create(data: StudentsDTO): Students {
    this.validate(data);
    return StudentsRepo.save(data);
  }

  update(id: number, data: StudentsDTO): Students {
    this.validate(data);
    this.findById(id); 
    return StudentsRepo.update(id, { id, ...data });
  }

  partialUpdate(id: number, data: StudentsDTOPartial): Students {
    const existant = this.findById(id);
    const update: Students = {
      ...existant,
      ...(data.firstName !== undefined && { nom: data.firstName }),
      ...(data.lastName !== undefined && { prenom: data.lastName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.filiere !== undefined && { filiere: data.filiere }),
    };
    return StudentsRepo.update(id, update);
  }

  delete(id: number): void {
    this.findById(id); 
    StudentsRepo.deleteById(id);
  }

  private validate(data: Partial<StudentsDTO>): void {
    const error: string[] = [];
    if (!data.firstName?.trim()) error.push("firstName : required");
    if (!data.lastName?.trim()) error.push("lastName : required");
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      error.push("");
    }
    if (error.length > 0) {
      throw new ValidationError(error);
    }
  }
}

export const StudentsService = new StudentsServices();
