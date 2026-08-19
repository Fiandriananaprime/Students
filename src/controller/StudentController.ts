import { Request, Response, NextFunction } from "express";
import { StudentsService } from "../service/StudentService";

class StudentController {
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await StudentsService.findAll();

        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
};

  findById =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const student = await StudentsService.findById(id)

      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };

  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const cree = StudentsService.create(req.body);
      res.status(201).json(cree);
    } catch (err) {
      next(err);
    }
  };

  update = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(StudentsService.update(id, req.body));
    } catch (err) {
      next(err);
    }
  };

  partialUpdate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(StudentsService.partialUpdate(id, req.body));
    } catch (err) {
      next(err);
    }
  };

  delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      StudentsService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export const Controller = new StudentController();
