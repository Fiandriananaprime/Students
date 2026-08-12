import { Request, Response, NextFunction } from "express";
import { StudentsService } from "../service/StudentService";

class StudentController {
  findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(StudentsService.findAll());
      
    } catch (err) {
      next(err);
    }
  };

  findById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(StudentsService.findById(id));
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
