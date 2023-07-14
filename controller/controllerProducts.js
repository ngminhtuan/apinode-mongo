import { ApiStore } from "../models/modelTask.js"

export const getAllProductStatic = async (req, res) => {
    const products = await ApiStore.find({}).sort('-name').select('price name')
    res.status(200).json({ products, nbHits: products.length })
}

export const getAllProduct = async (req, res) => {
    const { featured, company, name, sort, fields, pageNumber, limitNumber, numbericFilter } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if (numbericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq',
            '<': '$lt'
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numbericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        });
        // console.log(filters);
    }


    let result = ApiStore.find(queryObject)

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.sort(fieldList)
    }
    const page = Number(pageNumber) || 1
    const limit = Number(limitNumber) || 10
    const skip = (page - 1) * limit // example: 23 items, limit 7items/page, -> 4pages 7 7 7 2
    result = result.skip(skip).limit(limit)
    console.log(queryObject);
    const products = await result
    res.status(200).json({ nbHits: products.length, products })
}

