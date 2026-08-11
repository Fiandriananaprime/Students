import { Request, Response, NextFunction } from "express";
import { etudiantService } from "../service/etudiant.service";

class EtudiantController {
  findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(etudiantService.findAll());
    } catch (err) {
      next(err);
    }
  };

  findById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(etudiantService.findById(id));
    } catch (err) {
      next(err);
    }
  };

  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const cree = etudiantService.create(req.body);
      res.status(201).json(cree);
    } catch (err) {
      next(err);
    }
  };

  update = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(etudiantService.update(id, req.body));
    } catch (err) {
      next(err);
    }
  };

  partialUpdate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      res.status(200).json(etudiantService.partialUpdate(id, req.body));
    } catch (err) {
      next(err);
    }
  };

  delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      etudiantService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export const etudiantController = new EtudiantController();
