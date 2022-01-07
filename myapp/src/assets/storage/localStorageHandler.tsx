import { Storage } from "@capacitor/storage";
import { ArticleItem, CategoryState, Category, ShoppingList } from "../tsx/interfaces";

export const addShoppinglistLS = async (newShoppinglist: ShoppingList, categoryId: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === categoryId)
    categoryState.categoryList[indexCategory].shoppingLists.push(newShoppinglist)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const editShoppinglistLS = async (idCategory: string, idShoppinglist: string, changedShoppinglist: ShoppingList) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)
    categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist] = changedShoppinglist

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const deleteShoppinglistLS = async (idCategory: string, idShoppinglist: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)

    categoryState.categoryList[indexCategory].shoppingLists.splice(indexShoppinglist, 1)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const addArticleLS = async (newArticle: ArticleItem, idCategory: string, idShoppinglist: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)
    categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.push(newArticle)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const editArticleLS = async (changedArticle: ArticleItem, idCategory: string, idShoppinglist: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)
    const indexArticleitem = categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex((articleItem: ArticleItem) => articleItem.id === changedArticle.id)
    categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList[indexArticleitem] = changedArticle

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const toggleArticleCollectedLS = async (idArticle: string, idCategory: string, idShoppinglist: string, toggleState: boolean) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)
    const indexArticleitem = categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex((articleItem: ArticleItem) => articleItem.id === idArticle)
    categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList[indexArticleitem].collected = toggleState

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const deleteArticleLS = async (idCategory: string, idShoppinglist: string, idArticle: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === idCategory)
    const indexShoppinglist = categoryState.categoryList[indexCategory].shoppingLists.findIndex((shoppinglist: ShoppingList) => shoppinglist.id === idShoppinglist)
    const indexArticleitem = categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex((articleItem: ArticleItem) => articleItem.id === idArticle)

    categoryState.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.splice(indexArticleitem, 1)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const addCategoryLS = async (newCategory: Category) => {

    var { value } = await Storage.get({
        key: 'category',
    });
    var categoryState = JSON.parse(value!)

    categoryState.categoryList.push(newCategory)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const editCategoryLS = async (changedCategory: Category, categoryId: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });
    var categoryState: CategoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === categoryId)
    categoryState.categoryList[indexCategory] = changedCategory

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}

export const deleteCategoryLS = async (categoryId: string) => {
    var { value } = await Storage.get({
        key: 'category',
    });

    var categoryState = JSON.parse(value!)
    const indexCategory = categoryState.categoryList.findIndex((category: Category) => category.id === categoryId)
    categoryState.categoryList.splice(indexCategory, 1)

    const categoryJson = JSON.stringify(categoryState)

    await Storage.set({
        key: 'category',
        value: categoryJson,
    });
}


const getStorageState = async () => {
    var { value } = await Storage.get({
        key: 'category',
    });
    return value
}