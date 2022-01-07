import { CharacterPhoto } from "../camera/usePhotoGallery";

/**
 * /Question - POST - Fragen sollen angelegt werden - Daten: alle Attribute
 * /Question - GET - Fragen sollen angezeigt werden - Daten: alle Attribute
 * /Question - PUT - Fragen sollen überarbeitet werden können - Daten: neue Beschreibung aller Attribute,
 * /Question - DELETE - Fragen sollen gelöscht werden - Daten: alle Attribute
 */

 export interface Question{
    id: string;
    question:string;
    correctAnswer: Array<string>;
    incorrectAnswer: Array<string>;
    type:Type;
    date:Date;
}

enum Type{
    'Singlechoice',
    'Multiplechoice',
    'Schätzfrage'
}

/**
 * /Degree - GET - Studiengang soll ausgegeben werden 
 */

export interface Degree{
    studiengang: string;
    questions?: Array <Question>;
}

/** Studiengänge:
    Accessory Design
    Industrial Design
    Fashion
    Jewellery Design
    Transportation Design
    Visual Communication 
*/

/**
 * /User - POST - Der User wird angelegt - Daten: alle Attribute des Users
 * /User/{id} - GET - Der einzelne User wird angezeigt - Daten: Name des Users
 */

export interface User{
    id: string;
    name: string;
    fortschritt: Progress;
}

/**
 * /Character - GET - Character soll angezeigt werden - Daten: alle Atrribute des Characters
 */
export interface Character{
    title:string;
    photo?: CharacterPhoto;
    animation:string
}
/**
 * /Progess - 
 */
export interface Progress{
    object:Array<Question>,  
    correct:boolean

}

export interface ArticleItem {
    id: string,
    name: string,
    additionalInfo: string
    quantity: number,
    unit: string,
    collected: boolean,
    photo?: CharacterPhoto;
}

export interface ShoppingList {
    id: string,
    name: string;
    articleList: Array<ArticleItem>
}

export interface Category {
    id: string,
    name: string;
    description: string;
    shoppingLists: Array<ShoppingList>,
    photo?: CharacterPhoto;
}

export interface CategoryState {
    categoryList: Array<Category>
}


