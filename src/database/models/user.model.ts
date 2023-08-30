import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { compareSync, hashSync } from 'bcrypt-ts';

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserClass extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.password = data.password;
  }

  @prop({
    required: true,
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [15, 'Name cannot be more than 15 characters']
  })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public avatar?: string;

  @prop({ required: true })
  public password!: string;

  public setPassword(password: string, salt: number): void {
    this.password = hashSync(password, salt);
  }

  public verifyPassword(password: string) {
    return compareSync(password, this.password);
  }
}

export const UserModel = getModelForClass(UserClass);
