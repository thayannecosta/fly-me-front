import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    dashboard: 'Dashboard',
    email:"Email",
    password:"Password",
    newRequest:"New Travel Request",
    newRequestBtn:'New Trip',
    save:"Save",
    trips:"Trips",
    users:"Users",
    dashboard:"Dashboard",
    logout:"Logout",
    notification:"Notifications"
  },
  pt: {
    welcome: 'Bem-vinda',
    login: 'Entrar',
    dashboard: 'Painel',
    email:"Email",
    password:"Senha",
    newRequest:"Nova Solicitação de viagem",
    newRequestBtn:'Nova Viagem',
    save:"Salvar",
    trips:"Viagens",
    users:"Usuários",
    dashboard:"Dashboard",
    logout:"Sair",
    notification:"Notificações"
  },
  es: {
    welcome: 'Bienvenida',
    login: 'Iniciar sesión',
    dashboard: 'Tablero',
    email:"Email",
    password:"Contraseña",
    newRequest:"Nueva solicitud de viaje",
    newRequestBtn:'Nueva viaje',
    save:"Salvar",
    trips:"Viajes",
    users:"Usuários",
    dashboard:"Dashboard",
    logout:"Logout",
    notification:"Notificações"
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',         
  fallbackLocale: 'en',
  messages,
})

export default i18n
