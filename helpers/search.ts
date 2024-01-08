
interface obj {
      keyword: string | RegExp,
      title? : RegExp | string,
}

const searchHelper = (req: Record<string,any>): obj => {
      const obj: obj = {
         keyword: "",
      }
            if (req.query.keyword) {
            obj.keyword = req.query.keyword;
             const regex = new RegExp(obj.keyword, "i")
           obj.title = regex;  
            }
           return obj
     } 
     export default searchHelper;