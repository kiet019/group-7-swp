export const getCategoryListApi = async () => {
    const response = await fetch("http://localhost:8080/api/category/allCategory")
    if (response.ok) {
        const categoryList: any = await response.json()
        return categoryList;
    }
    return [];
}
export const getCategoryAndProductApi = async () => {
    const response = await fetch("http://localhost:8080/api/category/getCategoryAndProduct")
    if (response.ok) {
        const categoryAndProduct: any = await response.json()
        return categoryAndProduct
    }
    return [];
}
