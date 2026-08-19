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

  create = async  (req: Request, res: Response, next: NextFunction) => {
    try {
      const cree = await StudentsService.create(req.body);
      res.status(201).json(cree);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const student = await StudentsService.update(id, req.body)
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };

  partialUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const student = StudentsService.partialUpdate(id, req.body);
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      StudentsService.delete(id);
      await res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export const Controller = new StudentController();
