const ObjectId = require('mongodb').ObjectId;
const Response = require('../core/response');
const Utils = require('../core/utils');
const Controller = require('../core/controller');

class EventsController extends Controller {
  constructor() {
    super('events');
  }

  getAll(req, res, route) {
    this.find({}, route.query)
      .then(events => Response.Send(res, events))
      .catch(error => Response.ApplicationError(res, error));
  }

  getOne(req, res, route) {
    let id = route.params.date;
    console.log(id);
    this.findOne(id)
      .then(events => Response.Send(res, events))
      .catch(error => Response.ApplicationError(res, error));
  }

  postOne(req, res, route) {
    let event = Utils.sanitize(route.data, ['date', 'hour', 'name', 'favorite', 'notes']) || {};
    let error = this._validEvent(event);
    if (error) return Response.BadRequest(res, error);
    this.insertOne(event)
      .then(newEvent => Response.Send(res, newEvent))
      .catch(error => Response.ApplicationError(res, error));
  }

  _validEvent(event = {}) {
    if (Utils.isEmpty(event) || !event.date || !event.hour || !event.name)
      return new Error(`Event name, Hour and  Date  are required.`);
    return null;
  }

  putOne(req, res, route) {
    let id = route.params.id || null;
    if (!Utils.isId(id))
      Response.BadRequest(res, new Error(`Invalid id`));
    let event = Utils.sanitize(route.data, ['name', 'favorite', 'notes']) || {};
    if (Utils.isEmpty(event))
      return Response.BadRequest(new Error(`Invalid Events`));
    this.updateOne(id, event)
      .then(updatEdevent => Response.Send(res, updatEdevent))
      .catch(error => Response.ApplicationError(res, error));
  }

  deleteOne(req, res, route) {
    let id = route.params.id || null;
    if (!Utils.isId(id))
      Response.BadRequest(res, new Error(`Invalid id`));
    this.removeOne(id)
      .then(result => Response.Send(res, result))
      .catch(error => Response.ApplicationError(res, error));
  }
}
module.exports = EventsController;