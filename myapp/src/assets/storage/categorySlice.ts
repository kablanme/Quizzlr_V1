import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleItem, CategoryState, Category, ShoppingList } from '../tsx/interfaces'

const initialState: CategoryState = {
    categoryList: [{
        description: "Electronics articles for everything possible",
        id: "1631625526505",
        name: "Electronics",
        shoppingLists: [
            { id: "1631625506505", name: "Home Cinema", articleList: [{ id: "1", name: "Subwoofer", additionalInfo: "500 Watts", quantity: 1, unit: "stk", collected: false }, { id: "2", name: "Movies", additionalInfo: "Marvel, Spiderman, King Kong", quantity: 2, unit: "stk", collected: false }] },
            { id: "1731625506505", name: "Private", articleList: [{ id: "1", name: "Iphone 13", additionalInfo: "With Apple care", quantity: 1, unit: "stk", collected: false }, { id: "2", name: "Lightning Adapter", additionalInfo: "for USB Adapter", quantity: 2, unit: "stk", collected: false }] },
        ]
    }, {
        description: "Food for home and parties",
        id: "1631625506506",
        name: "Food",
        shoppingLists: [
            { id: "1731625556505", name: "Excursion", articleList: [{ id: "1", name: "Chips", additionalInfo: "paprika", quantity: 5, unit: "stk", collected: false }, { id: "2", name: "Milk", additionalInfo: "1,5% Fat", quantity: 3, unit: "l", collected: false }] },
            { id: "1731625516505", name: "Private", articleList: [{ id: "1", name: "Chips", additionalInfo: "paprika", quantity: 5, unit: "stk", collected: false }, { id: "2", name: "Milk", additionalInfo: "1,5% Fat", quantity: 3, unit: "l", collected: false }] },
            { id: "1831625506505", name: "Closing party", articleList: [{ id: "1", name: "Alcohol", additionalInfo: "divers", quantity: 15, unit: "l", collected: false }, { id: "2", name: "Chips", additionalInfo: "paprika", quantity: 20, unit: "pkg", collected: false }] },
        ]
    }, {
        description: "This is a description of the category",
        id: "1631625506507",
        name: "Entertainment",
        shoppingLists: []
    }, {
        description: "This is a description of the category",
        id: "1631625506508",
        name: "Hygiene",
        shoppingLists: []
    }]

}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setLocalStorageState: (state, action: PayloadAction<CategoryState>) => {
            state.categoryList = action.payload.categoryList
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categoryList.push(action.payload)
        },
        editCategory: (state, action: PayloadAction<{ changedCategory: Category, idCategory: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            state.categoryList[indexCategory] = action.payload.changedCategory
        },
        deleteCategory: (state, action: PayloadAction<{ idCategory: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            let categorylist = state.categoryList
            categorylist.splice(indexCategory, 1)
            state.categoryList = categorylist
        },
        addArticle: (state, action: PayloadAction<{ article: ArticleItem, idCategory: string, idShoppinglist: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.push(action.payload.article)
        },
        editArticle: (state, action: PayloadAction<{ article: ArticleItem, idCategory: string, idShoppinglist: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            const indexArticle = state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex(article => article.id === action.payload.article.id)
            state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList[indexArticle] = action.payload.article
        },
        toggleArticleCollected: (state, action: PayloadAction<{ idArticle: string, idCategory: string, idShoppinglist: string, toggleState: boolean }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            const indexArticle = state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex(article => article.id === action.payload.idArticle)
            state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList[indexArticle].collected = action.payload.toggleState
        },
        deleteAricle: (state, action: PayloadAction<{ idCategory: string, idShoppinglist: string, idArticle: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            const indexArticle = state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList.findIndex(article => article.id === action.payload.idArticle)
            let articleList = state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList
            articleList.splice(indexArticle, 1)
            state.categoryList[indexCategory].shoppingLists[indexShoppinglist].articleList = articleList
        },
        addShoppinglist: (state, action: PayloadAction<{ idCategory: string, shoppinglist: ShoppingList }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            state.categoryList[indexCategory].shoppingLists.push(action.payload.shoppinglist)
        },
        editShoppinglist: (state, action: PayloadAction<{ idCategory: string, idShoppinglist: string, shoppinglist: ShoppingList }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            state.categoryList[indexCategory].shoppingLists[indexShoppinglist] = action.payload.shoppinglist
        },
        deleteShoppinglist: (state, action: PayloadAction<{ idCategory: string, idShoppinglist: string }>) => {
            const indexCategory = state.categoryList.findIndex(category => category.id === action.payload.idCategory)
            const indexShoppinglist = state.categoryList[indexCategory].shoppingLists.findIndex(element => element.id === action.payload.idShoppinglist)
            let shoppinglists = state.categoryList[indexCategory].shoppingLists
            shoppinglists.splice(indexShoppinglist, 1)
            state.categoryList[indexCategory].shoppingLists = shoppinglists
        }

    }
})

export const { setLocalStorageState, addCategory, editCategory, deleteCategory, editArticle, toggleArticleCollected, deleteAricle, addArticle, addShoppinglist, editShoppinglist, deleteShoppinglist } = categorySlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default categorySlice.reducer