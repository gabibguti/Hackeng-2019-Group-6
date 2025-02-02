//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');

module.exports = function(app){

  app.get('/get_tuna/:id', function(req, res){
    tuna.get_tuna(req, res);
  });
  app.get('/add_tuna/:tuna', function(req, res){
    tuna.add_tuna(req, res);
  });
  app.get('/get_all_tuna', function(req, res){
    tuna.get_all_tuna(req, res);
  });
  app.get('/change_holder/:holder', function(req, res){
    tuna.change_holder(req, res);
  });
  app.get('/get_time/:shipmentId', function(req, res){
    tuna.get_time(req, res);
  });
  app.get('/get_history/:id', function(req, res){
    tuna.get_history(req, res);
  });
  app.get('/get_shipment/:id', function(req, res){
    tuna.get_shipment(req, res);
  });
  app.get('/change_status/:id', function(req, res){
    tuna.change_status(req, res);
  });
  app.get('/change_truck_position/:id', function(req, res){
    tuna.change_truck_position(req, res);
  });
}
