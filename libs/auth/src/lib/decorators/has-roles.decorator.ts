import { RolesEnum } from '@mymonorepo/shared/interfaces'
import { SetMetadata } from '@nestjs/common'

export const HasRoles = (...roles: RolesEnum[]) => SetMetadata('roles', roles)
