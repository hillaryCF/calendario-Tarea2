
const Controller = require('../core/controller');
const Utils = require('../core/utils');
const Response = require('../core/response');

class MonthsController extends Controller {
    constructor () {
        let hola = super('events');
    }

    async getAll (req, res, route) {
        this.find()
            .then(brands => Response.Send(res, brands.data))
            .catch(error => Response.ApplicationError(res, error));
    }

    async validBrand(brand) {
        if(Utils.isEmpty(brand)) return new Error(`Invalid brand`);
        if(!brand.name) return new Error(`Invalid brand name`);

        // validates the name is unique
        let found = await this.findOne({name: brand.name});
        if(found) return new Error(`Brand name already exist`);
        return null;
    }
}

module.exports = MonthsController;