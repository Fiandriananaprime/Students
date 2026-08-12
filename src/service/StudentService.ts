import { StudentsRepo } from "../dao/StudentsDao";
import { Students, StudentsDTO, StudentsDTOPartial } from "../model/Students";
import { ResourceNotFoundError, ValidationError } from "../exception/errors";


 class StudentsServices {
  async findAll():Promise<Students[]> {
    return await StudentsRepo.findAll();
  }

  async findById(id: number): Promise<Students> {
    const Students =await StudentsRepo.findById(id);
    if (!Students) {
      throw new ResourceNotFoundError(`Cannot find students: id=${id}`);
    }
    return  Students;
  }

  async create(data: StudentsDTO): Promise<Students> {
    this.validate(data);
    return StudentsRepo.save(data);
  }

  async update(id: number, data: StudentsDTO): Promise<Students> {
    this.validate(data);
    await this.findById(id); 
    const updatedStudents:Students = {id, ...data}
    const result = await StudentsRepo.update(id, updatedStudents)
    if (!result) {
            throw new ResourceNotFoundError(
                `Cannot find student: id=${id}`
            );
        }

        return result;
  }

  async partialUpdate(id: number, data: StudentsDTOPartial): Promise<Students> {
    const result = await StudentsRepo.partialUpdate(
            id,
            data
        );

        if (!result) {
            throw new ResourceNotFoundError(
                `Cannot find student: id=${id}`
            );
        }

        return result;
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); 
    await StudentsRepo.deleteById(id);
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
