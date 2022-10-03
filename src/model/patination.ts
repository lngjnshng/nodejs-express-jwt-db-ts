
export class Pagination<T>{
    public page: number;
    public pageCount: number;
    public totalRecords: number;
    public totalPages: number;
    public records: T[];

    constructor(page: number, pageCount: number, totalRecords: number, records: T[]){
        this.page = page;
        this.pageCount = pageCount;
        this.totalRecords = totalRecords;
        this.records = records;
        this.totalPages = this.calcTotalPages();
    }

    private calcTotalPages(): number{
        const left = this.totalRecords % this.pageCount;
        const totalPage = Math.round(this.totalRecords / this.pageCount);
        return left > 0 ? totalPage + 1 : totalPage;
    }
}

export class Pageable {
    public page: number;
    public pageCount: number;
    
    constructor(page: number, pageCount: number){
        this.page = page;
        this.pageCount = pageCount;
    }
}