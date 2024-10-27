import Http from './helper';

import Sequelize from 'sequelize';

const Op = Sequelize.Op;

// import { Op } from Sequelize;

class BaseRepository extends Http {

    constructor(model) {
        super();
        this.model = model;
    }

    /**
     * Insert multiple records
     * @param {*} data 
     * @param {*} transaction 
     */
    async bulkCreate(data, transaction) {
        return this.model.bulkCreate(data, { individualHooks: true, transaction });
    }

    /**
     * Insert multiple records
     * @param {*} data 
     * @param {*} transaction 
     */
    async bulkUpdate(data, transaction, fields, updateOnDuplicate) {
        return this.model.bulkCreate(data, { fields, updateOnDuplicate, transaction });
    }

    /**
     * Insert single record
     * @param {*} data 
     * @param {*} transaction 
     */
    async create(data, transaction) {
        return this.model.create(data, { individualHooks: true, transaction });
    }

    /**
     * Remove records
     * @param {*} id 
     * @param {*} _where 
     * @param {*} transaction 
     */
    async destroy(id, _where, transaction) {

        if (!id && !_where) {
            return null;
        }

        const where = id ? { id } : _where;

        return this.model.destroy({ where, individualHooks: true, transaction });
    }

    /**
     * Checks the existence of record
     * @param {*} id 
     * @param {*} where 
     */
    async exists(id, where) {

        if (id) {
            const records = await this.findById(id);
            return (records && Object.keys(records).length) ? true : false;
        }

        const records = await this.model.findAll({where: { ...where }});
        return records && records.length ? true : false;
    }

    /**
     * Fetch all records
     * @param {*} filter 
     * @param {*} options 
     * @param {*} transaction 
     */
    async findAll(filter, options, transaction) {
        return this.model.findAll({ where: { ...filter }, ...options, transaction });
    }

    /**
     * Fetch record by projections
     * @param {*} projections 
     * @param {*} options 
     */
    async findOne(projections, options, transaction) {
        return this.model.findOne({ where: { ...projections }, ...options, transaction });
    }

    /**
     * Fetch record by ID
     * @param {*} identifier 
     * @param {*} options 
     */
    async findById(identifier, options, transaction) {
        return this.model.findByPk(identifier, { ...options }, transaction);
    }

    /**
     * Update Record
     * @param {*} id 
     * @param {*} obj 
     * @param {*} transaction 
     */
    async update(id, obj, transaction) {

        const [number] = await this.model.update({ ...obj }, { where: { id }, individualHooks: true, transaction });

        return (number) ? this.findById(id, { transaction }) : null;
    }

    /**
     * Update Record By Specific columns
     * @param {*} target 
     * @param {*} obj 
     * @param {*} transaction 
     */
    async updateByColumnMatched(target, obj, transaction) {

        const [number] = await this.model.update({ ...obj }, { where: { ...target }, individualHooks: true, transaction });

        return number;
    }

    /**
     * Update Record By Ids
     * @param {*} id 
     * @param {*} obj 
     * @param {*} transaction 
     */
    async updateByIds(ids, obj, transaction) {

        const [number] = await this.model.update({ ...obj }, { where: { id: { [Op.in]: [...ids]} }, transaction });

        return (number) ? this.findAll({id: { [Op.in]: ids } }) : null;

    }

     /**
     * Update Record By reference ids
     * @param {*} ids
     * @param {*} obj 
     * @param {*} transaction 
     */
    async updateByReferenceIds(ids, obj, transaction) {

        const [number] = await this.model.update({ ...obj }, { where: { ...ids }, transaction });

        return (number) ? this.findAll({ ...ids }) : null;

    }

    /**
     * Upsert Record
     * @param {*} values 
     * @param {*} options 
     */
    async upsert(obj) {
        return this.model.upsert({ ...obj }, { returning: true });
    }

    /**
     * Paginated Record
     * @param {*} page 
     * @param {*} per_page 
     * @param {*} include 
     * @param {*} where 
     * @param {*} attributes 
     * @param {*} order_by 
     * @param {*} order 
     */
    async pagination(options) {
        //const { docs, pages, total }
        return this.model.paginate({ ...options });
    }

     /**
     * raw query 
     * @param {*} sql
     */
    async executeRawQuery(sql) {
		return this.model.sequelize.query(sql);
    }

      /**
     * get count of records 
     * @param {*} column
     * @param {*} where
     * @param {*} include
     */
    async count(column, where, include){
        return this.model.count({ col:column, where: {...where}, distinct: true, ...include});
    }

       /**
     * increment column value by  
     * @param {*} column
     * @param {*} by
     * @param {*} where
     */
    async increment(column, by, where, transaction) {
        return this.model.increment(column, { by, where: { ...where }, transaction });
    }

}

module.exports = BaseRepository;
