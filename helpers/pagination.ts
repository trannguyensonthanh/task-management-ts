interface objectPagination {
  limitItems: number,
  currentPage: number
  skip?: number,
  totalPage?: number
}


const paginationHelper =  (objectPagination: objectPagination, req: Record<string, any>, countRecords: number) => {
    if (req.query.page ){
        objectPagination.currentPage = parseInt(req.query.page);
      }
    if (req.query.limit ){
        objectPagination.limitItems = parseInt(req.query.limit);
      }

      objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    
      const totalPage = Math.ceil(countRecords/objectPagination.limitItems) 
      objectPagination.totalPage = totalPage;
      return objectPagination
} 
export default paginationHelper;