const Product = require("../models/product")
const getAllProducts = async(req, res) =>{
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(featured){
        queryObject.featured = featured;
    }
        let apiData = Product.find(queryObject);
    if(sort){
        let sortfix = sort.split(",").join(" ");
        apiData = apiData.sort(sortfix);
    }
    if(select){
        let selectfix = select.split(",").join(" ");
        apiData = apiData.select(selectfix);
    }
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1)*limit;
    apiData = apiData.skip(skip).limit(limit);
    const Products = await apiData;
    res.status(200).json({ Products });
};

const getAllProductsTesting = async(req, res) =>{
    const Products = await Product.find(req.query).skip(2);
    res.status(200).json({ Products, nbHits: Product.length });
};

module.exports = {getAllProducts, getAllProductsTesting};