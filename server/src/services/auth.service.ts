import db from '../database/db';
import bcrypt from 'bcrypt';

class AuthService {
  public async signup(user: { name: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = `INSERT INTO users (name, password) VALUES ("${user.name}", "${hashedPassword}");`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.signup: ', error);
      return 'error';
    }
  }

  public async signin(user: { name: string; password: string }) {
    try {
      const queryUser: any = await this.getUserByName(user);
      if (!queryUser.rows[0]) {
        console.log('Пользовательне не найден');
        return false;
      }
      const isPasswordValid = await bcrypt.compare(
        user.password,
        queryUser.rows[0].password,
      );

      if (isPasswordValid) {
        return {
          id: queryUser.rows[0].id as number,
          name: queryUser.rows[0].name as string,
        };
      } else {
        console.log('Ошибка. Неверный пароль!');
        return false;
      }
    } catch (err) {
      console.log(err);
      return 'error';
    }
  }

  public async getUserByName(user: { name: string; password: string }) {
    const query: string = `SELECT * FROM users WHERE name = "${user.name}"`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.getUserByName: ', error);
    }
  }

  public async checkIsValidCredentials(user: {
    name: string;
    password: string;
  }) {
    const { name, password } = user;
    const queryUser: any = await this.getUserByName(user);

    if (!(queryUser?.rows as any)?.length) {
      console.log('Error. Incorrect username');
      return false;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      queryUser.rows[0].password,
    );

    if (!isPasswordValid) {
      console.log('Error. Incorrect password');
      return false;
    }

    return queryUser.rows[0].id;
  }
}

export default new AuthService();
