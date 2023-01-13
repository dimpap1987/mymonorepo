import {SetMetadata} from '@nestjs/common';
import {RolesEnum} from "@mymonorepo/shared/interfaces";

export const HasRoles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
