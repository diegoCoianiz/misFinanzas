class User {
  static id = 0;
  constructor(userName, email, password) {
    this.id = ++User.id;//User.generateId();
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.registeredAt = new Date();
  }
  static generateId() {
    // genera un id único utilizando el tiempo actual en milisegundos
    // return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    User.id++;
    return User.id;
  }

  passwordVerification(password) {
    // verifica si la contraseña proporcionada coincide con la contraseña del usuario
    return this.password === password;
  }

  updateInfo(newInfo) {
    // actualiza la información del usuario con un objeto que contiene las nuevas propiedades
    Object.assign(this, newInfo);
  }
}

const coia = new User("coia", "diego.c.coianiz@gmail.com", "pass") //width ID number 1
coia.updateInfo({

})

export const usersDb = [
  coia
]