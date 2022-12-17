import { Length, IsEmail } from 'class-validator';

import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
@ApiModel({
  description: 'UserDTO description',
  name: 'User'
})
export class UserDTO {
  @ApiModelProperty({
    description: 'userId'
  })
  @Length(10, 20)
  _id?: string;

  @ApiModelProperty({
    description: 'username',
    required: true
  })
  @Length(10, 20)
  name!: string;

  @ApiModelProperty({
    description: 'email id of user',
    required: true
  })
  @IsEmail()
  email!: string;
}
