import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"


class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    // Verifica se usuario existe
    const userExists = await this.usersRepository.findOne({ email });

    // Se existir , retorn user
    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({ email });

    // Se não existir salvar no BD
    await this.usersRepository.save(user);

    return user;
  }

}

export { UsersService }
