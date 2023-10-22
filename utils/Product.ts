import { LStorage } from "./LStorage";
import { Recipe, RecipeMap } from "./Recipe";
import Savable from "./Savable";


export interface ArticleDump
{
    ArticleID: number;
    Name: string;
    Number: number;
    Unit: string;
    Tags: string;
    tNumber: number;
}

export interface ProductDump
{
    ArticleID: number;
    Number: number;
}

export class Product 
{
    private static IDsCreated = 0;

    private static NotValidInstance = new Product("", 0, "", "", -1, 0);

    static get NotValid(): Product
    {
        return Product.NotValidInstance;
    }

    public ID!: number;
    
    constructor(public Name: string, public Number: number, public Unit: string, public Tags: string, id?: number, public tNumber: number = 0)
    {
        if(!id)
        {
            this.ID = (Date.now() - 1690000000000) * 10000 + Product.IDsCreated++;
        }
        else
        {
            this.ID = id;
        }
    }


/*
    set number(number: number)
    {
        if (isNaN(number)) return;

        if(number < 0) 
        {
            this.Number = 0;
            return;
        }

        this.Number = number;
    }
*/    

    print(): string
    {
        return this.Name + " " + Number(Number(this.Number).toPrecision(4)) + " " + this.Unit;
    }

    dumpArticle(): ArticleDump
    {
      return {
            ArticleID: this.ID,
            Number: this.Number,
            Name: this.Name,
            Unit: this.Unit,
            Tags: this.Tags,
            tNumber: this.tNumber
        };
    }

    dumpProduct(customNumber?: number): ProductDump
    {
        const num = customNumber || this.Number;
      return {
            ArticleID: this.ID,
            Number: num
        };
    }

}


const defaultSettingProducts = 
[
    new Product("banan", 0, "kiść", "owoce"),
    new Product("jabłko", 0, "worek", "owoce"),
    new Product("cytryna", 0, "worek", "owoce"),
    new Product("pomarańcza", 0, "worek", "owoce"),
    new Product("mandarynka", 0, "worek", "owoce"),
    new Product("limonka", 0, "worek", "owoce"),
    new Product("arbuz", 0, "szt.", "owoce"),
    new Product("gruszka", 0, "worek", "owoce"),
    new Product("śliwka", 0, "worek", "owoce"),
    new Product("wiśnia", 0, "słoik", "owoce"),
    new Product("winogrono", 0, "pojemnik", "owoce"), //
    new Product("ziemniak", 0, "worek", "warzywa"),
    new Product("pieczarki", 0, "opk", "warzywa"),
    new Product("papryka", 0, "szt.", "warzywa"),
    new Product("marchewka", 0, "worek", "warzywa"),
    new Product("cebula", 0, "worek", "warzywa"),
    new Product("sałata lodowa", 0, "szt.", "warzywa"),
    new Product("pomidor", 0, "szt.", "warzywa"),
    new Product("ogórek", 0, "szt.", "warzywa"),
    new Product("kalafior", 0, "szt.", "warzywa"),
    new Product("ogórek kiszony", 0, "szt.", "warzywa"),
    new Product("łodyga cebuli", 0, "opk", "warzywa"),
    new Product("fasola", 0, "worek", "warzywa"),
    new Product("fasola czerwona", 0, "puszka", "warzywa"),
    new Product("jalapeno", 0, "słoik", "warzywa, ostre, substraty, dodatki"),
    new Product("chrzan", 0, "słoik", "warzywa, ostre"),
    new Product("oliwki", 0, "słoik", "warzywa"),
    new Product("por", 0, "szt.", "warzywa"),
    new Product("placki tortilli", 0, "6pak", "substraty, pieczywo"),
    new Product("cukinia", 0, "szt.", "warzywa"),
    new Product("czosnek", 0, "worek", "warzywa"),
    new Product("kapusta", 0, "szt.", "warzywa"),
    new Product("płatki kukurydziane", 0, "opk", "zbożowe"),
    new Product("chleb", 0, "opk", "pieczywo"),
    new Product("bagietka", 0, "opk", "pieczywo"),
    new Product("bułki do piekarnika", 0, "opk", "pieczywo"), //
    new Product("bułki do burgera", 0, "6pak", "pieczywo"), //
    new Product("owsianka", 0, "opk", "zbożowe"),
    new Product("mąka", 0, "kg", "zbożowe,substraty"),//
    new Product("batoniki", 0, "opk", "deser"),
    new Product("kurczak na rosół", 0, "kg", "mięso"),
    new Product("filet kurczaka", 0, "kg", "mięso"),
    new Product("mięso mielone", 0, "opk", "mięso"),
    new Product("karkówka", 0, "kg", "mięso"),
    new Product("burgery", 0, "6-pak", "mięso"),
    new Product("boczek", 0, "2-pak", "mięso"),
    new Product("schab wieprzowy", 0, "opk", "mięso"),
    new Product("salami/peperoni", 0, "opk", "mięso"),
    new Product("szynka", 0, "opk", "mięso"),
    new Product("kiełbasa", 0, "kg", "mięso"),
    new Product("jogurt nat.", 0, "opk", "nabiał"),
    new Product("feta", 0, "opk", "nabiał, ser"),
    new Product("twaróg/ser biały", 0, "opk", "nabiał, ser"),//
    new Product("śmietana płynna 20", 0, "opk", "nabiał"),
    new Product("śmietana płynna 30", 0, "opk", "nabiał"),
    new Product("śmietana gęsta 20", 0, "opk", "nabiał"),//
    new Product("ser żółty", 0, "opk", "nabiał, ser"),
    new Product("mozzarella", 0, "opk", "nabiał, ser"),
    new Product("parmesan/gran padano", 0, "opk", "nabiał, ser"),
    new Product("schabowe", 0, "2-pak", "gotowe"),
    new Product("cordon bleu", 0, "2-pak", "gotowe"),
    new Product("lasagna", 0, "2-pak", "gotowe"),
    new Product("frytki mrożone", 0, "opk", "gotowe"),
    new Product("cheddar", 0, "opk", "nabiał, ser"),
    new Product("mleko", 0, "opk", "nabiał"),
    new Product("masło", 0, "opk", "nabiał"),
    new Product("jajka", 0, "opk", "nabiał"),
    new Product("sól", 0, "opk", "przyprawy"),
    new Product("pieprz", 0, "opk", "przyprawy"),
    new Product("papryka słodka", 0, "opk", "przyprawy"),
    new Product("papryka ostra", 0, "opk", "przyprawy"),
    new Product("oregano", 0, "opk", "przyprawy"),
    new Product("bazylia", 0, "opk", "przyprawy"),
    new Product("tymianek", 0, "opk", "przyprawy"),
    new Product("przyprawa do gyrosa", 0, "opk", "przyprawy"),
    new Product("przyprawy meksykańskie", 0, "opk", "przyprawy"),
    new Product("zioła prowansalskie", 0, "opk", "przyprawy"),
    new Product("ziele angielskie", 0, "opk", "przyprawy"),
    new Product("liść laurowy", 0, "opk", "przyprawy"),
    new Product("przyprawy włoskie", 0, "opk", "przyprawy"),
    new Product("przyprawy polskie", 0, "opk", "przyprawy"),
    new Product("przyprawy do pizzy", 0, "opk", "przyprawy"),
    new Product("gałka muszkatowa", 0, "opk", "przyprawy"),
    new Product("majeranek", 0, "opk", "przyprawy"),
    new Product("kmin rzymski", 0, "opk", "przyprawy"),
    new Product("cayenne", 0, "opk", "przyprawy"),//
    new Product("suszony czosnek", 0, "opk", "przyprawy"),//
    new Product("sos sojowy", 0, "butelka.", "przyprawy, substraty, sosy"),//
    new Product("lody", 0, "opk", "deser"),
    new Product("budyń", 0, "opk", "deser"),
    new Product("orzechy", 0, "opk", "suche"),
    new Product("chipsy", 0, "opk", "zagrycha"),//
    new Product("herbata", 0, "opk", "używki"),
    new Product("kawa", 0, "opk", "używki"),
    new Product("białe wino", 0, "opk", "alkohol"),
    new Product("czerwone wino", 0, "opk", "alkohol"),
    new Product("koncentrat pomidory", 0, "puszka", "substraty"),
    new Product("przecier pomidorowy", 0, "karton", "substraty"),
    new Product("pomidory krojone", 0, "puszka", "substraty"),
    new Product("kostki rosołowe", 0, "opk", "substraty"),
    new Product("uszka do barszczu", 0, "opk", "substraty"),
    new Product("keczup", 0, "butelka", "dodtki"),
    new Product("musztarda", 0, "słoik", "dodtki"),
    new Product("majonez", 0, "słoik", "substraty, dodatki"),
    new Product("kukurydza", 0, "puszka", "warzywa, substraty"),
    new Product("tabasco", 0, "słoik", "substraty, dodatki"),
    new Product("kiszona kapusta", 0, "opk", "substraty"),
    new Product("ryż", 0, "10pak", "substraty, zbożowe"),
    new Product("makaron spaghetti", 0, "opk", "substraty, zbożowe"),
    new Product("makaron penne", 0, "opk", "substraty, zbożowe"),
    new Product("makaron czarnecki", 0, "opk", "substraty, zbożowe"),
    new Product("olej", 0, "butelka", "substraty"),
    new Product("wafle andruty", 0, "opk", "substraty"),
    new Product("kakao", 0, "opk", "substraty"),
    new Product("cukier", 0, "opk", "substraty"),
    new Product("mleko w proszku", 0, "opk", "substraty"),
    new Product("drożdże", 0, "opk", "substraty"),
    new Product("sos chiński", 0, "opk", "substraty, sosy"),
    new Product("konc. barsz biały", 0, "butelka", "substraty"),
    new Product("konc. barsz czerwony", 0, "butelka", "substraty"),
    new Product("piwo", 0, "puszka", "alkochol"),
    new Product("miód", 0, "słoik", "inne"),
    new Product("kapsułki do prania", 0, "opk", "inne"),
    new Product("papier toaletowy", 0, "opk", "higiena"),
    new Product("ręcznik papierowy", 0, "opk", "higiena"),
    new Product("szampon", 0, "szt.", "higiena"),
    new Product("pasta do zębów", 0, "szt.", "higiena"),
    new Product("ścierki", 0, "paczka", "środki czystości"),
    new Product("płyn do podłóg", 0, "szt.", "środki czystości"),
    new Product("płyn do naczyń", 0, "szt.", "środki czystości"),
    new Product("płyn do armatury", 0, "szt.", "środki czystości"),
    new Product("gąbka", 0, "paczka", "środki czystości"),
    new Product("mydło", 0, "szt.", "środki czystości"), //
    new Product("woda", 0, "6-pak", "inne"),
];


export class ProductMap implements Savable<ArticleDump>
{
    private static instance: ProductMap;

    private m_Data: Product[] = [];

    forEach(callback: (value: Product) => void) 
    {
        this.m_Data.forEach((value) => 
        {
            callback(value);
        });
    }

    get map()
    {
        return this.m_Data.map;
    }

    get array(): Product[]
    {
        return this.m_Data;
    }

    get storageKey(): string
    {
        return "product_list_list";
    }

    private constructor() {};

    clear(): void 
    {
        this.m_Data = [];
    }

    loadDefault(): void 
    {
        this.m_Data = [];
        defaultSettingProducts.forEach(product => 
        {
            this.m_Data.push(product);
        });
        //console.log("Default products initialized. Size: ", this.size);
    }

    public static getInstance(): ProductMap
    {
        if (!ProductMap.instance) {
            ProductMap.instance = new ProductMap();
        }

        return ProductMap.instance;
    }

    dumpData(): ArticleDump[]
    {
        let productDumpArray: ArticleDump[] = [];

        for (let product of this.m_Data.values())
        {
            productDumpArray.push(product.dumpArticle());
        }
        return productDumpArray;
    }


    reconstruct(articles: ArticleDump[]): void {
        this.m_Data = [];

        //console.log("reconstruct: ", articles)

        for (let i = 0; i < articles.length; i++) {
            const p = articles[i];
            this.m_Data.push(new Product(p.Name,p.Number, p.Unit, p.Tags, p.ArticleID, p.tNumber));
        }

        //articles.forEach(element => {
        //    this.m_Data.push(new Product(element.Name,element.Number, element.Unit, element.Tags, element.ArticleID, element.tNumber));
        //});
    }

    getByID(id: number): Product | undefined 
    {
        return this.m_Data.find((product) => product.ID === id);
    }

    getByName(name: string) : Product | undefined
    {
        return this.m_Data.find((product) => product.Name === name);
    }

    getProductDump(name: string, editnumber: number): ProductDump
    {
        let product = this.m_Data.find((product) => product.Name === name);

        if(product)
            return product.dumpProduct(editnumber);

        return {ArticleID: -1, Number: 0};
    }

    get size(): number
    {
        return this.m_Data.length;
    }

    get length(): number
    {
        return this.m_Data.length;
    }

    editProductName(ID: number, name: string): boolean
    {
        if(this.m_Data.find((article) => article.Name === name)) return false;

        const product = this.m_Data.find((article) => article.ID === ID)
        if(!product) return false;
        
        product.Name = name;
        return true;
    }

    editProductNumber(ID: number, number: number): void
    {
        const product = this.m_Data.find((article) => article.ID === ID);

        if(product)
            product.Number = number;
    }

    add(name: string, number: number, unit: string, tags: string, optionalID?: number): boolean
    {
        if(this.m_Data.find((article) => article.Name === name)) return false;

        let newElement = new Product(name, number, unit, tags, optionalID);
        this.m_Data.push(newElement);
        return true;
    }

    removeByID(id: number): void
    {
        this.m_Data = this.m_Data.filter((product) => product.ID !== id);
    }

    removeByName(name: string): void
    {
        this.m_Data = this.m_Data.filter((product) => product.Name !== name);
    }

    addProduct(product: Product): boolean
    {
        if(this.m_Data.find((article) => article.Name === product.Name))
            return false;

        this.m_Data.push(product);
        return true;
    }

    updateTNumber(recipies: Recipe[]): void //can take long
    {
        this.forEach(product => 
        {
            product.tNumber = 0;
        });

        for (let i = 0; i < recipies.length; i++) 
        {
            const recipe = recipies[i];

            recipe.products.forEach(product =>  
            {
                const productFull = this.getByID(product.ArticleID);
                if(productFull) //room for optimizing with a risk of runtime error;
                    productFull.tNumber += product.Number * recipe.number; 
            })
        }
    }

    addProductInFront(product: Product): boolean
    {
        if(this.m_Data.find((article) => article.Name === product.Name))
        return false;

        this.m_Data.splice(0,0,product);
        return true;
    }

    moveProductToIndex(productId: number, newIndex: number): void {
        const productToMove = this.m_Data.find((product) => product.ID === productId);

        if (!productToMove || newIndex < 0 || newIndex >= this.m_Data.length) {
          return;
        }
        
        const currentIndex = this.m_Data.indexOf(productToMove);

        this.m_Data.splice(currentIndex, 1);
        this.m_Data.splice(newIndex, 0, productToMove);
    }

    moveProductByID(productId: number, shiftProductID: number): boolean 
    {
        const productToShift = this.m_Data.find((product) => product.ID === shiftProductID);
        if(!productToShift)
            return false;

        const newIndex = this.m_Data.indexOf(productToShift);
        const productToMove = this.m_Data.find((product) => product.ID === productId);
        if (!productToMove) {
          return false;
        }
        
        const currentIndex = this.m_Data.indexOf(productToMove);
        this.m_Data.splice(currentIndex, 1);
        this.m_Data.splice(newIndex, 0, productToMove);

        return true;
    }

    swap(id1: number, id2: number): void
    {
        const product1 = this.m_Data.find((product) => product.ID === id1);
        const product2 = this.m_Data.find((product) => product.ID === id2);
        
        if (!product1 || !product2)
            return;

        let index1 = this.m_Data.indexOf(product1);
        let index2 = this.m_Data.indexOf(product2);

        [this.m_Data[index1], this.m_Data[index2]] = [this.m_Data[index2], this.m_Data[index1]];
    }

    print(): string
    {
        let content: string = "";

        for (let i = 0; i < this.m_Data.length - 1; i++) 
        {     
            content += this.m_Data[i].print() + "\n";
        }

        content += this.m_Data[this.m_Data.length - 1].print();
        
        return content;
    }

    printPresent(): string
    {
        let content: string = "";

        for (let i = 0; i < this.m_Data.length - 1; i++) 
        {     
            if(this.m_Data[i].Number > 0)
                content += this.m_Data[i].print() + "\n";
        }

        if(this.m_Data[this.m_Data.length - 1].Number > 0)
            content += this.m_Data[this.m_Data.length - 1].print();
        
        return content;
    }

    copyProducts(): void
    {
        navigator.clipboard.writeText(this.printPresent()).then(() => {}, () => {alert("coping failed")});
    }

    getSortedArray(): Product[]
    {
        const present: Product[] = [];
        const absent: Product[] = [];

        this.m_Data.forEach((product) =>
        {
            if( product.Number > 0 )
                present.push(product);
            else
                absent.push(product);
        });
        
        return present.concat(absent);
        //return [...present, ...absent];
        //present.push(...absent); return present
    }

    getSearch(word: string): Product[]
    {
        word = word.toLowerCase().replace(/\s/g, "");

        return this.m_Data.filter((product) => 
        {
          const name = product.Name.toLowerCase().replace(/\s/g, "");
          const tags = product.Tags.toLowerCase().replace(/\s/g, "");
          return name.includes(word) || tags.includes(word);
        });
    }

    getSearchSorted(word: string): Product[]
    {
        const w = word.toLowerCase().replace(/\s/g, "");
      
        const filteredProducts = this.m_Data.filter((product) => 
        {
            const name = product.Name.toLowerCase().replace(/\s/g, "");
            const tags = product.Tags.toLowerCase().replace(/\s/g, "");
      
            return name.includes(w) || tags.includes(w);
        });
      
        filteredProducts.sort((a, b) => 
        {
            if (a.Number > 0 && b.Number === 0)
                return -1;
            else if (a.Number === 0 && b.Number > 0)
                return 1;
            else 
                return 0;
        });
      
        return filteredProducts;
    }

    flatline()
    {
        this.m_Data.forEach(product => { product.Number = 0; product.tNumber = 0});
    }

    save(): void 
    {
        LStorage.getInstance().setObject(this);
    }

    reset(): void
    {
        this.m_Data = [];
    }
}