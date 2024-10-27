
import Sequelize from 'sequelize';

const Op = Sequelize.Op;
class Helper {

    /**
     * 
     * @param {*} data 
     */
    shallowCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * 
     * @param {*} arr 
     * @param {*} key 
     */
    getUniqueElements(arr, key) {
        return new Set(arr.map(a => a[`${key}`]));
    }

    /**
     * 
     */
    getRandomNumberHash() {
        return Math.floor(Math.random() * 10000000000);
    }

    /**
     * 
     * @param {*} arr 
     */
    filterNonNull(arr) {
        return arr.filter(e => e !== null && e !== undefined);
    }

    /**
     * 
     * @param {*} data 
     */
    removeTimestamps(data) {

        if (data.length) {
            return data.map(d => {
                delete d.created_at;
                delete d.updated_at;
                delete d.contact_person_id;
                return d;
            });
        }

        delete data.created_at;
        delete data.updated_at;
        delete data.contact_person_id;
        return data;
    }
    /**
     * 
     * @param {*} array 
     * @param {*} page_size 
     * @param {*} page_number 
     * @returns 
     */

    
    customPaginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    // customPaginate = (array, page_size, page_number) => array.slice((page_number - 1) * page_size, page_number * page_size);
    /**
     * 
     * @param {*} repo 
     * @param {*} page 
     * @param {*} per_page 
     * @param {*} order 
     * @param {*} order_by 
     * @param {*} filter 
     * @param {*} where 
     * @param {*} include 
     */
    async getPaginatedRecords(repo, page, per_page, order, order_by, filter, where, include) {

        const orderBy = order_by ? order_by : 'ASC';

        const recordOrder = order ? order : 'id';

        const whereClause = filter ? where : null;

        const options = {
            page: parseInt(page),
            paginate: parseInt(per_page),
            order: [[`${recordOrder}`, `${orderBy}`]],
            include,
            where: { ...whereClause, deleted_at: null }
        };

        const { docs, pages, total } = await repo.pagination(options);

        return {
            docs: this.shallowCopy(docs),
            pages,
            total
        };

    }
    /**
     * 
     * @param {*} data 
     * @param {*} repo 
     */

     async _updateSearchCount(data, repo) {

        const {
            ids
        } = data;

        return repo.increment('search_count', 1, { id: { [Op.in]: [...ids] }});

    }

    /**
     * 
     * @param {*} arr 
     * @param {*} value 
     */
    findContactPersonByType(arr, value) {
        return arr && arr.length ? arr.find(a => a.contactPerson && a.contactPerson.contactPersonType && a.contactPerson.contactPersonType.slug === value) : null;
    }

    /**
     * 
     * @param {*} key 
     * @param {*} obj 
     */
    deleteAttributes(key, obj) {

        if(!obj || !Object.keys(obj).length) {
            return null;
        }

        if(key.length) {
            for(const k of key) {
                delete obj[k];
            }
            return obj;
        }

        delete obj[key];
    }

    findAddressByType(arr, value) {
        return arr && arr.length ? arr.find(e => e.type === value) : null;
    }


    formatContactPersonObject(contactPersons) {

        let { contactPerson, ...otherAttributes } = contactPersons;

        contactPerson = Array.isArray(contactPerson) ? contactPerson[0] : contactPerson;

        otherAttributes.contactPerson = null;

        if (contactPerson && Object.keys(contactPerson).length) {
            const { contactPersonAddresses, ...otherContactPersonAddresses } = contactPerson;

            const mailAddress = this.findAddressByType(contactPersonAddresses, 'mailing');
            const residentialAddress = this.findAddressByType(contactPersonAddresses, 'residential');
    
            otherAttributes.contactPerson = {
                ...otherContactPersonAddresses,
                mail_address: mailAddress ? mailAddress : null,
                residential_address: residentialAddress ? residentialAddress : null
            };
        }



        return otherAttributes;
    }

    checkNotNullableKeysLength(obj) {
        
        const keys = Object.keys(obj);

        return keys.filter(k => obj[k] !== null);
    }

    checkArrayLength(arr) {
        if(arr && arr.length){
            return true;
        }
        return false;
    }

}

module.exports = Helper;