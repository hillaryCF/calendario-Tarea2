const { Router } = require('./core/router');
const EventsController = require('./controllers/events.controller');
const MonthsController = require('./controllers/months.controller');
const events = new EventsController();
const months = new  MonthsController();

const router = new Router([
  {
    path: '/api/v1/events',
    method: 'GET',
    callback: events.getAll.bind(events)
  },
  {
    path: '/api/v1/events/:date',
    method: 'GET',
    callback: events.getOne.bind(events)
  },
  {
    path: '/api/v1/events',
    method: 'POST',
    callback: events.postOne.bind(events)
  },
  {
    path: '/api/v1/events/:id',
    method: 'PUT',
    callback: events.putOne.bind(events)
  },
  {
    path: '/api/v1/events/:id',
    method: 'DELETE',
    callback: events.deleteOne.bind(events)
  },
  {
    path: '/api/v1/months',
    method: 'GET',
    callback: months.getAll.bind(months)
  },

]);

module.exports = router;



