export interface Students {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  filiere?: string;
}


export type StudentsDTO = Omit<Students, "id">;

export type StudentsDTOPartial = Partial<StudentsDTO>;
