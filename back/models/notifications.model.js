"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = Schema({
  id: Number,
  type_data: String,
  message: Object
});

const Notifications = mongoose.model('Notifications', notificationsSchema);


module.exports = {
  Notifications
}

/*
TG -> poder guardar eventos, visualizarlos, editarlos, eliminarlos y programar cuando se visualiza
APP -> Darle una visualización en el calendario y realizar esas acciones de forma más usable
WEB APP -> escalarlo a web y en esto tenia planteado qeu sea una extensión para otras cosas de la web, porque quiero meter varias cosas pero debería
 anotarlas cuando me acuerde
*/
//module.exports = mongoose.model('Notifications', notificationsSchema);