import { Injectable } from '@angular/core'
import { ConstantsClient } from '../contants/constants-client'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  accessToken = {
    set(accessToken: string) {
      if (accessToken) {
        localStorage.setItem(ConstantsClient.auth().accessToken, accessToken)
      }
    },
    get() {
      return localStorage.getItem(ConstantsClient.auth().accessToken)
    },
    remove() {
      localStorage.removeItem(ConstantsClient.auth().accessToken)
    },
  }

  refreshToken = {
    set(refreshToken: string) {
      if (refreshToken) {
        localStorage.setItem(ConstantsClient.auth().refreshToken, refreshToken)
      }
    },
    get() {
      return localStorage.getItem(ConstantsClient.auth().refreshToken)
    },
    remove() {
      localStorage.removeItem(ConstantsClient.auth().refreshToken)
    },
  }
}
