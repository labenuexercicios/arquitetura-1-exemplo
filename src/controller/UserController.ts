import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {

  //* Controller modela objeto de input, só pega os dados, não valida nada.

  public getUsers = async (req: Request, res: Response) => {

    try {
      const input = {
        q: req.query.q as string | undefined
        
      };
      
      const userBusiness = new UserBusiness();
      const output = await userBusiness.getUsers(input);

      res.status(200).send(output);

    } catch (error) {
      console.log(error);

      if (res.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {

      //* Controller modela objeto de input;

      const input: any = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      //* Pega os dados do input e manda para UserBusiness, e espera por uma resposta;

      const userBusiness = new UserBusiness();
      const output = await userBusiness.createUser(input);

      res.status(201).send(output);

    } catch (error) {

      console.log(error);

      if (res.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
