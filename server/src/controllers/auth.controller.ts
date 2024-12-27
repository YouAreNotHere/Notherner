import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  public async signup(req: Request, res: Response) {
    const existingUser = await AuthService.getUserByName(req.body);
    if ((existingUser?.rows as any)?.length) {
      res.status(409).send({ message: 'Пользователь уже существует' });
      return;
    }

    const result = await AuthService.signup(req.body);
    if (result === 'error') {
      res.status(500).send({ message: 'Что-то пошло не так' });
      return;
    }

    console.log(`user with name ${req.body.name} was created`);
    res.send({ regAccount: true });
  }

  public async signin(req: Request, res: Response) {
    console.log("Auth на бэке")
    if (!(await AuthService.checkIsValidCredentials(req.body))) {
      res.status(401).send({ message: 'Неверный логин или пароль' });
      return;
    }

    const user: false | 'error' | { id: number; name: string } =
      await AuthService.signin(req.body);

    if (!user) {
      res.status(500).send({ message: 'Некорректный пароль' });
    }

    req.session.user = {
      id: (user as any).id as number,
      name: (user as any).name as string,
    };

    console.log(`Пользователь ${req.session.user?.id} авторизован`);

    res.send(user);
    console.log(user);
  }

  public async logout(req: Request, res: Response) {
    console.log("logout")
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send({ message: 'Ошибка при выходе' });
      }
      res.clearCookie('connect.sid');
      res.status(200).send({ message: 'Выполнен выход из системы' });
    });
    console.log(req?.session?.user?.id);
  }
}

export default new AuthController();
